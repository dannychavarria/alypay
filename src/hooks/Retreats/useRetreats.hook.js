import React, { useState, useEffect } from "react"

// Import Constants
import { errorMessage, getFeePercentage } from "../../utils/constants"

// Import Services
import RetirementExcutiveService from "../../Services/RetirementExcutive"
import SubmitRetirementExcutiveServices from "../../Services/SubmitRetirementExcutive"

// Import Funtions
import Floor from "lodash/floor"

// Import Store
import store from "../../store"

export default function useRetreats() {
    const { global } = store.getState()

    // Almacenamos la peticon del server para optener la lista de las monedas
    const [infoCoin, setInfoCoin] = useState({})

    // Estados que guardan los montos de las monedas y el fee
    const [amount, setAmount] = useState(0)
    const [amountFeeUSD, setAmountFeeUSD] = useState(0)
    const [amountSatochi, setTotalAmountSatochi] = useState(0)
    const [amountFee, setAmountFee] = useState(0)

    /**
     * Funcion que nos permite optener la lista de monedas
     */
    const getListCoin = async () => {
        try {
            const cointList = await RetirementExcutiveService()

            // convertimos el objeto en array
            const arrayCurrencies = Object.values(cointList)

            setInfoCoin(arrayCurrencies)
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    /**
     * Funcion que nos permite calcular el Fee de la moneda seleccionada
     */
    const onChangeAmountFee = (value, event) => {
        if (infoCoin.length === 0) {
            return
        }
        setAmount(value)

        const { fee, fee_aly } = getFeePercentage(amount, 2, global.fee)

        let _amountFeeUSD = 0

        if (infoCoin[event] === "ALY") {
            _amountFeeUSD = Floor(value * fee_aly, 8)
        } else {
            _amountFeeUSD = Floor(value * fee, 8)
        }

        setAmountFeeUSD(_amountFeeUSD)
    }

    const submintInformation = async (data, successCallback) => {
        try {
            await SubmitRetirementExcutiveServices({
                dataSent: data,
                successCallback,
            })
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    const totalAmount = value => {
        if (amount.length > 0) {
            // total de dolares escritos por el usuario
            const totalAmount = parseFloat(amount)

            // Precio de la moneda selecionada
            const { price } = infoCoin[value].quote.USD

            const { fee, fee_aly } = getFeePercentage(
                totalAmount,
                2,
                global.fee,
            )

            const satochi = totalAmount / price

            // Verificamos el fee segun la moneda selecionada
            if (infoCoin[value] === "ALY") {
                setAmountFee(Floor(satochi * fee_aly, 8))
            } else {
                setAmountFee(Floor(satochi * fee, 8))
            }

            setTotalAmountSatochi(Floor(satochi, 8))
        } else {
            setAmountFee(0)
            setTotalAmountSatochi(0)
        }
    }

    return {
        getListCoin,
        infoCoin,
        amount,
        amountFee,
        amountSatochi,
        amountFeeUSD,
        totalAmount,
        onChangeAmountFee,
        submintInformation,
    }
}
