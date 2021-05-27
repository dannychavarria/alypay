import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Modal } from 'react-native'

import ModalConfirmPinS from "../../Styles/Components/ModalConfirmPinS/ModalConfirmPinS"
import useStyles from '../../hooks/useStyles.hook'

import EntryPassword from '../../components/EntryPassword/entryPassword.component'

import Container from '../../components/Container/Container'

import Icon from 'react-native-vector-icons/Feather'

import { http, getHeaders, errorMessage, loader, Colors } from '../../utils/constants'
import store from "../../store/index"

const ModalConfirmPin = _ => {
    const [PIN, setPIN] = useState([])

    const [fun, setFun]= useState(() => {})

    const [show, setVisible] = useState(false)

    useEffect(function () {
        store.subscribe(function () {

            const { pin } = store.getState()

            if (show !== pin.show) {
                setVisible(pin.show)
                setFun(pin.fn)
            }
        })
    }, [])

    const classes = useStyles(ModalConfirmPinS)

    const PinFunction = (pin) => {
        PIN.length < 6 ? setPIN([...PIN, pin]) : ''
    }

    const submitPIN = async () => {

        console.log('show: ', show)

        if (show) {

            let pinParse = ''

            PIN.map(item => pinParse = pinParse + item)

            try {
                loader(true)
                const { data: response } = await http.get(`/pin/${pinParse}`, getHeaders())
                if (response.error) {
                    throw String(response.message)
                } else {
                    await fun()
                }

            } catch (error) {
                errorMessage(error.toString())
            } finally {
                loader(false)
            }

        }

    }

    const closeModal = () => {
        setVisible(false)
    }

    return (
        <Modal visible={show}>
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
                            <Icon name='delete' size={30} color={Colors.colorYellow}/>
                        </TouchableOpacity> 
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={() => { PinFunction(0) }}
                        >
                            <Text style={classes.textButtonStyle}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={classes.buttonStyle}
                            onPress={submitPIN}
                        >
                            <Icon name='check' size={30} color={Colors.colorYellow}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={classes.buttonCloseStyle}
                    onPress={closeModal}
                >
                    <Text>VOLVER</Text>
                </TouchableOpacity>
            </Container>
        </Modal>
    )
}

export default ModalConfirmPin