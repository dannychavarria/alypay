import React, { useState, useEffect, useRef } from "react"
import {
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    TextInput,
} from "react-native"

//Import Hooks
import useStyles from "../../hooks/useStyles.hook"

// Import Styles
import { EditProfileStyles } from "../../Styles/Components/index"

//Import Components
import Icon from "react-native-vector-icons/Entypo"
import { Modalize } from "react-native-modalize"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"

//Import Assets
import profile from "../../static/profile-default.png"

// Import constants
import { Colors, GlobalStyles } from "../../utils/constants"

const EditProfile = ({ data = {} }) => {
    const classes = useStyles(EditProfileStyles)

    // Estado que visualiza el formulario de edicion de perfil
    const [showInfoEdit, setShowInfoEdit] = useState(false)
    // const [infoEdit,setInfoEdit] = useState(false)

    // Funcion que visualiza el formulario
    const editInfo = () => {
        setShowInfoEdit(true)
    }

    // Funcion que cancela la edicion del formulario de perfil
    const cancelInfo = () => {
        setShowInfoEdit(false)
    }
    const sheetRef = useRef(null)

    return (
        <>
            <View style={classes.container}>
                <TouchableOpacity onPress={() => sheetRef.current.open()}>
                    <View style={classes.imageContainer}>
                        <ImageBackground style={classes.image} source={profile}>
                            <View style={classes.containerIcon}>
                                <Icon
                                    name="camera"
                                    size={20}
                                    color={Colors.colorYellow}
                                    style={classes.icon}
                                />
                            </View>
                        </ImageBackground>
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

                            <TextInput style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.rowForm}>
                            <View style={classes.legendRow}>
                                <Text style={classes.titlePrincipalCard}>
                                    Usuario
                                </Text>
                            </View>

                            <TextInput style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.rowForm}>
                            <View style={classes.legendRow}>
                                <Text style={classes.titlePrincipalCard}>
                                    Correo Electronico
                                </Text>
                            </View>

                            <TextInput style={GlobalStyles.textInput} />
                        </View>

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
                                onPress={editInfo}
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

            <Modalize
                ref={sheetRef}
                snapPoint={200}
                modalHeight={200}
                modalStyle={classes.panel}
                HeaderComponent={
                    <View style={{ alignItems: "center" }}>
                        <Text style={classes.panelTitle}>Upload Photo</Text>
                        <Text style={classes.panelSubtitle}>
                            Choose Your Profile Picture
                        </Text>

                        <TouchableOpacity
                            style={[
                                GlobalStyles.buttonPrimaryLine,
                                { margin: 5 },
                            ]}>
                            <Text style={GlobalStyles.textButtonPrimaryLine}>
                                Tomar fotografia
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                GlobalStyles.buttonPrimaryLine,
                                { margin: 5 },
                            ]}>
                            <Text style={GlobalStyles.textButtonPrimaryLine}>
                                Tomar fotografia
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
        </>
    )
}

export default EditProfile
