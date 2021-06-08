import React, { useState, useEffect } from "react"
import { View, TouchableOpacity, Text, Modal } from "react-native"

// Import Components
import EntryPassword from "../../components/EntryPassword/entryPassword.component"
import Container from "../../components/Container/Container"
import Icon from "react-native-vector-icons/Feather"

// Import Hooks
import useStyles from "../../hooks/useStyles.hook"

//Import Styles
import ModalConfirmPinS from "../../Styles/Components/ModalConfirmPinS/ModalConfirmPinS"

import {
    Colors,
    errorMessage,
    GlobalStyles,
    RFValue,
} from "../../utils/constants"

// Import Store
import store from "../../store/index"

// modal para verificar el pin
const ModalConfirmPin = ({ fn }) => {
    const [PIN, setPIN] = useState([])

    const [err, setErr] = useState("")

    const [show, setVisible] = useState(false)

    const classes = useStyles(ModalConfirmPinS)

    //funcion para setear el pin
    const PinFunction = pin => {
        PIN.length < 6 ? setPIN([...PIN, pin]) : ""
    }

    // funcion para consultar el pin
    const submitPIN = async () => {
        try {
            if (show) {
                let pinParse = ""

                PIN.map(item => (pinParse = pinParse + item))

                if (pinParse.length < 6) {
                    throw String("Ingrese un Pin valido")
                } else {
                    closeModal()
                    fn(pinParse)
                }
            }
        } catch (error) {
            errorMessage(error.message)
        }
    }

    // funcion para cerrar el modal y setear los estados
    const closeModal = () => {
        setPIN([])
        setErr("")
        setVisible(false)
        store.dispatch({ type: "SHOWPIN", payload: false })
    }

    //funcion para borrar el input
    const backSpace = () => {
        setErr("")
        setPIN(PIN.splice(0, PIN.length - 1))
    }

    useEffect(function() {
        store.subscribe(function() {
            const { pin } = store.getState()

            if (show !== pin.show) {
                setVisible(pin.show)
            }
        })
    }, [])

    return (
        <Modal visible={show}>
            <Container showLogo>
                <View style={classes.principalContainer}>
                    <Text style={classes.title}>Ingresa el PIN</Text>

                    <View
                        style={{
                            width: "60%",
                            height: RFValue(25),
                            marginBottom: RFValue(20),
                        }}>
                        <EntryPassword value={PIN} length={6} />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}>
                        <TouchableOpacity
                            style={classes.buttonStyle}
                            onPress={() => {
                                PinFunction(1)
                            }}>
                            <Text style={classes.textButtonStyle}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={classes.buttonStyle}
                            onPress={() => {
                                PinFunction(2)
                            }}>
                            <Text style={classes.textButtonStyle}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={classes.buttonStyle}
                            onPress={() => {
                                PinFunction(3)
                            }}>
                            <Text style={classes.textButtonStyle}>3</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}>
                        <TouchableOpacity
                            style={classes.buttonStyle}
                            onPress={() => {
                                PinFunction(4)
                            }}>
                            <Text style={classes.textButtonStyle}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={classes.buttonStyle}
                            onPress={() => {
                                PinFunction(5)
                            }}>
                            <Text style={classes.textButtonStyle}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={classes.buttonStyle}
                            onPress={() => {
                                PinFunction(6)
                            }}>
                            <Text style={classes.textButtonStyle}>6</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}>
                        <TouchableOpacity
                            style={classes.buttonStyle}
                            onPress={() => {
                                PinFunction(7)
                            }}>
                            <Text style={classes.textButtonStyle}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={classes.buttonStyle}
                            onPress={() => {
                                PinFunction(8)
                            }}>
                            <Text style={classes.textButtonStyle}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={classes.buttonStyle}
                            onPress={() => {
                                PinFunction(9)
                            }}>
                            <Text style={classes.textButtonStyle}>9</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}>
                        <TouchableOpacity
                            style={classes.buttonStyle}
                            onPress={backSpace}>
                            <Icon
                                name="delete"
                                size={RFValue(30)}
                                color={Colors.colorYellow}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={classes.buttonStyle}
                            onPress={() => {
                                PinFunction(0)
                            }}>
                            <Text style={classes.textButtonStyle}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={classes.buttonStyle}
                            onPress={submitPIN}>
                            <Icon
                                name="check"
                                size={RFValue(30)}
                                color={Colors.colorYellow}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={classes.buttonCloseStyle}>
                    <TouchableOpacity
                        style={GlobalStyles.buttonPrimary}
                        onPress={closeModal}>
                        <Text style={GlobalStyles.textButton}>
                            Volver Atras
                        </Text>
                    </TouchableOpacity>
                </View>
            </Container>
        </Modal>
    )
}

export default ModalConfirmPin
