import React, { useState, useRef, useEffect } from "react"
import { View, TouchableOpacity, Text, TextInput } from "react-native"

import {
    GlobalStyles,
    checkPermissionCamera,
    showNotification,
    RFValue,
    errorMessage,
} from "../../utils/constants"

import useStyles from "../../hooks/useStyles.hook"
import EditFotoStyle from "../../Styles/Components/EditFotoView/EditFotoView.style"

import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import ServiceProfile from "../../Services/SerProfile/SerProfile"

import { Modalize } from "react-native-modalize"

import HeaderComponent from "../../components/HeaderComponent/HeaderComponent"
import FotoPerfil from "../../components/FotoPerfil/FotoPerfil.component"
import PasswordInput from "../../components/passwordInput/PasswordInput.component"

import store from "../../store/index"

const EditFotoView = props => {
    const [imgPerfil, setImgPerfil] = useState(null)
    const [password, setPassword] = useState("")

    const { navigation } = props

    const { imgPerfil: picture, idUser } = props.route.params

    const sheetRef = useRef(null)

    const classes = useStyles(EditFotoStyle)

    const optionsOpenCamera = {
        //noData: true,
        includeBase64: true,
        maxHeight: 1024,
        maxWidth: 1024,
        quality: 0.6,
        mediaType: "photo",
        storageOptions: {
            skipBackup: true,
            path: "Pictures/myAppPicture/", //-->this is FUCK neccesary
            privateDirectory: true,
        },
        cameraType: "back",
    }

    const uploadImageView = async (camara = true) => {
        try {
            await checkPermissionCamera()

            camara
                ? launchCamera(optionsOpenCamera, response => {
                      if (response.error) {
                          throw String(response.error)
                      }
                      if (!response.didCancel) {
                          setImgPerfil(response)
                      }
                  })
                : launchImageLibrary(optionsOpenCamera, response => {
                      if (response.error) {
                          throw String(response.error)
                      }
                      if (!response.didCancel) {
                          setImgPerfil(response)
                      }
                  })
            sheetRef.current.close()
        } catch (error) {
            showNotification(error.toString())
        }
    }

    const sentInfo = async _ => {
        try {
            if (password.trim().length === 0) {
                throw String(
                    "La contraseña es requerida para realizar esta accion",
                )
            }

            const DataSent = new FormData()

            const picturePerfil = {
                data: imgPerfil.base64,
                type: imgPerfil.type,
                size: imgPerfil.fileSize,
            }
            DataSent.append("picture", JSON.stringify(picturePerfil))

            DataSent.append("password", password)

            DataSent.append("option", "UPDATEPICTURE")

            updateStore()

            let res = await ServiceProfile(DataSent, "profile", idUser)

            if (res) {
                close()
            }
        } catch (error) {
            errorMessage(error)
        }
    }

    const updateStore = _ => {
        const { global } = store.getState()

        const dataStorage = {
            ...global,
            src: imgPerfil.uri,
        }

        store.dispatch({ type: "SETSTORAGE", payload: dataStorage })
    }

    const close = _ => {
        navigation.pop()
    }

    useEffect(_ => {
        setImgPerfil({ uri: picture })
    }, [])

    return (
        <View style={classes.contain}>
            <HeaderComponent />
            <View style={classes.container}>
                <View style={classes.subContainer}>
                    <FotoPerfil imgPerfil={imgPerfil} />

                    <View style={{ paddingTop: RFValue(10) }}>
                        <TouchableOpacity
                            style={GlobalStyles.buttonPrimaryLine}
                            onPress={_ => sheetRef.current.open()}>
                            <Text style={classes.textWhite}>Editar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={classes.subContainerDown}>
                    <Text style={classes.textWhite}>
                        Confirme el cambio con su contraseña
                    </Text>

                    <PasswordInput
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <View style={classes.rowFormsButtons}>
                    <TouchableOpacity
                        style={GlobalStyles.buttonPrimaryCancel}
                        onPress={close}>
                        <Text style={GlobalStyles.textButtonCancel}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[GlobalStyles.buttonPrimary]}
                        onPress={sentInfo}>
                        <Text style={GlobalStyles.textButton}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modalize
                ref={sheetRef}
                snapPoint={RFValue(300)}
                modalHeight={RFValue(300)}
                modalStyle={classes.panel}
                HeaderComponent={
                    <View style={{ alignItems: "center" }}>
                        <Text style={classes.panelTitle}>Actualizar foto</Text>
                        <Text style={classes.panelSubtitle}>
                            Cambia tu foto de perfil
                        </Text>

                        <TouchableOpacity
                            style={[
                                GlobalStyles.buttonPrimaryLine,
                                { margin: RFValue(5) },
                            ]}
                            onPress={_ => uploadImageView(true)}>
                            <Text style={GlobalStyles.textButtonPrimaryLine}>
                                Tomar fotografia
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                GlobalStyles.buttonPrimaryLine,
                                { margin: RFValue(5) },
                            ]}
                            onPress={_ => uploadImageView(false)}>
                            <Text style={GlobalStyles.textButtonPrimaryLine}>
                                Subir fotografia
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                GlobalStyles.buttonPrimaryCancel,
                                { margin: RFValue(5) },
                            ]}>
                            <Text style={GlobalStyles.textButtonCancel}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    )
}

export default EditFotoView
