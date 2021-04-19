import React, { useState, useEffect } from "react"

// Import Constants
import { errorMessage, getHeaders } from "../../utils/constants"

// Import Service
import { SubmitInfoKycService } from "../../Services/index"

export default function useKyc() {
    // Hacemos la peticion al server para guardar el registro
    const submitInformation = async data => {
        try {
            await SubmitInfoKycService(data)
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    return {
        submitInformation,
    }
}
