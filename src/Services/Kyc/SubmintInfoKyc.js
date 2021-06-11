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

        const { data: response } = await http.post(
            "/users/create-kyc",
            dataSent,
            getHeadersMultipartFormData(),
        )

        if (response.error) {
            throw String(response.message)
        } else {
            successMessage("Has completado tu registro de KYC con exito")
            await logOutApp()
        }
    } catch (error) {
        errorMessage(error.toString())
    } finally {
        loader(false)
    }
}
