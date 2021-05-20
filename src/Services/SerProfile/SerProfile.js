import {
    getHeaders,
    http,
    errorMessage,
    successMessage,
    loader,
} from "../../utils/constants"
import store from "../../store/index"

export default async function ServiceProfile(DataSent){
    try {

        loader(true)

        const { navigation } = store.getState()

        console.log('data: ', DataSent)

        const {data: response} = await http.put('/pin/update', DataSent, getHeaders())

        console.log(response)

        if (response.error) {
            throw String(response.message)
        } else {
            successMessage(response.message)
            navigation.pop()
        }

    } catch (error) {
        errorMessage(error.toString())
    }finally{
        loader(false)
    }
}