import { http, serverSpeedtradingsURL, errorMessage } from "../../utils/constants"

export default async function configurateComponent() {
    try {
        // obtenemos los precios de las monedas principales
        const { data } = await http.get(
            `${serverSpeedtradingsURL}/collection/prices/minimal`,
        )

        if (data.error) {
            throw String(data.message)
        }
        return data
    } catch (error) {
        errorMessage(error.toString())
    }
}