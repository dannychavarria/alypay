import React, { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

// Import Hooks
import useStyles from "../../hooks/useStyles.hook"

// Import Component

// Import Styles
import { EditPinStyles } from "../../Styles/Components/index"

// Import Constants
import { Colors, RFValue, GlobalStyles, showNotification } from "../../utils/constants"

import ServiceProfile from "../../Services/SerProfile/SerProfile"


const EditPinProfile = () => {
    // estados de pin y contraseña
    const [pin, setPin] = useState("")
    const [pinConfirm, setPinConfirm] = useState("")
    const [password, setPassword] = useState("")

    const [showEdit, setShowEdit] = useState(false)

    const classes = useStyles(EditPinStyles)


    const editInfo = () => {
        setShowEdit(true)
    }

    const closeEdit = () => {
        setShowEdit(false)
    }
    
     // funcion de cierre del modal
     const closeModal = () => {
         setShowModal(false)
     }
 
     // funcion de envio de informacion
     const submitInformation = async () => {
         try {
             if (pin !== pinConfirm) {
                 throw String("Pins no coinciden")
             }
 
             const DataSent = {
                 pin_number: pin,
                 password: password,
             }

             ServiceProfile(DataSent, 'pin')

         } catch (error) {
             errorMessage(error.toString())
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
                            Ingrese un PIN válido e 6 dígitos y recuerdelo, no
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

                            <TextInput
                                style={GlobalStyles.textInput}
                                value={pin}
                                onChangeText={setPin}
                                placeholder="Ingrese su pin"
                                placeholderTextColor="#ccc"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={classes.rowForm}>
                            <View style={classes.legendRow}>
                                <Text style={classes.titlePrincipalCard}>
                                    Confirme su PIN
                                </Text>
                            </View>

                            <TextInput
                                style={GlobalStyles.textInput}
                                value={pinConfirm}
                                onChangeText={setPinConfirm}
                                placeholder="Ingrese su pin para confirmar"
                                placeholderTextColor="#ccc"
                                keyboardType="numeric"
                            />
                        </View>

                        <Text style={classes.subTitle}>
                            Ingrese su contraseña para verificar el cambio de
                            PIN.
                        </Text>

                        <View style={classes.rowForm}>
                            <View style={classes.legendRow}>
                                <Text style={classes.titlePrincipalCard}>
                                    Ingrese su contraseña
                                </Text>
                            </View>

                            <TextInput
                                style={GlobalStyles.textInput}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Ingrese su contraseña"
                                placeholderTextColor="#ccc"
                                keyboardType="numeric"
                            />
                        </View>

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
