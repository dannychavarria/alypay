import {
    getHeadersMultipartFormData,
    http,
    errorMessage,
    successMessage,
    loader,
} from "../../utils/constants"

export default async function submitInfo( dataSent ) {
    try {
        loader(true)

        console.log('DataSent: ', dataSent)

        const { data: response } = await http.post("/kyc", {data: dataSent}, getHeadersMultipartFormData())

        if (response.error) {
            throw String(response.message)
        } else if (response.response === "success") {
            successMessage("Tu registro esta en proceso de aceptacion")
        }
    } catch (error) {
        errorMessage(error.toString())
    } finally {
        loader(false)
    }
}
