import React, {useState, useEffect} from 'react'
import { View, Text, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'

import { Colors, RFValue } from "../../utils/constants"

import useStyles from "../../hooks/useStyles.hook"

import ProfileStyle from "../../Styles/Views/ProfileStyle/ProfileStyle"

import DateTimePicker from "@react-native-community/datetimepicker"

const Profile = ({ route }) => {

    const [showDate, setShowDate] = useState(false)
    const [birthday, setBirthday] = useState(new Date())
    const [date, setDate] = useState(new Date())

    const classes = useStyles(ProfileStyle)

    const { data } = route.params

    console.log('User Data: ', data)

    const changeDate = (event, selectedDate) => {
        const currentDate = selectedDate
        setBirthday(currentDate)
        setShowDate(false)
    }

    useEffect(() => {
        setBirthday(data.birthday)
    },[])

    return (
        <View style={classes.principalContainer}>

            <View style={classes.dataContainer}>

                <View style={classes.notEditableDataContainer}>
                    <View style={classes.principalDataContainer}>

                        <View style={classes.imageStyle} />

                        <View style={classes.usuarioNameContainer}>
                            <Text style={classes.principalText}>{`${data.first_name} ${data.last_name}`}</Text>
                            <Text style={classes.secundaryTextEnd}>@{data.username}</Text>
                        </View>

                    </View>

                    <View style={classes.mailContainer}>
                        <Text style={classes.principalText}>Correo:</Text>
                        <Text style={classes.secundaryTextCenter}>{data.email}</Text>
                    </View>

                </View>

                <View style={classes.birthdayContainer}>

                    <View style={classes.birthdayTextContainer}>
                        <Text style={classes.principalText}>Fecha de nacimiento:</Text>
                        <Text style={classes.principalText}>{birthday.toString()}</Text>
                    </View>

                    <TouchableOpacity 
                        style={classes.iconContainer}
                        onPress={ _ => setShowDate(true) }
                    >
                        <Icon
                            style={{ alignSelf: "center" }}
                            name='edit'
                            size={RFValue(45)}
                            color={Colors.colorYellow}
                        />
                    </TouchableOpacity>

                    {showDate && (
                        <DateTimePicker
                            testID="datetimepicker"
                            value={date}
                            onChange={changeDate}
                            mode="date"
                            display="spinner"
                        />
                    )}

                </View>

                <View style={classes.twoInputContainer}>

                    <View style={classes.inputHorizontalContainer}>
                        <Text style={classes.principalText}>PIN:</Text>

                        <TextInput style={classes.inputPIN}
                            placeholder='00000000'
                            placeholderTextColor={Colors.colorYellow + 55}
                            keyboardType='number-pad'
                        />
                    </View>

                    <View style={classes.inputHorizontalContainer}>
                        <Text style={classes.principalText}>Confirmar PIN:</Text>

                        <TextInput style={classes.inputPIN}
                            placeholder='00000000'
                            placeholderTextColor={Colors.colorYellow + 55}
                            keyboardType='number-pad'
                        />
                    </View>

                </View>

            </View>

            <View style={classes.bottomContainer}>

                <TouchableOpacity style={classes.bottomStyle}>
                    <Text style={{ color: Colors.colorMain, fontSize: 26 }}>Guardar</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default Profile