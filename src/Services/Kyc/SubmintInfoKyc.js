import {
    getHeadersMultipartFormData,
    http,
    errorMessage,
    successMessage,
    loader,
} from "../../utils/constants"
import store from "../../store/index"

export default async function submitInfo(dataSent) {
    try {
        loader(true)

        const { navigation } = store.getState()

        const { data: response } = await http.post(
            "/kyc",
            dataSent,
            getHeadersMultipartFormData(),
        )

        if (response.error) {
            throw String(response.message)
        } else {
            successMessage("Has completado tu registro de KYC con exito")
            navigation.pop()
        }
    } catch (error) {
        console.log(error.toString())
        errorMessage(error.toString())
    } finally {
        loader(false)
    }
}
