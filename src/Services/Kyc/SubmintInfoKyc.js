import {
    getHeadersMultipartFormData,
    http,
    errorMessage,
    successMessage,
    loader,
} from "../../utils/constants"
import { useNavigation } from "@react-navigation/native"

export default async function submitInfo(dataSent) {
    try {
        loader(true)

        console.log("DataSent: ", dataSent)

        const { navigate } = useNavigation()

        const { data: response } = await http.post(
            "/kyc",
            dataSent,
            getHeadersMultipartFormData(),
        )

        console.log(response)

        if (response.error) {
            throw String(response.message)
        } else if (response.response === "success") {
            successMessage("Tu registro esta en proceso de aceptacion")
            navigate("Main")
        }
    } catch (error) {
        errorMessage(error.toString())
    } finally {
        loader(false)
    }
}
