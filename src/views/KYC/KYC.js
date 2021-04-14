import React, { useReducer, useState } from "react"
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native"

// Import Hook
import useStyles from "../../hooks/useStyles.hook"

// Import Styles
import { ECommerRegisterS } from "../../Styles/Views/index"

// Import Constans
import { GlobalStyles, errorMessage, Colors, RFValue } from "../../utils/constants"
import countries from "../../utils/countries.json"

// Import Components
import Container from "../../components/Container/Container"
import CheckBox from "react-native-check-box"
import Modal from "react-native-modal"
import UploadImage from "../../components/UploadImage/UploadImage"
import { View as ViewAnimation } from "react-native-animatable"
import { Picker } from "@react-native-picker/picker"
import Icon from "react-native-vector-icons/MaterialIcons"
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"

const initialState = {
    identificationType: 1,
    identificationNumber: "",
    alternativeNumber: "",
    nationality: "",
    phoneCodeNationality: "",
    currencyNationality: "",
    province: "",
    direction1: "",
    direction2: "",
    foundsOrigin: 1,
    profession: "",
    profilePictureId: null,
    identificationPictureId: null,

    country: countries[0],
    filter: "",

    tab: 0,
}

const reducer = (state, action) => {
    return {
        ...state,
        [action.type]: action.payload,
    }
}

const ECommerRegister = () => {
    const classes = useStyles(ECommerRegisterS)
    const [state, dispatch] = useReducer(reducer, initialState)
    const [checkState, setCheckState] = useState(false)
    const [showDate, setShowDate] = useState(false)
    const [birthday, setBirthday] = useState(new Date())


    // Estado que indica si muestra la modal de paises
    const [modalCoutry, setModalCountry] = useState(false)

    // Estados que permiten previsualizar las contraseñas
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")

    // Hacemos la peticion al server
    const submitInformation = async () => {
        try {
            const dataSent = {
                identificationType: state.identificationType,
                identificationNumber: state.identificationNumber,
                alternativeNumber: state.alternativeNumber,
                nationality: state.nationality,
                phoneCodeNationality: state.phoneCodeNationality,
                currencyNationality: state.currencyNationality,
                province: state.province,
                direction1: state.direction1,
                direction2: state.direction2,
                foundsOrigin: state.foundsOrigin,
                profession: state.profession,
            }
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    /**
     * Funcion que permite guardar la seleccion del pais
     * @param {*} item
     */
    const selectedCountry = item => {
        dispatch({ type: "country", payload: item })

        setModalCountry(false)
    }

    /**render element country modal */
    const ItemCountry = ({ item }) => {
        if (
            item.name.length > 0 &&
            item.name.toLowerCase().search(state.filter.toLocaleLowerCase()) >
            -1
        ) {
            return (
                <TouchableOpacity
                    style={classes.itemCountry}
                    onPress={_ => selectedCountry(item)}>
                    <Text style={{ color: "#FFF" }}>{item.name}</Text>
                    <Text style={{ color: Colors.colorYellow }}>
                        {item.phoneCode}
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    const nextPage = () => {
        const { tab } = state
        try {
            switch (tab) {
                case 0: {
                    break
                }

                case 1: {
                    break
                }
            }
            dispatch({ type: "tab", payload: tab === 5 ? tab : tab + 1 })
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    /**Funcion que carga la anterior ventana */
    const previousPage = () => {
        const { tab } = state

        dispatch({ type: "tab", payload: tab === 0 ? tab : tab - 1 })
    }

    const changeDate = (event, selectedDate) => {
        const currentDate = selectedDate || birthday
        setBirthday(currentDate)
        setShowDate(false)
    }

    return (
        <Container showLogo>
            <View style={classes.container}>
                {state.tab === 0 && (
                    <ViewAnimation style={classes.tab} animation="fadeIn">
                        <View style={classes.containerTitle}>
                            <Text style={classes.containerTitleText}>
                                Información del titular de la cuenta
                            </Text>
                        </View>

                        <View style={classes.containerTitle}>
                            <Text style={classes.textTitle}>
                                1. Información personal
                            </Text>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Contraseña de seguridad
                                </Text>
                            </View>
                            <View
                                style={[
                                    classes.textInputWithImage,
                                    GlobalStyles.textInput,
                                ]}>
                                <TextInput
                                    secureTextEntry={!showPassword}
                                    value={state.password}
                                    onChangeText={payload =>
                                        dispatch({ type: "password", payload })
                                    }
                                    placeholder="Contraseña"
                                    placeholderTextColor="#CCC"
                                    style={classes.textInputCol}
                                />
                                <TouchableOpacity
                                    onPress={e =>
                                        setShowPassword(!showPassword)
                                    }
                                    style={classes.touchableCol}>
                                    <Icon
                                        name={
                                            showPassword
                                                ? "visibility-off"
                                                : "visibility"
                                        }
                                        color={Colors.colorYellow}
                                        size={18}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Repetir contraseña de seguridad
                                </Text>
                            </View>
                            <View
                                style={[
                                    classes.textInputWithImage,
                                    GlobalStyles.textInput,
                                ]}>
                                <TextInput
                                    secureTextEntry={!showConfirmPassword}
                                    value={confirmPassword}
                                    onChangeText={value =>
                                        setConfirmPassword(value)
                                    }
                                    placeholder="Contraseña"
                                    placeholderTextColor="#CCC"
                                    style={classes.textInputCol}
                                />
                                <TouchableOpacity
                                    onPress={e =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                    style={classes.touchableCol}>
                                    <Icon
                                        name={
                                            showConfirmPassword
                                                ? "visibility-off"
                                                : "visibility"
                                        }
                                        color={Colors.colorYellow}
                                        size={18}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Tipo de identificación
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <View style={GlobalStyles.containerPicker}>
                                <Picker style={GlobalStyles.picker}>
                                    <Picker.Item
                                        label="Identificación"
                                        value={1}
                                    />
                                    <Picker.Item label="Cedula" value={2} />
                                </Picker>
                            </View>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Número de identificación
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={'Ingrese número de identificación'}
                                placeholderTextColor={'#CCC'}
                                style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.containerTitle}>
                            <Text style={classes.textTitle}>
                                2. Información de contacto
                            </Text>
                        </View>

                        <View style={classes.row}>
                            <Text style={classes.legendRow}>
                                Numero de telefono alternativo
                            </Text>

                            <View style={classes.rowPhoneNumber}>
                                <TouchableOpacity
                                    style={[
                                        GlobalStyles.textInput,
                                        {
                                            marginRight: 10,
                                            justifyContent: "center",
                                        },
                                    ]}
                                    onPress={_ => setModalCountry(true)}>
                                    <Text
                                        style={{
                                            color: Colors.colorYellow,
                                        }}>
                                        {state.country.phoneCode}
                                    </Text>
                                </TouchableOpacity>

                                <TextInput
                                    style={[
                                        GlobalStyles.textInput,
                                        { flex: 1 },
                                    ]}
                                    placeholder="Ingrese numero de telefono"
                                    placeholderTextColor="#CCC"
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    keyboardAppearance="dark"
                                />
                            </View>
                        </View>
                    </ViewAnimation>
                )}
                {state.tab === 1 && (
                    <ViewAnimation style={classes.tab} animation="fadeIn">
                        <View style={classes.containerTitle}>
                            <Text style={classes.textTitle}>
                                3. Nacionalidad y residencia
                            </Text>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Estado/Provincia/Región
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={'Ingrese estado, provincia o región'}
                                placeholderTextColor={'#CCC'}
                                style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Dirección (Línea 1)
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={'Ingrese dirección'}
                                placeholderTextColor={'#CCC'}
                                style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Dirección (Línea 2)
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={'Ingrese dirección'}
                                placeholderTextColor={'#CCC'}
                                style={GlobalStyles.textInput} />
                        </View>
                    </ViewAnimation>
                )}

                {state.tab === 2 && (
                    <ViewAnimation style={classes.tab} animation="fadeIn">
                        <View style={classes.row}>
                            <View style={classes.containerTitle}>
                                <Text style={classes.textTitle}>
                                    4. Preguntas de control
                                </Text>
                            </View>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    ¿De dónde proviene su capital?
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <View style={GlobalStyles.containerPicker}>
                                <Picker style={GlobalStyles.picker}>
                                    <Picker.Item
                                        label="seleccionar respuesta"
                                        value={1}
                                    />
                                    <Picker.Item label="Cedula" value={2} />
                                </Picker>
                            </View>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    ¿Cuál es su profesión actualmente?
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={'Ingrese profesión'}
                                placeholderTextColor={'#CCC'}
                                style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.containerTitle}>
                            <Text style={classes.textTitle}>
                                5. Foto de perfil y verificación
                            </Text>
                        </View>

                        <View style={classes.position}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.textImage}>
                                    Subir foto de perfil
                                </Text>
                            </View>
                            <UploadImage />
                        </View>

                        <View style={classes.position}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.textImage}>
                                    Subir foto frontal sosteniendo su ID
                                </Text>
                            </View>
                            <UploadImage />
                        </View>

                        <View style={classes.containerTitle}>
                            <Text style={classes.textTitle}>
                                6. Beneficiario
                            </Text>
                        </View>
                        <View style={classes.row}>
                            <View style={classes.checkContainer}>
                                <Text style={classes.legendSeePassword}>
                                    Añadir Beneficiario
                                </Text>
                                <CheckBox
                                    checkBoxColor={Colors.colorYellow}
                                    isChecked={checkState}
                                    onClick={_ => setCheckState(!checkState)}
                                />
                            </View>
                        </View>
                    </ViewAnimation>
                )}

                {state.tab === 3 && (
                    <ViewAnimation style={classes.tab} animation="fadeIn">
                        <View style={classes.containerTitle}>
                            <Text style={classes.containerTitleText}>
                                Información del representante legal
                            </Text>
                        </View>

                        <View style={classes.containerTitle}>
                            <Text style={classes.textTitle}>
                                1. Información personal
                            </Text>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Nombre(s)
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={'Ingrese nombre(s)'}
                                placeholderTextColor={'#CCC'}
                                style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Apellido(s)
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={'Ingrese apellido(s)'}
                                placeholderTextColor={'#CCC'}
                                style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Fecha de nacimiento
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <View style={classes.column}>

                                <TouchableOpacity onPress={_=>setShowDate(true)} >
                                    <Icon name='perm-contact-calendar' size={RFValue(40)} color={Colors.colorYellow} />
                                </TouchableOpacity>

                                <View style={classes.borderLeft}>
                                    <Text style={classes.legendRow}>{moment(birthday).format('DD.MM.YYYY')}</Text>
                                </View>

                                {showDate && (<DateTimePicker
                                    testID='datetimepicker'
                                    value={birthday}
                                    onChange={changeDate}
                                    mode="date"
                                    display='spinner'
                                />)}
                            </View>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Tipo de identificación
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <View style={GlobalStyles.containerPicker}>
                                <Picker style={GlobalStyles.picker}>
                                    <Picker.Item
                                        label="Identificación"
                                        value={1}
                                    />
                                    <Picker.Item label="Cedula" value={2} />
                                </Picker>
                            </View>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Número de identificación
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput 
                            placeholder={'Ingrese número de identificación'}
                            placeholderTextColor={'#CCC'}
                            style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.containerTitle}>
                            <Text style={classes.textTitle}>
                                2. Información de contacto
                            </Text>
                        </View>

                        <View style={classes.row}>
                            <Text style={classes.legendRow}>
                                Número de telefono principal
                            </Text>

                            <View style={classes.rowPhoneNumber}>
                                <TouchableOpacity
                                    style={[
                                        GlobalStyles.textInput,
                                        {
                                            marginRight: 10,
                                            justifyContent: "center",
                                        },
                                    ]}
                                    onPress={_ => setModalCountry(true)}>
                                    <Text
                                        style={{
                                            color: Colors.colorYellow,
                                        }}>
                                        {state.country.phoneCode}
                                    </Text>
                                </TouchableOpacity>

                                <TextInput
                                    style={[
                                        GlobalStyles.textInput,
                                        { flex: 1 },
                                    ]}
                                    placeholder="Ingrese número de telefono"
                                    placeholderTextColor="#CCC"
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    keyboardAppearance="dark"
                                />
                            </View>
                        </View>

                        <View style={classes.row}>
                            <Text style={classes.legendRow}>
                                Número de telefono alternativo
                            </Text>

                            <View style={classes.rowPhoneNumber}>
                                <TouchableOpacity
                                    style={[
                                        GlobalStyles.textInput,
                                        {
                                            marginRight: 10,
                                            justifyContent: "center",
                                        },
                                    ]}
                                    onPress={_ => setModalCountry(true)}>
                                    <Text
                                        style={{
                                            color: Colors.colorYellow,
                                        }}>
                                        {state.country.phoneCode}
                                    </Text>
                                </TouchableOpacity>

                                <TextInput
                                    style={[
                                        GlobalStyles.textInput,
                                        { flex: 1 },
                                    ]}
                                    placeholder="Ingrese número de telefono"
                                    placeholderTextColor="#CCC"
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    keyboardAppearance="dark"
                                />
                            </View>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Correo electronico
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput 
                            placeholder={'Ingrese correo'}
                            placeholderTextColor={'#CCC'}
                            style={GlobalStyles.textInput} />
                        </View>
                    </ViewAnimation>
                )}
                {state.tab === 4 && (
                    <ViewAnimation style={classes.tab} animation="fadeIn">
                        <View style={classes.containerTitle}>
                            <Text style={classes.textTitle}>
                                3. Nacionalidad y residencia
                            </Text>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Nacionalidad
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <View style={GlobalStyles.containerPicker}>
                                <Picker style={GlobalStyles.picker}>
                                    <Picker.Item
                                        label="Seleccione país de origen"
                                        value={1}
                                    />
                                    <Picker.Item label="Cedula" value={2} />
                                </Picker>
                            </View>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Pais de residencia
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <View style={GlobalStyles.containerPicker}>
                                <Picker style={GlobalStyles.picker}>
                                    <Picker.Item
                                        label="Seleccione país de residencia"
                                        value={1}
                                    />
                                    <Picker.Item label="Cedula" value={2} />
                                </Picker>
                            </View>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Estado/Provincia/Región
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={'Ingrese estado, provincia o región'}
                                placeholderTextColor={'#ccc'}
                                style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>Ciudad</Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={'Ingrese ciudad'}
                                placeholderTextColor={'#ccc'}
                                style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Dirección (Línea 1)
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={'Ingrese dirección'}
                                placeholderTextColor={'#ccc'}
                                style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Dirección (Línea 2)
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={'Ingrese dirección'}
                                placeholderTextColor={'#ccc'}
                                style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Codigo postal
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={'Ingrese dirección'}
                                placeholderTextColor={'#ccc'}
                                style={GlobalStyles.textInput} />
                        </View>
                    </ViewAnimation>
                )}

                {state.tab === 5 && (
                    <ViewAnimation style={classes.tab} animation="fadeIn">
                        <View style={classes.row}>
                            <View style={classes.containerTitle}>
                                <Text style={classes.textTitle}>
                                    4. Preguntas de control
                                </Text>
                            </View>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    ¿De dónde proviene su capital?
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <View style={GlobalStyles.containerPicker}>
                                <Picker style={GlobalStyles.picker}>
                                    <Picker.Item
                                        label="seleccionar respuesta"
                                        value={1}
                                    />
                                    <Picker.Item label="Cedula" value={2} />
                                </Picker>
                            </View>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    ¿Cuál es su profesión actualmente?
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={'Ingrese profesión'}
                                placeholderTextColor={'#ccc'}
                                style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Parentesco con el titular de la cuenta
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <View style={GlobalStyles.containerPicker}>
                                <Picker style={GlobalStyles.picker}>
                                    <Picker.Item
                                        label="seleccionar respuesta"
                                        value={1}
                                    />
                                    <Picker.Item label="Cedula" value={2} />
                                </Picker>
                            </View>
                        </View>

                        <View style={classes.containerTitle}>
                            <Text style={classes.textTitle}>
                                5. Foto de perfil y verificación
                            </Text>
                        </View>

                        <View style={classes.position}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.textImage}>
                                    Subir foto de perfil
                                </Text>
                            </View>
                            <UploadImage />
                        </View>
                        <View style={classes.position}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.textImage}>
                                    Subir foto frontal sosteniendo su ID
                                </Text>
                            </View>
                            <UploadImage />
                        </View>
                    </ViewAnimation>
                )}
            </View>

            <View style={classes.rowButtons}>
                <TouchableOpacity onPress={previousPage}>
                    <Text style={classes.textBack}>Atras</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={nextPage}
                    style={GlobalStyles.buttonPrimary}>
                    <Text style={GlobalStyles.textButton}>Siguiente</Text>
                </TouchableOpacity>
            </View>

            <Modal
                onBackdropPress={_ => setModalCountry(false)}
                onBackButtonPress={_ => setModalCountry(false)}
                isVisible={modalCoutry}>
                <View style={classes.containerModal}>
                    <TextInput
                        style={GlobalStyles.textInput}
                        placeholder="Buscar"
                        placeholderTextColor="#FFF"
                        value={state.filter}
                        onChangeText={str =>
                            dispatch({ type: "filter", payload: str })
                        }
                    />

                    <View style={{ height: 10 }} />

                    <FlatList
                        keyboardShouldPersistTaps="always"
                        data={countries}
                        renderItem={ItemCountry}
                        keyExtractor={(_, i) => i.toString()}
                    />
                </View>
            </Modal>
        </Container>
    )
}

export default ECommerRegister
