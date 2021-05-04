import React, { useState } from "react"

// Import Constants
import { errorMessage, getFeePercentage, loader } from "../../utils/constants"
import Floor from "lodash/floor"

// Import Services
import SerBuyCrypto from "../../Services/SerBuyCrypto/SerBuyCrypto"
import SubmintInfoBuyService from "../../Services/SerBuyCrypto/SubmintInfoBuy"

// Import Funtions

// Import Store

export default function useBuyCrypto() {
    const [infoCoin, setInfoCoin] = useState({})
    const [totalAmountUSD, setTotalAmountUSD] = useState(0)

    const [amounOrigin, setAmounOrigin] = useState(0)

    const [priceCoin, setPriceCoin] = useState(0)

    console.log("Precios", infoCoin)
    const ConfigureComponent = async () => {
        try {
            loader(true)
            // obtenemos los precios de las monedas principales
            const data = await SerBuyCrypto()

            // convertimos el objeto en array
            const arrayCoins = Object.values(data)

            setInfoCoin(arrayCoins)
        } catch (e) {
            errorMessage(e.message)
        } finally {
            loader(false)
        }
    }

    const PriceMoment = value => {
        console.log(value)
        const { price } = infoCoin[value]?.quote.USD || 0
        setPriceCoin(price)
    }

    const onChangeAmountFee = (value, price) => {
        if (infoCoin.length === 0) {
            return
        }

        console.log('value? ', !value)

        if(!value) {
            setAmounOrigin('')
        }else{
            setAmounOrigin(value)
        }


        let _amountFeeUSD = 0

        _amountFeeUSD = Floor(value * price, 2)

        setTotalAmountUSD(_amountFeeUSD)
    }

    const submintInformation = async data => {
        console.log("DataSubmint", data)
        try {
            await SubmintInfoBuyService({
                dataSent: data,
            })
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    return {
        ConfigureComponent,
        onChangeAmountFee,
        infoCoin,
        totalAmountUSD,
        priceCoin,
        submintInformation,
        PriceMoment,
        amounOrigin,
    }
}
