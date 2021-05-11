import React, { useReducer, useState, useEffect } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Platform,
} from "react-native"

// Import Hook
import useStyles from "../../hooks/useStyles.hook"
import useKyc from "../../hooks/Kyc/useKyc.hook"

// Import Styles
import { ECommerRegisterS } from "../../Styles/Views/index"

// Import Constans
import {
    GlobalStyles,
    errorMessage,
    Colors,
    RFValue,
    checkPermissionCamera,
    calcAge,
    getHeaders,
    http,
    successMessage,
} from "../../utils/constants"
import countries from "../../utils/countries.json"
import professions from "../../utils/profession.json"

import store from "../../store/index"

// Import Components
import Container from "../../components/Container/Container"
import CheckBox from "react-native-check-box"
import Modal from "react-native-modal"
import UploadImage from "../../components/UploadImage/UploadImage"
import { View as ViewAnimation } from "react-native-animatable"
import { launchCamera } from "react-native-image-picker"
import { Picker } from "@react-native-picker/picker"
import Icon from "react-native-vector-icons/MaterialIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import validator from "validator"

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
    foundsOrigin: "De donde provienen tus ingresos",
    profession: "",
    avatar: null,
    identificationPhoto: null,
    password: "",

    country: countries[0],
    filter: "",

    tab: 0,
}

const beneficiaryStateReducer = {
    beneficiaryRelationship: 1,
    beneficiaryFirstname: "",
    beneficiaryLastname: "",
    beneficiaryIdentificationType: 1,
    beneficiarybirthday: new Date(),
    beneficiaryIdentificationNumber: "",
    beneficiaryPrincipalNumber: "",
    beneficiaryAlternativeNumber: "",
    beneficiaryEmail: "",
    beneficiaryNationality: "",
    beneficiaryPhoneCodeNationality: "",
    beneficiaryCurrencyNationality: "",
    beneficiaryResidence: "",
    beneficiaryPhoneCodeResidence: "",
    beneficiaryCurrencyResidence: "",
    beneficiaryProvince: "",
    beneficiaryCity: "",
    beneficiaryTutor: 0,
    beneficiaryDirection1: "",
    beneficiaryDirection2: "",
    beneficiaryPostalCode: "",
    beneficiaryFoundsOrigin: 1,
    beneficiaryEstimateMonthlyAmount: 0,
    beneficiaryProfession: "",
    beneficiaryAvatar: null,
    beneficiaryIdentificationPhoto: null,

    beneficiaryCountry: countries[0],
    beneticiaryFilter: "",
}

const optionsOpenCamera = {
    noData: true,
    maxHeight: 1024,
    maxWidth: 1024,
    quality: 0.6,
    mediaType: "photo",
    storageOptions: {
        skipBackup: true,
        path: "Pictures/myAppPicture/", //-->this is FUCK neccesary
        privateDirectory: true,
    },
}

const reducer = (state, action) => {
    return {
        ...state,
        [action.type]: action.payload,
    }
}

const ECommerRegister = () => {
    // Estado que almacena los estilos de los componentes
    const classes = useStyles(ECommerRegisterS)

    // Estados iniciales de los impust
    const [state, dispatch] = useReducer(reducer, initialState)
    const [beneficiaryState, dispatchBeneficiary] = useReducer(
        reducer,
        beneficiaryStateReducer,
    )

    // Estados que almacenan las imagenes del usuario
    const [avatar, setAvatar] = useState(null)
    const [identificationPhoto, setIdentificationPhoto] = useState(null)

    // Estados que almacenan las imagenes del beneficiario / tutor
    const [beneficiaryAvatar, setBeneficiaryAvatar] = useState(null)
    const [
        beneficiaryIdentificationPhoto,
        setBeneficiaryIdentificationPhoto,
    ] = useState(null)

    // Estado hace el cambio del CheckBox para el Cambio de leyenda cuando hay beneficiario
    const [CheckState, setCheckState] = useState(false)

    // Estado que indica si muestra la modal de paises
    const [modalCoutry, setModalCountry] = useState(false)

    const { global } = store.getState()

    // Estados que almacenan la fecha del beneficiario
    const [showDate, setShowDate] = useState(false)
    const [birthday, setBirthday] = useState(new Date())

    // Estado que almacena la edad del usuario para hacer validaciones
    const [age, setAge] = useState("")

    const { submitInformationSer } = useKyc()

    // Hacemos la peticion al server
    const submitInformation = async () => {
        try {
            const dataSent = {
                idTypeIdentification: state.identificationType,
                identificationNumber: state.identificationNumber,
                alternativeNumber: `${state.country.phoneCode} ${state.alternativeNumber
                    }`,
                nationality: state.nationality,
                nationalityPhoneCode: state.phoneCodeNationality,
                nationalityCurrencySymbol: state.currencyNationality,
                province: state.province,
                direction1: state.direction1,
                direction2: state.direction2,
                answer1: state.foundsOrigin,
                answer2: state.profession,
            }
            if (age < 18 || CheckState) {
                dataSent.beneficiary = {
                    idRelationship: state.beneficiaryRelationship,
                    idTypeIdentification: state.beneficiaryIdentificationType,
                    firstname: state.beneficiaryFirstname,
                    lastname: state.beneficiaryLastname,
                    email: state.beneficiaryEmail,
                    birthday: state.beneficiarybirthday,
                    identificationNumber: state.beneficiaryIdentificationNumber,
                    principalNumber: state.beneficiaryPrincipalNumber,
                    alternativeNumber: state.beneficiaryAlternativeNumber,
                    nationality: state.beneficiaryNationality,
                    nationalityPhoneCode: state.beneficiaryPhoneCodeNationality,
                    nationalityCurrencySymbol:
                        state.beneficiaryCurrencyNationality,
                    residence: state.beneficiaryResidence,
                    residencePhoneCode: state.beneficiaryPhoneCodeResidence,
                    residenceCurrencySymbol: state.beneficiaryCurrencyResidence,
                    province: state.beneficiaryProvince,
                    city: state.beneficiaryCity,
                    tutor: state.beneficiaryTutor,
                    direction1: state.beneficiaryDirection1,
                    direction2: state.beneficiaryDirection2,
                    postalCode: state.beneficiaryPostalCode,
                    answer1: state.beneficiaryFoundsOrigin,
                    answer2: state.beneficiaryProfession,
                }
            }

            console.log('datasent', dataSent)

            submitInformationSer(createFormData(
                avatar,
                identificationPhoto,
                beneficiaryAvatar,
                beneficiaryIdentificationPhoto,
                dataSent
            ))

        } catch (error) {
            errorMessage(error.toString())
        }
    }
    
    

    const createFormData = (
        avatar,
        identificationPhoto,
        beneficiaryAvatar,
        beneficiaryIdentificationPhoto,
        body,
    ) => {
        

        const myAvatar={
            name: avatar.fileName,
            type: avatar.type,
            uri:
                Platform.OS === "android"
                    ? avatar.uri
                    : avatar.uri.replace("file://", ""),
        }

        const data = new FormData()

        data.append("avatar", JSON.stringify(myAvatar))

        const myIdentificationPhoto={
            name: identificationPhoto.fileName,
            type: identificationPhoto.type,
            uri:
                Platform.OS === "android"
                    ? identificationPhoto.uri
                    : identificationPhoto.uri.replace("file://", ""),
        }

        data.append("identificationPhoto", JSON.stringify(myIdentificationPhoto))

        if (CheckState) {
            data.append("beneficiaryAvatar", {
                name: beneficiaryAvatar.fileName,
                type: beneficiaryAvatar.type,
                uri:
                    Platform.OS === "android"
                        ? beneficiaryAvatar.uri
                        : beneficiaryAvatar.uri.replace("file://", ""),
            })
            data.append("beneficiaryIdentificationPhoto", {
                name: beneficiaryIdentificationPhoto.fileName,
                type: beneficiaryIdentificationPhoto.type,
                uri:
                    Platform.OS === "android"
                        ? beneficiaryIdentificationPhoto.uri
                        : beneficiaryIdentificationPhoto.uri.replace(
                            "file://",
                            "",
                        ),
            })
        }

        Object.keys(body).forEach(key => {
            data.append(key, body[key])
        })

        
        return data
    }

    // Funcion que permite hacer el calculo de la fecha
    const ageUser = () => {
        const result = calcAge(global.birthday)

        setAge(result)
        dispatch({ type: "beneficiaryTutor", payload: result < 18 ? 1 : 0 })
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
                    // Validamos que ahiga ingresado el numero de identificacion
                    if (state.identificationNumber.trim().length === 0) {
                        throw String("Ingrese un numero de identificacion")
                    }
                    break
                }

                case 1: {
                    // Validmos el Estado/Provincia/Region
                    if (state.province.trim().length === 0) {
                        throw String("Ingrese un Estado/Provincia/Region")
                    }

                    // Validamos la direccion principal
                    if (state.direction1.trim().length === 0) {
                        throw String("La Direccion es requerida")
                    }
                    break
                }

                case 2: {
                    if (state.profession.trim().length === 0) {
                        throw String("Es requerido su profesion actual")
                    }
                    if (avatar === null) {
                        throw String("Imagen de perfil es requerida")
                    }

                    if (identificationPhoto === null) {
                        throw String("Imagen de identificacion es requerida")
                    }
                    break
                }

                case 3: {
                    // Validamos el nombre del benificiario/Tutor
                    if (
                        beneficiaryState.beneficiaryFirstname.trim().length ===
                        0
                    ) {
                        throw String("Ingresa un nombre")
                    }

                    // Validamos el apellido
                    if (
                        beneficiaryState.beneficiaryLastname.trim().length === 0
                    ) {
                        throw String("Ingrese un apellido")
                    }

                    // Validamos que ahiga ingresado el numero de identificacion
                    if (
                        beneficiaryState.beneficiaryIdentificationNumber.trim()
                            .length <= 7
                    ) {
                        throw String("Ingrese un numero de identificacion")
                    }

                    // Validamos el numero de telefono
                    if (
                        beneficiaryState.beneficiaryPrincipalNumber.length <= 7
                    ) {
                        throw String("Ingrese numero de telefono")
                    }

                    // Validamos el Email
                    if (!validator.isEmail(beneficiaryState.beneficiaryEmail)) {
                        throw String("Ingrese un email valido")
                    }
                }

                case 4: {
                    // Validmos el Estado/Provincia/Region
                    if (
                        beneficiaryState.beneficiaryProvince.trim().length === 0
                    ) {
                        throw String("Ingrese un Estado/Provincia/Region")
                    }

                    // Validamos la ciudad en la que reside
                    if (beneficiaryState.beneficiaryCity.trim().length === 0) {
                        throw String("Ciudad es requerida")
                    }

                    // Validamos la direccion principal
                    if (
                        beneficiaryState.beneficiaryDirection1.trim().length ===
                        0
                    ) {
                        throw String("La Direccion es requerida")
                    }

                    // Validamos el codigo postal de donde reside
                    if (beneficiaryState.beneficiaryPostalCode.length < 3) {
                        throw String("El codigo postal es requerido")
                    }
                    break
                }

                case 5: {
                    if (
                        beneficiaryState.beneficiaryProfession.trim().length ===
                        0
                    ) {
                        throw String("Es requerido su profesion actual")
                    }

                    if (beneficiaryAvatar === null) {
                        throw String(
                            "Imagen de perfil de beneficiario es requerida",
                        )
                    }

                    if (beneficiaryIdentificationPhoto === null) {
                        throw String(
                            "Imagen de identificacion de beneficiario es requerida",
                        )
                    }
                    break
                }
            }
            dispatch({ type: "tab", payload: tab + 1 })
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    /**Funcion que carga la anterior ventana */
    const previousPage = () => {
        const { tab } = state

        dispatch({ type: "tab", payload: tab == 0 ? tab : tab - 1 })
    }

    const changeDate = (event, selectedDate) => {
        const currentDate = selectedDate || birthday
        setBirthday(currentDate)
        setShowDate(false)
    }

    /**
     * Funcion que permite escoger si tomer una foto/cargar una imagen
     * Para previsualizarla
     * @param {*} ImageOption
     */
    const uploadImageView = async ImageOption => {
        try {
            await checkPermissionCamera()

            launchCamera(optionsOpenCamera, response => {
                if (response.error) {
                    throw String(response.error)
                }

                switch (ImageOption) {
                    case "avatar": {
                        setAvatar(response)
                        break
                    }

                    case "identificationPhoto": {
                        setIdentificationPhoto(response)
                        break
                    }

                    case "beneficiaryAvatar": {
                        setBeneficiaryAvatar(response)
                        break
                    }

                    case "beneficiaryIdentificationPhoto": {
                        setBeneficiaryIdentificationPhoto(response)
                        break
                    }

                    default: {
                        break
                    }
                }
            })
        } catch (error) {
            showNotification(error.toString())
        }
    }

    useEffect(() => {
        ageUser()
    }, [])

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
                                    Tipo de identificación
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <View style={GlobalStyles.containerPicker}>
                                <Picker
                                    style={GlobalStyles.picker}
                                    selectedValue={state.identificationType}
                                    onValueChange={value => {
                                        dispatch({
                                            type: "identificationType",
                                            payload: value,
                                        })
                                    }}>
                                    <Picker.Item label="Cedula" value={1} />
                                    <Picker.Item label="Pasaporte" value={2} />
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
                                placeholder={"Ingrese número de identificación"}
                                placeholderTextColor={"#CCC"}
                                style={classes.textInput}
                                value={state.identificationNumber}
                                onChangeText={str =>
                                    dispatch({
                                        type: "identificationNumber",
                                        payload: str,
                                    })
                                }
                            />
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
                                        classes.textInput,
                                        {
                                            marginRight: 10,
                                            justifyContent: "center",
                                        },
                                    ]}
                                    onPress={_ => {
                                        setModalCountry(true)
                                        console.log(
                                            `beneficiario: ${beneficiaryStateReducer.beneticiaryFilter
                                            } no beneficiario: ${initialState.filter
                                            }`,
                                        )
                                    }}>
                                    <Text
                                        style={{
                                            color: Colors.colorYellow,
                                        }}>
                                        {state.country.phoneCode}
                                    </Text>
                                </TouchableOpacity>

                                <TextInput
                                    style={[classes.textInput, { flex: 1 }]}
                                    placeholder="Ingrese numero de telefono"
                                    placeholderTextColor="#CCC"
                                    value={state.alternativeNumber}
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    keyboardAppearance="dark"
                                    onChangeText={payload =>
                                        dispatch({
                                            type: "alternativeNumber",
                                            payload,
                                        })
                                    }
                                />
                            </View>
                        </View>

                        <View style={classes.rowButtons}>
                            <TouchableOpacity>
                                <Text style={classes.textBack}>
                                    Cerrar sesión
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={nextPage}
                                style={GlobalStyles.buttonPrimary}>
                                <Text style={GlobalStyles.textButton}>
                                    Siguiente
                                </Text>
                            </TouchableOpacity>
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
                            <View style={classes.row}>
                                <View style={classes.labelsRow}>
                                    <Text style={classes.legendRow}>
                                        Nacionalidad
                                    </Text>
                                    <Text style={classes.required}>
                                        requerido
                                    </Text>
                                </View>

                                <View style={GlobalStyles.containerPicker}>
                                    <Picker
                                        style={GlobalStyles.picker}
                                        selectedValue={state.nationality}
                                        onValueChange={value => {
                                            dispatch({
                                                type: "nationality",
                                                payload: value,
                                            })

                                            const selectedNationality = countries.find(
                                                item => item.name === value,
                                            )

                                            dispatch({
                                                type: "phoneCodeNationality",
                                                payload:
                                                    selectedNationality.phoneCode,
                                            })
                                            dispatch({
                                                type: "currencyNationality",
                                                payload:
                                                    selectedNationality.code,
                                            })
                                        }}>
                                        {countries.map((item, index) => (
                                            <Picker.Item
                                                key={index}
                                                label={item.name}
                                                value={item.name}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            </View>

                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Estado/Provincia/Región
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                style={classes.textInput}
                                placeholder="Estado/Provincia/Region"
                                placeholderTextColor="#CCC"
                                value={state.province}
                                onChangeText={str =>
                                    dispatch({ type: "province", payload: str })
                                }
                            />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Dirección (Línea 1)
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                style={classes.textInput}
                                placeholder="ingrese Direccion"
                                placeholderTextColor="#CCC"
                                value={state.direction1}
                                onChangeText={str =>
                                    dispatch({
                                        type: "direction1",
                                        payload: str,
                                    })
                                }
                            />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Dirección (Línea 2)
                                </Text>
                            </View>
                            <TextInput
                                style={classes.textInput}
                                placeholder="ingrese Direccion"
                                placeholderTextColor="#CCC"
                                value={state.direction2}
                                onChangeText={str =>
                                    dispatch({
                                        type: "direction2",
                                        payload: str,
                                    })
                                }
                            />
                        </View>

                        <View style={classes.rowButtons}>
                            <TouchableOpacity onPress={previousPage}>
                                <Text style={classes.textBack}>Atras</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={nextPage}
                                style={GlobalStyles.buttonPrimary}>
                                <Text style={GlobalStyles.textButton}>
                                    Siguiente
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ViewAnimation>
                )}

                {state.tab === 2 && (
                    <ViewAnimation style={classes.tab} animation="fadeIn">
                        {age > 18 ? (
                            <>
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
                                        <Text style={classes.required}>
                                            Requerido
                                        </Text>
                                    </View>
                                    <View style={GlobalStyles.containerPicker}>
                                        <Picker
                                            style={GlobalStyles.picker}
                                            onValueChange={value => {
                                                dispatch({
                                                    type: "foundsOrigin",
                                                    payload: value,
                                                })
                                            }}
                                            selectedValue={state.foundsOrigin}>
                                            {professions.map((item, index) => (
                                                <Picker.Item
                                                    key={index}
                                                    label={item.profession}
                                                    value={item.profession}
                                                />
                                            ))}
                                        </Picker>
                                    </View>
                                </View>

                                <View style={classes.row}>
                                    <View style={classes.labelsRow}>
                                        <Text style={classes.legendRow}>
                                            ¿Cuál es su profesión actualmente?
                                        </Text>
                                        <Text style={classes.required}>
                                            Requerido
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={classes.textInput}
                                        placeholder="Cual es tu profesion"
                                        placeholderTextColor="#CCC"
                                        value={state.profession}
                                        onChangeText={str =>
                                            dispatch({
                                                type: "profession",
                                                payload: str,
                                            })
                                        }
                                    />
                                </View>
                            </>
                        ) : null}

                        <View style={classes.containerTitle}>
                            {age < 18 ? (
                                <Text style={classes.textTitle}>
                                    4. Foto de perfil y verificación
                                </Text>
                            ) : (
                                <Text style={classes.textTitle}>
                                    5. Foto de perfil y verificación
                                </Text>
                            )}
                        </View>

                        <View style={classes.position}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.textImage}>
                                    Subir foto de perfil
                                </Text>
                            </View>
                            <UploadImage
                                value={avatar}
                                onChange={_ => uploadImageView("avatar")}
                            />
                        </View>

                        <View style={classes.position}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.textImage}>
                                    Subir foto frontal sosteniendo su ID
                                </Text>
                            </View>
                            <UploadImage
                                value={identificationPhoto}
                                onChange={_ =>
                                    uploadImageView("identificationPhoto")
                                }
                            />
                        </View>

                        {age > 18 && (
                            <>
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
                                            isChecked={CheckState}
                                            onClick={_ =>
                                                setCheckState(!CheckState)
                                            }
                                        />
                                    </View>
                                </View>
                            </>
                        )}

                        {age < 18 || CheckState ? (
                            <>
                                <View style={classes.rowButtons}>
                                    <TouchableOpacity onPress={previousPage}>
                                        <Text style={classes.textBack}>
                                            Atras
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={nextPage}
                                        style={GlobalStyles.buttonPrimary}>
                                        <Text style={GlobalStyles.textButton}>
                                            Siguiente
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <TouchableOpacity
                                onPress={submitInformation}
                                style={GlobalStyles.buttonPrimary}>
                                <Text style={GlobalStyles.textButton}>
                                    Guardar
                                </Text>
                            </TouchableOpacity>
                        )}
                    </ViewAnimation>
                )}

                {state.tab === 3 && (
                    <ViewAnimation style={classes.tab} animation="fadeIn">
                        <View style={classes.containerTitle}>
                            {age > 18 || CheckState ? (
                                <Text style={classes.containerTitleText}>
                                    Información del Beneficiario
                                </Text>
                            ) : (
                                <Text style={classes.containerTitleText}>
                                    Información del Tutor
                                </Text>
                            )}
                        </View>

                        <View style={classes.containerTitle}>
                            <Text style={classes.textTitle}>
                                1. Información personal
                            </Text>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>Nombre</Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={"Ingrese nombre(s)"}
                                placeholderTextColor={"#CCC"}
                                style={classes.textInput}
                                value={beneficiaryState.beneficiaryFirstname}
                                onChangeText={str =>
                                    dispatchBeneficiary({
                                        type: "beneficiaryFirstname",
                                        payload: str,
                                    })
                                }
                            />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Apellido(s)
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                placeholder={"Ingrese apellido(s)"}
                                placeholderTextColor={"#CCC"}
                                style={classes.textInput}
                                value={beneficiaryState.beneficiaryLastname}
                                onChangeText={str =>
                                    dispatchBeneficiary({
                                        type: "beneficiaryLastname",
                                        payload: str,
                                    })
                                }
                            />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Fecha de nacimiento
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <View style={classes.column}>
                                <TouchableOpacity
                                    onPress={_ => setShowDate(true)}>
                                    <AntDesign
                                        name="calendar"
                                        size={RFValue(40)}
                                        color={Colors.colorYellow}
                                    />
                                </TouchableOpacity>

                                <View style={classes.borderYellow}>
                                    <Text style={classes.textDate}>
                                        {moment(birthday).format("DD/MM/YYYY")}
                                    </Text>
                                </View>

                                {showDate && (
                                    <DateTimePicker
                                        testID="datetimepicker"
                                        value={birthday}
                                        onChange={changeDate}
                                        mode="date"
                                        display="spinner"
                                    />
                                )}
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
                                placeholder={"Ingrese número de identificación"}
                                placeholderTextColor={"#CCC"}
                                style={classes.textInput}
                                value={beneficiaryState.identificationNumber}
                                onChangeText={str =>
                                    dispatchBeneficiary({
                                        type: "beneficiaryIdentificationNumber",
                                        payload: str,
                                    })
                                }
                            />
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

                            <Text style={classes.required}>Requerido</Text>

                            <View style={classes.rowPhoneNumber}>
                                <TouchableOpacity
                                    style={[
                                        classes.textInput,
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
                                    style={[classes.textInput, { flex: 1 }]}
                                    placeholder="Ingrese numero de telefono"
                                    placeholderTextColor="#CCC"
                                    value={
                                        beneficiaryState.beneficiaryPrincipalNumber
                                    }
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    keyboardAppearance="dark"
                                    onChangeText={payload =>
                                        dispatchBeneficiary({
                                            type: "beneficiaryPrincipalNumber",
                                            payload,
                                        })
                                    }
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
                                        classes.textInput,
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
                                    style={[classes.textInput, { flex: 1 }]}
                                    placeholder="Ingrese numero de telefono"
                                    placeholderTextColor="#CCC"
                                    value={
                                        beneficiaryState.beneficiaryAlternativeNumber
                                    }
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    keyboardAppearance="dark"
                                    onChangeText={payload =>
                                        dispatchBeneficiary({
                                            type:
                                                "beneficiaryAlternativeNumber",
                                            payload,
                                        })
                                    }
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
                                style={classes.textInput}
                                placeholder="Ingrese correo electronico"
                                placeholderTextColor="#CCC"
                                value={beneficiaryState.beneficiaryEmail}
                                keyboardType="email-address"
                                onChangeText={str =>
                                    dispatchBeneficiary({
                                        type: "beneficiaryEmail",
                                        payload: str,
                                    })
                                }
                            />
                        </View>

                        <View style={classes.rowButtons}>
                            <TouchableOpacity onPress={previousPage}>
                                <Text style={classes.textBack}>Atras</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={nextPage}
                                style={GlobalStyles.buttonPrimary}>
                                <Text style={GlobalStyles.textButton}>
                                    Siguiente
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ViewAnimation>
                )}
                {state.tab === 4 && (
                    <ViewAnimation style={classes.tab} animation="fadeIn">
                        <View style={classes.containerTitle}>
                            {age > 18 || CheckState ? (
                                <Text style={classes.containerTitleText}>
                                    Información del Beneficiario
                                </Text>
                            ) : (
                                <Text style={classes.containerTitleText}>
                                    Información del Tutor
                                </Text>
                            )}
                        </View>
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
                                <Picker
                                    style={GlobalStyles.picker}
                                    selectedValue={
                                        beneficiaryState.beneficiaryNationality
                                    }
                                    onValueChange={value => {
                                        dispatchBeneficiary({
                                            type: "beneficiaryNationality",
                                            payload: value,
                                        })

                                        const selectedNationality = countries.find(
                                            item => item.name === value,
                                        )

                                        dispatchBeneficiary({
                                            type:
                                                "beneficiaryPhoneCodeNationality",
                                            payload:
                                                selectedNationality.phoneCode,
                                        })
                                        dispatchBeneficiary({
                                            type:
                                                "beneficiaryCurrencyNationality",
                                            payload: selectedNationality.code,
                                        })
                                    }}>
                                    {countries.map((item, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={item.name}
                                            value={item.name}
                                        />
                                    ))}
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
                                <Picker
                                    style={GlobalStyles.picker}
                                    selectedValue={
                                        beneficiaryState.beneficiaryResidence
                                    }
                                    onValueChange={value => {
                                        dispatchBeneficiary({
                                            type: "beneficiaryResidence",
                                            payload: value,
                                        })

                                        const selectedNationality = countries.find(
                                            item => item.name === value,
                                        )

                                        dispatchBeneficiary({
                                            type:
                                                "beneficiaryPhoneCodeResidence",
                                            payload:
                                                selectedNationality.phoneCode,
                                        })
                                        dispatchBeneficiary({
                                            type:
                                                "beneficiaryCurrencyResidence",
                                            payload: selectedNationality.code,
                                        })
                                    }}>
                                    {countries.map((item, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={item.name}
                                            value={item.name}
                                        />
                                    ))}
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
                                style={classes.textInput}
                                placeholder="Estado/Provincia/Region"
                                placeholderTextColor="#CCC"
                                value={beneficiaryState.beneficiaryProvince}
                                onChangeText={str =>
                                    dispatchBeneficiary({
                                        type: "beneficiaryProvince",
                                        payload: str,
                                    })
                                }
                            />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>Ciudad</Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                style={classes.textInput}
                                placeholder="Ingresa Ciudad"
                                placeholderTextColor="#CCC"
                                value={beneficiaryState.beneficiaryCity}
                                onChangeText={str =>
                                    dispatchBeneficiary({
                                        type: "beneficiaryCity",
                                        payload: str,
                                    })
                                }
                            />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Dirección (Línea 1)
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                style={classes.textInput}
                                placeholder="ingrese Direccion"
                                placeholderTextColor="#CCC"
                                value={beneficiaryState.beneficiaryDirection1}
                                onChangeText={str =>
                                    dispatchBeneficiary({
                                        type: "beneficiaryDirection1",
                                        payload: str,
                                    })
                                }
                            />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Dirección (Línea 2)
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                style={classes.textInput}
                                placeholder="ingrese Direccion"
                                placeholderTextColor="#CCC"
                                value={beneficiaryState.beneficiaryDirection2}
                                onChangeText={str =>
                                    dispatchBeneficiary({
                                        type: "beneficiaryDirection2",
                                        payload: str,
                                    })
                                }
                            />
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.legendRow}>
                                    Codigo postal
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput
                                style={classes.textInput}
                                placeholder="ingrese Codigo Postal"
                                placeholderTextColor="#CCC"
                                value={beneficiaryState.beneficiaryPostalCode}
                                autoCorrect={false}
                                keyboardType="numeric"
                                keyboardAppearance="dark"
                                onChangeText={str =>
                                    dispatchBeneficiary({
                                        type: "beneficiaryPostalCode",
                                        payload: str,
                                    })
                                }
                            />
                        </View>

                        <View style={classes.rowButtons}>
                            <TouchableOpacity onPress={previousPage}>
                                <Text style={classes.textBack}>Atras</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={nextPage}
                                style={GlobalStyles.buttonPrimary}>
                                <Text style={GlobalStyles.textButton}>
                                    Siguiente
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ViewAnimation>
                )}

                {state.tab === 5 && (
                    <ViewAnimation style={classes.tab} animation="fadeIn">
                        <View style={classes.containerTitle}>
                            {age > 18 || CheckState ? (
                                <Text style={classes.containerTitleText}>
                                    Información del Beneficiario
                                </Text>
                            ) : (
                                <Text style={classes.containerTitleText}>
                                    Información del Tutor
                                </Text>
                            )}
                        </View>
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
                                style={classes.textInput}
                                placeholder="Cual es tu profesion"
                                placeholderTextColor="#CCC"
                                value={beneficiaryState.beneficiaryProfession}
                                onChangeText={str =>
                                    dispatchBeneficiary({
                                        type: "beneficiaryProfession",
                                        payload: str,
                                    })
                                }
                            />
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
                            <UploadImage
                                value={beneficiaryAvatar}
                                onChange={_ =>
                                    uploadImageView("beneficiaryAvatar")
                                }
                            />
                        </View>
                        <View style={classes.position}>
                            <View style={classes.labelsRow}>
                                <Text style={classes.textImage}>
                                    Subir foto frontal sosteniendo su ID
                                </Text>
                            </View>
                            <UploadImage
                                value={beneficiaryIdentificationPhoto}
                                onChange={_ =>
                                    uploadImageView(
                                        "beneficiaryIdentificationPhoto",
                                    )
                                }
                            />
                        </View>

                        <View style={classes.rowButtons}>
                            <TouchableOpacity onPress={previousPage}>
                                <Text style={classes.textBack}>Atras</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={nextPage}
                                style={GlobalStyles.buttonPrimary}>
                                <Text style={GlobalStyles.textButton}>
                                    Guardar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ViewAnimation>
                )}
            </View>

            <Modal
                onBackdropPress={_ => setModalCountry(false)}
                onBackButtonPress={_ => setModalCountry(false)}
                isVisible={modalCoutry}>
                <View style={classes.containerModal}>
                    <TextInput
                        style={classes.textInput}
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
