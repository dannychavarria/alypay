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
    // Iniciar los estados de informacion de monedas y el monto
    const [infoCoin, setInfoCoin] = useState([])
    const [totalAmountUSD, setTotalAmountUSD] = useState(0)

    //  Estado del input del monto
    const [amounOrigin, setAmounOrigin] = useState(0)

    // precio de la moneda actual
    const [priceCoin, setPriceCoin] = useState(0)

    // Carga de la informacion de la moneda
    const ConfigureComponent = async () => {
        try {
            loader(true)
            // obtenemos los precios de las monedas principales
            const data = await SerBuyCrypto()

            // convertimos el objeto en array
            const arrayCoins = Object.values(data)

            let arrayCoinsFilter = arrayCoins.filter(
                info => info.symbol != "ALY" && info.symbol != "USDT",
            )

            setInfoCoin(arrayCoinsFilter)
        } catch (e) {
            errorMessage(e.message)
        } finally {
            loader(false)
        }
    }

    // Funcion que setea el precio actual de la moneda seleccionada
    const PriceMoment = async value => {
        const { price } = await infoCoin[value]?.quote.USD
        setPriceCoin(price)
    }

    // Funcion que calcula el precio de la moneda a alypay
    const onChangeAmountAly = (value, price) => {
        if (infoCoin.length === 0) {
            return
        }

        // Verifica si el value esta vacio
        if (!value) {
            setAmounOrigin("")
        } else {
            setAmounOrigin(value)
        }

        let _amountFeeUSD = 0

        _amountFeeUSD = Floor(value * price, 2)

        setTotalAmountUSD(_amountFeeUSD)
    }

    // Envio de la data al servicio
    const submintInformation = async data => {
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
        onChangeAmountAly,
        infoCoin,
        totalAmountUSD,
        priceCoin,
        submintInformation,
        PriceMoment,
        amounOrigin,
    }
}
