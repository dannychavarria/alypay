import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native'

import EditFotoStyle from '../../Styles/Components/EditFotoView/EditFotoView.style'
import useStyles from '../../hooks/useStyles.hook'

import {
    GlobalStyles,
    checkPermissionCamera,
    showNotification
} from '../../utils/constants'

import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import ServiceProfile from "../../Services/SerProfile/SerProfile"


import { Modalize } from "react-native-modalize"

import HeaderComponent from "../../components/HeaderComponent/HeaderComponent"
import FotoPerfil from '../../components/FotoPerfil/FotoPerfil.component'
import PasswordInput from '../../components/passwordInput/PasswordInput.component'

import store from '../../store/index'

const EditFotoView = (props) => {

    const [imgPerfil, setImgPerfil] = useState(null)
    const [password, setPassword] = useState('')

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

            camara ?
                launchCamera(optionsOpenCamera, response => {
                    if (response.error) {
                        throw String(response.error)
                    } if (!response.didCancel) {
                        setImgPerfil(response)
                    }
                }) :
                launchImageLibrary(optionsOpenCamera, response => {
                    if (response.error) {
                        throw String(response.error)
                    } if (!response.didCancel) {
                        setImgPerfil(response)
                    }
                })
            sheetRef.current.close()


        } catch (error) {
            showNotification(error.toString())
        }
    }

    const sentInfo = async _ => {

        const DataSent = new FormData()

        const picturePerfil = {
            data: imgPerfil.base64,
            type: imgPerfil.type,
            size: imgPerfil.fileSize,
        }
        DataSent.append("picture", JSON.stringify(picturePerfil))

        DataSent.append("password", password)

        DataSent.append("option", 'UPDATEPICTURE')

        updateStore()

        let res = await ServiceProfile(DataSent, 'profile', idUser)

        if(res){
            close()
        }
    }

    const updateStore = _ => {

        const { global } = store.getState()

        const dataStorage = {
            ...global,
            src: imgPerfil.uri
        }

        store.dispatch({ type: 'SETSTORAGE', payload: dataStorage })
    }

    const close = _ => {
        navigation.pop()
    }

    useEffect(_ => {
        setImgPerfil({uri: picture})
    }, [])

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'black'
        }}>
            <HeaderComponent />
            <View style={{
                paddingHorizontal: '5%',
                paddingVertical: '15%',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <View style={{
                    height: '60%',
                    width: '100%',
                    justifyContent: 'space-between',
                }}>

                    <FotoPerfil imgPerfil={imgPerfil} />

                    <TouchableOpacity style={GlobalStyles.buttonPrimaryLine}
                        onPress={_ => sheetRef.current.open()}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 22
                        }}>Editar</Text>
                    </TouchableOpacity>

                </View>

                <View style={{
                    height: '30%',
                    width: '100%',
                    justifyContent: 'space-between',
                }}>

                    <Text style={{
                        color: 'white',
                        fontSize: 18
                    }}>Confirme el cambio con su contraseña</Text>

                    <PasswordInput value={password} onChangeText={setPassword}/>

                    <TouchableOpacity style={GlobalStyles.buttonPrimary}
                        onPress={sentInfo}
                    >
                        <Text style={{ fontSize: 16 }}>Confirmar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={GlobalStyles.buttonPrimaryCancel}
                        onPress={close}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }}>Cancelar</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <Modalize
                ref={sheetRef}
                snapPoint={300}
                modalHeight={300}
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
                                { margin: 5 },
                            ]}
                            onPress={_ => uploadImageView(true)}
                        >
                            <Text style={GlobalStyles.textButtonPrimaryLine}>
                                Tomar fotografia
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                GlobalStyles.buttonPrimaryLine,
                                { margin: 5 },
                            ]}
                            onPress={_ => uploadImageView(false)}
                        >
                            <Text style={GlobalStyles.textButtonPrimaryLine}>
                                Subir fotografia
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                GlobalStyles.buttonPrimaryCancel,
                                { margin: 5 },
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