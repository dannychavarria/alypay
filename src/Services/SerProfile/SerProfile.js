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
export default async function ServiceProfile(DataSent, options = 'pin', idUser = -1) {

    const { navigation } = store.getState()

    let res = false

    switch (options) {
        case 'pin': {
            try {

                loader(true)

                const { data: response } = await http.put('/pin/update', DataSent, getHeaders())

                if (response.error) {
                    throw String(response.message)
                } else {
                    successMessage(response.message)
                    res = true
                }

            } catch (error) {
                res = false
                errorMessage(error.toString())
            } finally {
                loader(false)
                break;
            }
        }
        case 'profile': {
            try {
                loader(true)

                const { data: response } = await http.post(`/users/update-info/${idUser
                    }`, DataSent, getHeadersMultipartFormData())

                if (response.error) {
                    throw String(response.message)
                } else {
                    successMessage(response.message)
                    res = true
                    //cambiar el store
                    if (DataSent.option === 'UPDATEPICTURE') {
                        navigation.pop()
                    }
                }

            } catch (error) {
                res = false
                errorMessage(error.toString())
            } finally {
                loader(false)
                break;
            }
        }
    }
    return res
}