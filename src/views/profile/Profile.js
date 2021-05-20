import React, { useState, useEffect } from 'react'
import { View, Text, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Colors, errorMessage } from "../../utils/constants"
import useStyles from "../../hooks/useStyles.hook"
import ProfileStyle from "../../Styles/Views/ProfileStyle/ProfileStyle"

import moment from 'moment'
import ServiceProfile from "../../Services/SerProfile/SerProfile"

import Container from "../../components/Container/Container"
import ModalPin from "../../components/ModalPin/ModalPin"

const Profile = ({ route }) => {

    const [birthday, setBirthday] = useState(new Date())
    const [pin, setPin] = useState('')
    const [pinConfirm, setPinConfirm] = useState('')
    const [password, setPassword] = useState('')

    const [showModal, setShowModal] = useState(false)

    const classes = useStyles(ProfileStyle)

    const { data } = route.params

    const submitInformation = () => {
        try {
            if (pin !== pinConfirm) {
                throw String("Pins no coinciden")
            }

            const DataSent = {
                pin_number: pin,
                password: password
            }

            ServiceProfile(DataSent)

        } catch (error) {
            errorMessage(error.toString())
        }

    }

    useEffect(() => {
        setBirthday(moment(data.birthday).format('DD/MM/YYYY'))
    }, [])

    return (
        <Container showLogo>

                <View style={classes.notEditableDataContainer}>

                    <View style={classes.imageStyle} />

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

            <View style={classes.bottomContainer}>

                <TouchableOpacity style={classes.bottomStyle}
                    onPress={()=>setShowModal(true)}
                >
                    <Text style={classes.textButton}>Cambiar PIN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={classes.bottomSecundary}>
                    <Text style={classes.textButtonSecundary}>Soporte</Text>
                </TouchableOpacity>

                <TouchableOpacity style={classes.bottomSecundary}>
                    <Text style={classes.textButtonSecundary}>Salir</Text>
                </TouchableOpacity>

            </View>

            {showModal && <ModalPin setShowModal={setShowModal}/>}

        </Container>
    )
}

export default Profile