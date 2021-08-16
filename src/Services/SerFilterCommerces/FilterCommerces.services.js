import React from 'react'
import { errorMessage, getHeaders, http } from '../../utils/constants'

const FilterCommercesServices = (props) => {

    const { type = 'country', dataSent = {} } = props

    const actions = {
        country: _ => { countryActive() }
    }

    const countryActive = async _ => {
        try {

            const { data } = await http.get('/ecommerce/company/country-filter-list', getHeaders())

            console.log('Endpoints de paises: ', data)
        } catch (error) {
            errorMessage(error.toString())
        }
    }
    actions[type]()

}

export default FilterCommercesServices