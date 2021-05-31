import {
    getHeaders,
    getHeadersMultipartFormData,
    http,
    errorMessage,
    successMessage,
    loader,
    logOutApp,
} from "../../utils/constants"
import store from "../../store/index"
import { SETSTORAGE } from "../../store/actionsTypes"

export default async function submitInfo(dataSent) {
    try {
        loader(true)

        console.log(dataSent, "Peticion Final")

        const { navigation } = store.getState()

        const { data: response } = await http.post(
            "/users/create-kyc",
            dataSent,
            // getHeaders(),
            getHeadersMultipartFormData(),
        )

        if (response.error) {
            throw String(response.message)
        } else {
            successMessage("Has completado tu registro de KYC con exito")
            await logOutApp()
        }
    } catch (error) {
        console.log(error.toString())
        errorMessage(error.toString())
    } finally {
        loader(false)
    }
}
