import {
    getHeaders,
    http,
    errorMessage,
    successMessage,
    loader,
} from "../../utils/constants"
import store from "../../store/index"

// peticion de envio al server y comprobacion de campos
export default async function submitInfo({ dataSent }) {
    try {
        loader(true)

        const { navigation } = store.getState()

        if (dataSent.amount_from === 0 || isNaN(dataSent.amount_from)) {
            throw String("Ingrese un monto para continuar")
        }

        if (dataSent.hash.length < 25) {
            throw String("El hash de transaccion no es valido")
        }

        const { data: response } = await http.post(
            "/wallets/purchase",
            dataSent,
            getHeaders(),
        )

        if (response.error) {
            throw String(response.message)
        } else if (response.response === "success") {
            successMessage("Tu solicitud de compra esta en proceso")
            navigation.pop()
        }
    } catch (error) {
        errorMessage(error.toString())
    } finally {
        loader(false)
    }
}
