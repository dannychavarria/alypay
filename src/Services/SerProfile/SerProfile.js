// import constanst
import {
    getHeaders,
    getHeadersMultipartFormData,
    http,
    errorMessage,
    successMessage,
    loader,
} from "../../utils/constants"

// import store
import store from "../../store/index"

// funcion de peticion a la endpoint
export default async function ServiceProfile(DataSent, options='pin', idUser){
    switch(options){
        case 'pin': {
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
                break;
            }
        }
        case 'profile': {
            try {
                loader(true)

                const {data: response} = await http.post(`/users/update-info/${
                    idUser
                }`, DataSent, getHeadersMultipartFormData())

                console.log('respuesta: ',response)

                if (response.error) {
                    throw String(response.message)
                } else {
                    successMessage(response.message)
                    //cambiar el store
                }

            } catch (error) {
                console.log('error: ', error)
                errorMessage(error.toString())
            }finally{
                loader(false)
                break;
            }
        }
    }
}