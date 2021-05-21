// import constanst
import {
    getHeaders,
    http,
    errorMessage,
    successMessage,
    loader,
} from "../../utils/constants"

// import store
import store from "../../store/index"

// funcion de peticion a la endpoint
export default async function ServiceProfile(DataSent){
    try {

        loader(true)

        const { navigation } = store.getState()

        const {data: response} = await http.put('/pin/update', DataSent, getHeaders())

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