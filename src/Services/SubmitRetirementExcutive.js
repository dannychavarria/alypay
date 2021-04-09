import {
    getHeaders,
    http,
    errorMessage,
    successMessage,
    loader,
} from "../utils/constants"

/**
 * Funcion que nos permite hacer la peticion al server para realizar el retiro§
 * @param {dataSent} Recibe un objeto para con la direccion y el monto a retirar
 */

export default async function submitInformation({ dataSent, successCallback }) {
    try {
        loader(true)

        if (dataSent.amountOriginal < 20) {
            throw String("El monto minimo para retirar es de 20 USD")
        }

        const { data: response } = await http.post(
            "/sales-executive/withdrawals",
            dataSent,
            getHeaders(),
        )

        if (response.error) {
            throw String(response.message)
        } else if (response.response === "success") {
            successMessage("Tu solicitud de retiro esta en proceso")

            successCallback()
        } else {
            errorMessage(
                "Tu solicitud de retiro no se ha podido procesar, contacte a soporte",
            )
        }
    } catch (error) {
        errorMessage(error.toString())
    } finally {
        loader(false)
    }
}
