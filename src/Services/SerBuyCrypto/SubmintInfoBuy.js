import {
    getHeaders,
    http,
    errorMessage,
    successMessage,
    loader,
} from "../../utils/constants"

export default async function submitInfo({ dataSent }) {
    try {
        loader(true)

        const { data: response } = await http.post(
            "/wallets/purchase",
            dataSent,
            getHeaders(),
        )

        if (response.error) {
            throw String(response.message)
        }else if (response.response === "success") {
            successMessage("Tu solicitud de compra esta en proceso")
        }

    } catch (error) {
        errorMessage(error.toString())
    }
}
