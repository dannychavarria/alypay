import React, { useState, useEffect, useRef } from "react"
import { Text, View, TouchableOpacity, Image, TextInput } from "react-native"

//Import Hooks
import useStyles from "../../hooks/useStyles.hook"

// Import Styles
import { EditProfileStyles } from "../../Styles/Components/index"
import ServiceProfile from "../../Services/SerProfile/SerProfile"

//Import Components
import Icon from "react-native-vector-icons/Entypo"

//Import Assets
import profile from "../../static/profile-default.png"

// Import constants
import { Colors, errorMessage, GlobalStyles } from "../../utils/constants"
import store from "../../store"
import PasswordInput from "../passwordInput/PasswordInput.component"

const EditProfile = ({ data = {}, navigation }) => {
    const [firtsName, setFirtsName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    // const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")

    const idUser = data.id

    const classes = useStyles(EditProfileStyles)

    // Estado que visualiza el formulario de edicion de perfil
    const [showInfoEdit, setShowInfoEdit] = useState(false)
    // const [infoEdit,setInfoEdit] = useState(false)

    // Funcion que visualiza el formulario
    const editInfo = () => {
        setShowInfoEdit(true)
    }

    const infoEdit = () => {
        try {
            setFirtsName(data.first_name)
            setLastName(data.last_name)
            setUsername(data.username)
        } catch (error) {
            console.log(error.toString())
        }
    }

    const sentEditInfo = async () => {
        try {
            if (password === "") {
                throw String("Escriba su contraseña")
            }
            const DataSent = {
                username: username === "" ? "-" : username,
                email: "-",
                password: password === "" ? "-" : password,
                last_name: lastName === "" ? "-" : lastName,
                first_name: firtsName === "" ? "-" : firtsName,
                option: "UPDATEGNRALINFO",
            }

            let resSer = await ServiceProfile(DataSent, "profile", idUser)

            if (resSer) {
                updateStore()
                setShowInfoEdit(!resSer)
                clearStates()
            }
        } catch (error) {
            errorMessage(error)
        }
    }

    // Funcion que cancela la edicion del formulario de perfil
    const cancelInfo = () => {
        setShowInfoEdit(false)
        // clearStates()
    }

    // Limpiar estados
    const clearStates = _ => {
        setFirtsName("")
        setLastName("")
        setUsername("")
        setPassword("")
    }

    const goToEditFoto = _ => {
        navigation.navigate("EditFoto", { imgPerfil: data.src, idUser: idUser })
    }

    const updateStore = _ => {
        const { global } = store.getState()

        const dataStorage = {
            ...global,
            first_name: firtsName === "" ? global.first_name : firtsName,
            last_name: lastName === "" ? global.last_name : lastName,
            username: username === "" ? global.username : username,
        }

        store.dispatch({ type: "SETSTORAGE", payload: dataStorage })

        console.log("store: ", global)
    }

    useEffect(() => {
        infoEdit()
    }, [data])

    return (
        <>
            <View style={classes.container}>
                <TouchableOpacity onPress={goToEditFoto}>
                    <View style={classes.imageContainer}>
                        <Image
                            style={classes.image}
                            source={
                                data.src !== undefined
                                    ? { uri: data.src }
                                    : profile
                            }
                        />
                        <View style={classes.containerIcon}>
                            <Icon
                                name="camera"
                                size={20}
                                color={Colors.colorYellow}
                                style={classes.icon}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={classes.containerCard}>
                <View style={classes.row}>
                    <Text style={classes.titlePrincipal}>Datos Personales</Text>
                    {showInfoEdit === true && (
                        <TouchableOpacity onPress={cancelInfo}>
                            <Icon name="cross" size={25} color="#CCC" />
                        </TouchableOpacity>
                    )}
                </View>

                {showInfoEdit === false ? (
                    <View style={classes.containerCardInfo}>
                        <View style={classes.rowCard}>
                            <Text style={classes.titlePrincipalCard}>
                                Nombre:
                            </Text>
                            <Text style={classes.subTitleCard}>
                                {data.first_name}
                            </Text>
                        </View>

                        <View style={classes.rowCard}>
                            <Text style={classes.titlePrincipalCard}>
                                Apellido:
                            </Text>
                            <Text style={classes.subTitleCard}>
                                {data.last_name}
                            </Text>
                        </View>

                        <View style={classes.rowCard}>
                            <Text style={classes.titlePrincipalCard}>
                                Usuario:
                            </Text>
                            <Text style={classes.subTitleCard}>
                                @{data.username}
                            </Text>
                        </View>

                        <View style={classes.rowCard}>
                            <Text style={classes.titlePrincipalCard}>
                                Correo:
                            </Text>
                            <Text style={classes.subTitleCard}>
                                {data.email}
                            </Text>
                        </View>

                        <View style={classes.rowButtons}>
                            <TouchableOpacity
                                onPress={editInfo}
                                style={[GlobalStyles.buttonPrimaryLine]}>
                                <Text
                                    style={GlobalStyles.textButtonPrimaryLine}>
                                    Editar Información
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={classes.containerCardInfo}>
                        <View style={classes.rowForm}>
                            <View style={classes.legendRow}>
                                <Text style={classes.titlePrincipalCard}>
                                    Nombre
                                </Text>
                            </View>

                            <TextInput
                                style={GlobalStyles.textInput}
                                value={firtsName}
                                onChangeText={value => {
                                    setFirtsName(value.replace(/ /g, ""))
                                }}
                                placeholder="Nombre"
                                placeholderTextColor="#CCC"
                            />
                        </View>

                        <View style={classes.rowForm}>
                            <View style={classes.legendRow}>
                                <Text style={classes.titlePrincipalCard}>
                                    Apellido
                                </Text>
                            </View>

                            <TextInput
                                style={GlobalStyles.textInput}
                                value={lastName}
                                onChangeText={value => {
                                    setLastName(value.replace(/ /g, ""))
                                }}
                                placeholder="Apellido"
                                placeholderTextColor="#CCC"
                            />
                        </View>

                        <View style={classes.rowForm}>
                            <View style={classes.legendRow}>
                                <Text style={classes.titlePrincipalCard}>
                                    Usuario
                                </Text>
                            </View>

                            <TextInput
                                style={GlobalStyles.textInput}
                                value={username}
                                onChangeText={value => {
                                    setUsername(value.replace(/ /g, ""))
                                }}
                                placeholder="Usuario"
                                placeholderTextColor="#CCC"
                            />
                        </View>

                        <PasswordInput
                            value={password}
                            onChangeText={setPassword}
                        />

                        <View style={classes.rowFormsButtons}>
                            <TouchableOpacity
                                onPress={cancelInfo}
                                style={[
                                    GlobalStyles.buttonPrimaryCancel,
                                    { width: "40%" },
                                ]}>
                                <Text style={GlobalStyles.textButtonCancel}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={sentEditInfo}
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

export default EditProfile
