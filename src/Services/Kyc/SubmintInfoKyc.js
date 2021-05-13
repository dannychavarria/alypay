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

        const { navigate } = useNavigation()

        const { data: response } = await http.post(
            "/kyc",
            dataSent,
            getHeadersMultipartFormData(),
        )

        if (response.error) {
            throw String(response.message)
        } else {
            navigate("Main")
        }
    } catch (error) {
        errorMessage(error.toString())
    } finally {
        loader(false)
    }
}
