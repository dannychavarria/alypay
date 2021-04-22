import { errorMessage, http, getHeaders } from "../utils/constants"

export default async function HistoryRetirement() {
    try {
        const { data } = await http.get(
            "/sales-executive/withdrawals",
            getHeaders(),
        )

        if (data.error) {
            throw String(data.message)
        }

        return data
    } catch (error) {
        errorMessage(error.toString())
    }
}
