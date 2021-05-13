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

<<<<<<< HEAD
        const { navigate } = useNavigation()
=======
        navigation.push("Main")

        // console.log("DataSent: ", dataSent)
>>>>>>> 10fccf273cef9061a6c85dce5e43db8bdc61016f

        // const {navigation} = store.getState()

<<<<<<< HEAD
        if (response.error) {
            throw String(response.message)
        } else {
            navigate("Main")
        }
=======
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
>>>>>>> 10fccf273cef9061a6c85dce5e43db8bdc61016f
    } catch (error) {
        errorMessage(error.toString())
    } finally {
        loader(false)
    }
}
