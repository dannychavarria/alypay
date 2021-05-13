import {
    getHeadersMultipartFormData,
    http,
    errorMessage,
    successMessage,
    loader,
} from "../../utils/constants"
import store from "../../store/index"
import { useNavigation } from "@react-navigation/native"

export default async function submitInfo(dataSent) {
    try {
        loader(true)

        navigation.push("Main")

        // console.log("DataSent: ", dataSent)

        // const {navigation} = store.getState()

        // const { data: response } = await http.post(
        //     "/kyc",
        //     dataSent,
        //     getHeadersMultipartFormData(),
        // )

        // console.log(response)

        // if (response.error) {
        //     throw String(response.message)
        // } else if (response.response === "success") {
        //     successMessage("Tu registro esta en proceso de aceptacion")
        //     navigation.push("Main")
        // }
    } catch (error) {
        errorMessage(error.toString())
    } finally {
        loader(false)
    }
}
