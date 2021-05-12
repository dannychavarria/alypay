import {
    getHeadersMultipartFormData,
    http,
    errorMessage,
    successMessage,
    loader,
} from "../../utils/constants"

export default async function submitInfo(dataSent, callback) {
    try {
        loader(true)

        console.log("DataSent: ", dataSent)

        const { data: response } = await http.post(
            "/kyc",
            dataSent,
            getHeadersMultipartFormData(),
        )

        console.log(response)

        if (response.error) {
            throw String(response.message)
        }

        if (response.response === "success") {
            successMessage("Tu registro esta en proceso de aceptacion")

            callback()
        }
    } catch (error) {
        errorMessage(error.toString())
    } finally {
        loader(false)
    }
}
