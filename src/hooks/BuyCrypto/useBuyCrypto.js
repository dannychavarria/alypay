import React, { useState } from 'react'

// Import Constants
import { errorMessage, getFeePercentage } from "../../utils/constants"

// Import Services
import SerBuyCrypto from "../../Services/SerBuyCrypto/SerBuyCrypto"

// Import Funtions

// Import Store

export default function useBuyCrypto() {

    const [infoCoin, setInfoCoin] = useState({})
    const [priceCoin, setPriceCoin] = useState(0)

    console.log('Precios', infoCoin)
    const ConfigureComponent = async () => {
        try {
            // obtenemos los precios de las monedas principales
            const data = await SerBuyCrypto()

            // convertimos el objeto en array
            const arrayCoins = Object.values(data)

            setInfoCoin(arrayCoins)
        } catch (e) {
            errorMessage(e.message)
        }
    }

    /*  const PriceMoment = (value) => {
        console.log(value)
        const { price } = infoCoin[value]?.quote.USD
        setPriceCoin(price)
     } */

        return {
            ConfigureComponent,
            infoCoin,

        }

    }