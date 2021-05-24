import React, { useState } from 'react'
import { View, TouchableOpacity, Text, Modal } from 'react-native'

import ModalConfirmPinS from "../../Styles/Components/ModalConfirmPinS/ModalConfirmPinS"
import useStyles from '../../hooks/useStyles.hook'

import EntryPassword from '../../components/EntryPassword/entryPassword.component'

import Container from '../../components/Container/Container'

import { http, getHeaders, errorMessage, successMessage, loader } from '../../utils/constants'

const ModalConfirmPin = () => {

    const [PIN, setPIN] = useState([])
    const [show, setShow] = useState(true)

    const classes = useStyles(ModalConfirmPinS)

    const PinFunction = (pin) => {
        PIN.length < 6 ? setPIN([...PIN, pin]) : ''
    }

    console.log('entra')

    const submitPIN = () => {

        try {
            const { data: response } = http.get(`/pin/${PIN}`, getHeaders())
            if (response.error) {
                throw String(response.message)
            }
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            setShowModalPin(false)
            loader(false)
        }

    }

    return (
        <Modal
            isVisible={show}
            onRequestClose={() => { setShow(false) }}
        >
            <Container showLogo>
                <View style={classes.principalContainer}>

                    <Text style={classes.title}>Ingresa el PIN</Text>

                    <View style={{ width: '50%', height: 30, marginBottom: 30 }}>
                        <EntryPassword value={PIN} length={6} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={() => { PinFunction(1) }}
                        >
                            <Text style={classes.textButtonStyle}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={() => { PinFunction(2) }}
                        >
                            <Text style={classes.textButtonStyle}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={() => { PinFunction(3) }}
                        >
                            <Text style={classes.textButtonStyle}>3</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={() => { PinFunction(4) }}
                        >
                            <Text style={classes.textButtonStyle}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={() => { PinFunction(5) }}
                        >
                            <Text style={classes.textButtonStyle}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={() => { PinFunction(6) }}
                        >
                            <Text style={classes.textButtonStyle}>6</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={() => { PinFunction(7) }}
                        >
                            <Text style={classes.textButtonStyle}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={() => { PinFunction(8) }}
                        >
                            <Text style={classes.textButtonStyle}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={() => { PinFunction(9) }}
                        >
                            <Text style={classes.textButtonStyle}>9</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={() => { setPIN(PIN.splice(0, PIN.length - 1)) }}
                        >
                            <Text style={classes.textButtonStyle}>X</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={() => { PinFunction(0) }}
                        >
                            <Text style={classes.textButtonStyle}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={submitPIN}
                        >
                            <Text style={classes.textButtonStyle}>{"<"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        </Modal>
    )
}

export default ModalConfirmPin