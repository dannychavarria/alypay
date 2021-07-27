import React, { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

// Import Hooks
import useStyles from "../../hooks/useStyles.hook"

// Import Styles
import { EditPinStyles } from "../../Styles/Components/index"

// Import Constants
import { GlobalStyles, errorMessage, Colors } from "../../utils/constants"

// Import Components
import Icon from "react-native-vector-icons/MaterialIcons"
import ServiceProfile from "../../Services/SerProfile/SerProfile"
import PasswordInput from "../passwordInput/PasswordInput.component"

const EditPinProfile = () => {
    // estados de pin y contraseña
    const [pin, setPin] = useState("")
    const [pinConfirm, setPinConfirm] = useState("")
    const [password, setPassword] = useState("")

    const [showEdit, setShowEdit] = useState(false)
    const [showPin, setShowPin] = useState(false)
    const [showPinConfirm, setShowPinConfirm] = useState(false)

    const classes = useStyles(EditPinStyles)

    const editInfo = () => {
        setShowEdit(true)
    }

    const closeEdit = () => {
        clearStates()
        setShowEdit(false)
    }

    // funcion de cierre del modal
    const clearStates = () => {
        setPin("")
        setPinConfirm("")
        setPassword("")
    }

    // funcion de envio de informacion
    const submitInformation = async () => {
        try {
            if (pin !== pinConfirm) {
                throw String(
                    "El pin ingresado no coinciden porfavor vuela a intentarlo",
                )
            }
            if (password.trim().length === 0) {
                throw String(
                    "La contraseña es requerida para realizar esta acción",
                )
            }

            const DataSent = {
                pin_number: pin,
                password: password,
            }

            let res = await ServiceProfile(DataSent, "pin")

            console.log("res: ", res)

            if (res) {
                closeEdit()
            }
        } catch (error) {
            errorMessage(error)
        }
    }

    return (
        <>
            <View style={classes.container}>
                <View style={classes.row}>
                    <Text style={classes.titlePrincipal}>Pin</Text>

                    {showEdit === false ? (
                        <TouchableOpacity
                            onPress={editInfo}
                            style={classes.titlePrincipal}>
                            <Text style={classes.subTitle}>Editar</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={closeEdit}
                            style={classes.titlePrincipal}>
                            <Text style={classes.subTitle}>X</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {showEdit === false ? (
                    <TouchableOpacity
                        onPress={editInfo}
                        style={classes.containerCardInfoMini}>
                        <Text style={classes.titlePrincipal}>******</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={classes.containerCardInfoMax}>
                        <Text style={classes.subTitle}>
                            Ingrese un PIN válido ce 6 dígitos y recuerde, no
                            comparta su PIN con nadie. Es la manera más segura
                            de verificar su identidad cuando efectúe usa
                            transacción.
                        </Text>

                        <View style={classes.rowForm}>
                            <View style={classes.legendRow}>
                                <Text style={classes.titlePrincipalCard}>
                                    Ingrese PIN
                                </Text>
                            </View>

                            <View
                                style={[
                                    classes.textInputWithImage,
                                    GlobalStyles.textInput,
                                ]}>
                                <TextInput
                                    style={classes.textInputCol}
                                    value={pin}
                                    onChangeText={setPin}
                                    placeholder="Ingrese su pin"
                                    placeholderTextColor="#ccc"
                                    keyboardType="numeric"
                                    secureTextEntry={!showPin}
                                />

                                <TouchableOpacity
                                    onPress={_ => setShowPin(!showPin)}
                                    style={classes.touchableCol}>
                                    <Icon
                                        name={
                                            showPin
                                                ? "visibility-off"
                                                : "visibility"
                                        }
                                        color={Colors.colorYellow}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={classes.rowForm}>
                            <View style={classes.legendRow}>
                                <Text style={classes.titlePrincipalCard}>
                                    Confirmar PIN
                                </Text>
                            </View>

                            <View
                                style={[
                                    classes.textInputWithImage,
                                    GlobalStyles.textInput,
                                ]}>
                                <TextInput
                                    style={classes.textInputCol}
                                    value={pinConfirm}
                                    onChangeText={setPinConfirm}
                                    placeholder="Confirmar Pin"
                                    placeholderTextColor="#ccc"
                                    keyboardType="numeric"
                                    secureTextEntry={!showPinConfirm}
                                />

                                <TouchableOpacity
                                    onPress={_ =>
                                        setShowPinConfirm(!showPinConfirm)
                                    }
                                    style={classes.touchableCol}>
                                    <Icon
                                        name={
                                            showPinConfirm
                                                ? "visibility-off"
                                                : "visibility"
                                        }
                                        color={Colors.colorYellow}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={classes.subTitle}>
                            Ingrese su contraseña para verificar el cambio de
                            PIN.
                        </Text>

                        <PasswordInput
                            value={password}
                            onChangeText={setPassword}
                        />

                        <View style={classes.rowFormsButtons}>
                            <TouchableOpacity
                                onPress={closeEdit}
                                style={[
                                    GlobalStyles.buttonPrimaryCancel,
                                    { width: "40%" },
                                ]}>
                                <Text style={GlobalStyles.textButtonCancel}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={submitInformation}
                                style={[
                                    GlobalStyles.buttonPrimary,
                                    { width: "40%" },
                                ]}>
                                <Text style={GlobalStyles.textButton}>
                                    Confirmar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </>
    )
}

export default EditPinProfile
