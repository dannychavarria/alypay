import React, { useState, useEffect } from 'react'
import { View, Text, Alert, Image, TouchableOpacity } from 'react-native'

// import hooks
import useStyles from "../../hooks/useStyles.hook"

// import styles
import ProfileStyle from "../../Styles/Views/ProfileStyle/ProfileStyle"

// import constanst
import { OpenSupport, logOutApp } from "../../utils/constants"
import profileImage from "../../static/profile-default.png"

// import components
import ModalPin from "../../components/ModalPin/ModalPin"
import Container from "../../components/Container/Container"

import HeaderComponent from "../../components/HeaderComponent/HeaderComponent"

// import librerias
import moment from 'moment'

const Profile = ({ route }) => {

    // estado para el cumpleaños del usuario
    const [birthday, setBirthday] = useState(new Date())
    // estado para mostrar el modal
    const [showModal, setShowModal] = useState(false)

    // llamada a los estilos
    const classes = useStyles(ProfileStyle)
    // datos del cliente
    const { data } = route.params

    // funcion de pregunta de cierre de sesion
    const toggleMenu = () => {
        Alert.alert("Cerrar sesion", "Estas apunto de cerrar sesion en AlyPay", [
            {
                text: "Cancelar",
                onPress: () => { },
            },
            {
                text: "Cerrar Sesion",
                onPress: logOut
            }
        ])
    }

    // cierre de sesion
    const logOut = async () => {
        try {
            await logOutApp()
        } catch (error) {
            console.log(error)
        }
    }

    // seteo del cumpleaños del usuario
    useEffect(() => {
        setBirthday(moment(data.birthday).format('DD/MM/YYYY'))
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>

            <HeaderComponent />

            <View style={classes.notEditableDataContainer}>

                <Image style={classes.imageStyle} source={profileImage} />

                <View style={classes.textContainer}>
                    <Text style={classes.principalTextCenter}>{`${data.first_name} ${data.last_name}`}</Text>
                    <Text style={classes.secundaryTextCenter}>@{data.username}</Text>
                </View>

                <View style={classes.textContainer}>
                    <Text style={classes.secundaryTextCenter}>Correo</Text>
                    <Text style={classes.principalTextCenter}>{data.email}</Text>
                </View>

                <View style={classes.textContainer}>
                    <Text style={classes.secundaryTextCenter}>Fecha de nacimiento</Text>
                    <Text style={classes.principalTextCenter}>{birthday.toString()}</Text>
                </View>

            </View>

            <TouchableOpacity style={classes.bottomStyle}
                onPress={() => setShowModal(true)}
                disabled={showModal}
            >
                <Text style={classes.textButton}>Cambiar PIN</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={classes.bottomSecundary}
                    onPress={OpenSupport}
                    disabled={showModal}
                >
                    <Text style={classes.textButtonSecundary}>Soporte</Text>
                </TouchableOpacity>

                <TouchableOpacity style={classes.bottomSecundary}
                    onPress={toggleMenu}
                    disabled={showModal}
                >
                    <Text style={classes.textButtonSecundary}>Cerrar sesión</Text>
                </TouchableOpacity> */}

            {showModal && <ModalPin showModal={showModal} setShowModal={setShowModal} />}

        </View>
    )
}

export default Profile