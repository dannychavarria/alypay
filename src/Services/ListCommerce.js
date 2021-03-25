import { errorMessage, http, getHeaders } from "../utils/constants"

/**
 * Hacemos la peticin al server paara obtener la lista de los comercios
 * y sus porcentajes de Ganacias
 */
const ListCommerce = {}
ListCommerce.get = function() {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await http.get("/sales-executive", getHeaders())

            if (data.error) {
                throw String(data.message)
            }

            resolve(data)
        } catch (error) {
            reject(error.toString())
        }
    })
}

export default ListCommerce
