import React, { useEffect, useReducer, useState } from "react"

// Import components
import Video from "react-native-video"
import Modal from "react-native-modal"
import DatePicker from "react-native-date-picker"
import Icon from "react-native-vector-icons/MaterialIcons"
import CheckBox from "react-native-check-box"
import Lottie from "lottie-react-native"
import { View as ViewAnimation } from "react-native-animatable"
import {
    Text,
    TextInput,
    StyleSheet,
    Image,
    View,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Alert,
    FlatList,
    ScrollView,
    Keyboard,
} from "react-native"

// Import functions and constant
import {
    GlobalStyles,
    reducer,
    RFValue,
    Colors,
    http,
    errorMessage,
    loader,
} from "../../utils/constants"
import moment from "moment"
import validator from "validator"

// Import Assets
import sendAnimation from "../../animations/send.json"
import logo from "../../static/alypay.png"
import videoclip from "../../static/videos/cover.mp4"
import LogoFunko from "../../static/AlyFunko.png"

const initialState = {
    // Datos para el fomulario
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
    birthday: new Date(),
    city: "",
    postalCode: "",

    // datos para listado de paises
    countries: [],
    country: 10,

    // Filtro para busqueda
    filter: "",
    showCountries: false,

    // Vista seleccionada
    tab: 0,

    // Muestra el mensaje de registrado
    showSuccess: false,

    // estdo que indica si el cliente ha leido los terminos y condiciones
    readTerms: false,

    // estados para terminos y condiciones
    showButtonTerms: true,
    showModalTerms: false,

    showPassword: false,
}

const { height, width } = Dimensions.get("window")

const Register = ({ navigation }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // Estados que permiten previsualizar las contraseñas
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [showModal, setShowModal] = useState(false)

    /**Metodo que configura todo el componente */
    const configurateComponent = async () => {
        try {
            // Loader mode on
            loader(true)

            // Obtenemos el listado de paises
            const { data } = await http.get("/register/countries")

            dispatch({ type: "countries", payload: data })
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            // loader mode off
            loader(false)
        }
    }

    /**Metodo que confirma la salida del usuario a la pantalla de inicio */
    const goBack = () => {
        Alert.alert(
            "Estas a punto de salir",
            "Perderas todo tus registros. ¿Salir?",
            [
                {
                    text: "Cancelar",
                    onPress: () => {},
                },
                {
                    text: "Salir",
                    onPress: () => navigation.pop(),
                },
            ],
        )

        return true
    }

    /**Metodo que se ejecuta cuando el usuario selecciona una ciudad */
    const selectedCountry = item => {
        dispatch({ type: "country", payload: item })

        dispatch({ type: "showCountries", payload: false })
    }

    /**render element country modal */
    const ItemCountry = ({ item, index }) => {
        if (
            item.name.length > 0 &&
            item.name.toLowerCase().search(state.filter.toLocaleLowerCase()) >
                -1
        ) {
            return (
                <TouchableOpacity
                    style={styles.itemCountry}
                    key={index}
                    onPress={_ => selectedCountry(index)}>
                    <Text style={{ color: "#FFF" }}>{item.name}</Text>
                    <Text style={{ color: Colors.colorYellow }}>
                        {item.phoneCode}
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    /**Funcion que envia los datos al servidor backend */
    const onSubmit = async () => {
        try {
            if(!state.readTerms){
                throw String("Acepte los terminos")
            }
            // Loader on mode
            loader(true)

            const { name: country, phoneCode: code } = state.countries[
                state.country
            ]

            const dataArgs = {
                username: state.username,
                password: state.password,
                email: state.email,
                firstname: state.firstname,
                lastname: state.lastname,
                birthday: state.birthday,
                phone: state.phoneNumber,
                city: state.city,
                postal: state.postalCode,
                country,
                code,
            }

            const { data } = await http.post("/register", dataArgs)

            if (data.error) {
                throw data.message
            }

            if (data.response === "success") {
                dispatch({ type: "showSuccess", payload: true })
                shoConfirm()
            } else {
                throw "Tu registro no se ha podido completar, contacte a soporte"
            }
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            // Loader off mode
            loader(false)
        }
    }

    /**Funcion que valida la ventana actual carga la siguiente ventana */
    const nextPage = () => {
        const { tab } = state

        try {
            switch (tab) {
                // Validamos cuando esta en el primer tab
                case 0: {
                    // Validamos nombre
                    if (state.firstname.trim().length === 0) {
                        throw String("Ingresa un nombre")
                    }

                    // Validamos el apellido
                    if (state.lastname.trim().length === 0) {
                        throw String("Ingresa un apellido")
                    }

                    // Validamos el correo electronico
                    if (!validator.isEmail(state.email)) {
                        throw String("El correo electronico no es valido")
                    }

                    // Validamos el numero telefonico
                    if (state.phoneNumber.length <= 7) {
                        throw String("El numero telefonico no es valido")
                    }

                    break
                }

                // Validamos la segunda tab
                case 1: {
                    const diferenceTime = moment.duration(
                        moment(state.birthday).diff(moment()),
                    )

                    // validamos la edad (debe ser mayor de 12)
                    if (diferenceTime.get("years") >= -12) {
                        throw String("Tu edad no puede ser procesada")
                    }

                    // Validamos el codigo postal
                    if (state.postalCode.length === 0) {
                        throw String("Ingresa tu codigo postal")
                    }

                    // Validamos el nombre de la ciudad
                    if (state.city.trim().length === 0) {
                        throw String("Ingresa tu ciudad")
                    }

                    break
                }

                // Validamos el tercer tab
                case 2: {
                    // Validamos el nombre de usuario
                    if (state.username.length <= 4) {
                        throw String("Ingresa un nombre de usuario valido")
                    }

                    // Validamos la Contraseña
                    if (state.password.length <= 5) {
                        throw String(
                            "Contraseña debe llevar como minimo 6 digitos",
                        )
                    }

                    // validamos que las Contraseñas coincidan

                    if (state.password !== state.passwordConfirm) {
                        throw String(
                            "Tu contraseñas no coinciden, intenta de nuevo",
                        )
                    }

                    if (!state.readTerms) {
                        throw String("Acepta los terminos y condiciones")
                    }

                    // ejecutamos el servicio
                    //onSubmit()

                    return false
                }
            }
        } catch (error) {
            errorMessage(error)

            return false
        }

        dispatch({ type: "tab", payload: tab + 1 })
    }

    /**Funcion que carga la anterior ventana */
    const previousPage = () => {
        const { tab } = state

        dispatch({ type: "tab", payload: tab - 1 })
    }

    /**Muestra/oculta la ventana con todos los paises */
    const toggleModalCountries = (payload = false) => {
        dispatch({ type: "showCountries", payload })
    }

    /**Funcion que ejecuta cuando el: 1u},
     * ario se cambia la fecha de cumple */
    const onChangeBirthday = payload => dispatch({ type: "birthday", payload })

    /** Funcion que modifica el estado que muestra la ventana modal de terminos y condiciones */
    const toggleModalTerms = () =>
        dispatch({ type: "showModalTerms", payload: !state.showModalTerms })

    const shoConfirm = () => {
        setShowModal(true)
    }

    useEffect(() => {
        configurateComponent()

        // Ocultamos el menu cuando el teclado se active
        const eventShowKeyboard = Keyboard.addListener("keyboardDidShow", () =>
            dispatch({ type: "showButtonTerms", payload: false }),
        )

        // Mostramos el menu cuando el teclado se oculte
        const eventHideKeyboard = Keyboard.addListener("keyboardDidHide", () =>
            dispatch({ type: "showButtonTerms", payload: true }),
        )

        return () => {
            // Removemos los eventos cuando el componente se desmonte
            eventShowKeyboard.remove()
            eventHideKeyboard.remove()
        }
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.rootContainer}>
            <Video
                selectedVideoTrack={{ type: "disabled" }}
                repeat={true}
                resizeMode="cover"
                playInBackground={true}
                controls={false}
                muted={true}
                playWhenInactive={true}
                source={videoclip}
                style={styles.videoclip}
            />

            <View style={styles.cap} />

            <ScrollView
                style={{ flex: 1 }}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="interactive">
                <ViewAnimation animation="fadeIn" style={styles.subcontainer}>
                    <Image source={logo} style={styles.logo} />

                    {state.tab === 0 && (
                        <ViewAnimation
                            style={styles.contentTab}
                            animation="fadeIn">
                            <View style={styles.row}>
                                <Text style={styles.legend}>Nombre</Text>

                                <TextInput
                                    style={GlobalStyles.textInput}
                                    value={state.firstname}
                                    autoCorrect={false}
                                    keyboardAppearance="dark"
                                    onChangeText={payload =>
                                        dispatch({ type: "firstname", payload })
                                    }
                                />
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.legend}>Apellido</Text>

                                <TextInput
                                    style={GlobalStyles.textInput}
                                    value={state.lastname}
                                    autoCorrect={false}
                                    keyboardAppearance="dark"
                                    onChangeText={payload =>
                                        dispatch({ type: "lastname", payload })
                                    }
                                />
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.legend}>
                                    Correo Electronico
                                </Text>

                                <TextInput
                                    style={GlobalStyles.textInput}
                                    value={state.email}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    keyboardAppearance="dark"
                                    onChangeText={payload =>
                                        dispatch({ type: "email", payload })
                                    }
                                />
                            </View>

                            {state.countries.length > 0 && (
                                <>
                                    <View style={styles.row}>
                                        <Text style={styles.legend}>
                                            Numero de telefono
                                        </Text>

                                        <View style={styles.rowPhoneNumber}>
                                            <TouchableOpacity
                                                style={[
                                                    GlobalStyles.textInput,
                                                    { marginRight: 10 },
                                                ]}
                                                onPress={_ =>
                                                    toggleModalCountries(true)
                                                }>
                                                <Text
                                                    style={{
                                                        color:
                                                            Colors.colorYellow,
                                                    }}>
                                                    {
                                                        state.countries[
                                                            state.country
                                                        ].phoneCode
                                                    }
                                                </Text>
                                            </TouchableOpacity>

                                            <TextInput
                                                style={[
                                                    GlobalStyles.textInput,
                                                    { flex: 1 },
                                                ]}
                                                value={state.phoneNumber}
                                                autoCorrect={false}
                                                keyboardType="numeric"
                                                keyboardAppearance="dark"
                                                onChangeText={payload =>
                                                    dispatch({
                                                        type: "phoneNumber",
                                                        payload,
                                                    })
                                                }
                                            />
                                        </View>
                                    </View>
                                </>
                            )}

                            <View style={styles.rowButtons}>
                                <TouchableOpacity
                                    onPress={goBack}
                                    style={styles.registerButton}>
                                    <Text style={styles.textRegisterButton}>
                                        Volver
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={nextPage}
                                    style={[
                                        GlobalStyles.buttonPrimaryLine,
                                        { flex: 1 },
                                    ]}>
                                    <Text
                                        style={
                                            GlobalStyles.textButtonPrimaryLine
                                        }>
                                        Siguiente
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ViewAnimation>
                    )}

                    {state.tab === 1 && (
                        <ViewAnimation
                            style={styles.contentTab}
                            animation="fadeIn">
                            <View style={styles.row}>
                                <Text style={styles.legend}>
                                    Fecha de tu cumpleaños
                                </Text>

                                <DatePicker
                                    style={styles.datePicker}
                                    mode="date"
                                    onDateChange={onChangeBirthday}
                                    date={state.birthday}
                                />
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.legend}>Ciudad</Text>

                                <View style={styles.rowPhoneNumber}>
                                    <TextInput
                                        style={[
                                            GlobalStyles.textInput,
                                            { marginRight: 10 },
                                        ]}
                                        placeholderTextColor="#FFF"
                                        placeholder="Codigo postal"
                                        keyboardAppearance="dark"
                                        keyboardType="numeric"
                                        value={state.postalCode}
                                        onChangeText={payload =>
                                            dispatch({
                                                type: "postalCode",
                                                payload,
                                            })
                                        }
                                    />

                                    <TextInput
                                        style={[
                                            GlobalStyles.textInput,
                                            { flex: 1 },
                                        ]}
                                        placeholderTextColor="#FFF"
                                        keyboardAppearance="dark"
                                        placeholder="Cuidad"
                                        value={state.city}
                                        onChangeText={payload =>
                                            dispatch({ type: "city", payload })
                                        }
                                    />
                                </View>
                            </View>

                            <View style={styles.rowButtons}>
                                <TouchableOpacity
                                    onPress={previousPage}
                                    style={styles.registerButton}>
                                    <Text style={styles.textRegisterButton}>
                                        Atras
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={nextPage}
                                    style={[
                                        GlobalStyles.buttonPrimaryLine,
                                        { flex: 1 },
                                    ]}>
                                    <Text
                                        style={
                                            GlobalStyles.textButtonPrimaryLine
                                        }>
                                        Siguiente
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ViewAnimation>
                    )}

                    {state.tab === 2 && (
                        <ViewAnimation
                            style={styles.contentTab}
                            animation="fadeIn">
                            <View style={styles.row}>
                                <Text style={styles.legend}>
                                    Nombre de usuario
                                </Text>

                                <TextInput
                                    style={GlobalStyles.textInput}
                                    value={state.username}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    keyboardAppearance="dark"
                                    onChangeText={payload =>
                                        dispatch({ type: "username", payload })
                                    }
                                />
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.legend}>Contraseña</Text>

                                <View
                                    style={[
                                        styles.textInputWithImage,
                                        GlobalStyles.textInput,
                                    ]}>
                                    <TextInput
                                        style={styles.textInputCol}
                                        value={state.password}
                                        secureTextEntry={!showPassword}
                                        keyboardAppearance="dark"
                                        onChangeText={payload =>
                                            dispatch({
                                                type: "password",
                                                payload,
                                            })
                                        }
                                    />

                                    <TouchableOpacity
                                        onPress={e =>
                                            setShowPassword(!showPassword)
                                        }
                                        style={styles.touchableCol}>
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

                            <View style={styles.row}>
                                <Text style={styles.legend}>
                                    Confirmar contraseña
                                </Text>

                                <View
                                    style={[
                                        styles.textInputWithImage,
                                        GlobalStyles.textInput,
                                    ]}>
                                    <TextInput
                                        style={styles.textInputCol}
                                        value={state.passwordConfirm}
                                        secureTextEntry={!showConfirmPassword}
                                        keyboardAppearance="dark"
                                        onChangeText={payload =>
                                            dispatch({
                                                type: "passwordConfirm",
                                                payload,
                                            })
                                        }
                                    />

                                    <TouchableOpacity
                                        onPress={e =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword,
                                            )
                                        }
                                        style={styles.touchableCol}>
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

                            <View
                                style={styles.containerCheckBoxFooterLastPage}>
                                {state.showButtonTerms && (
                                    <View style={styles.rowTerms}>
                                        <CheckBox
                                            checkBoxColor={Colors.colorYellow}
                                            onClick={_ =>
                                                dispatch({
                                                    type: "readTerms",
                                                    payload: !state.readTerms,
                                                })
                                            }
                                            isChecked={state.readTerms}
                                        />
                                        <TouchableOpacity
                                            style={styles.buttonTerms}
                                            onPress={toggleModalTerms}>
                                            <Text style={styles.textTerms}>
                                                Acepto Terminos
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>

                            <View style={styles.rowButtons}>
                                <TouchableOpacity
                                    onPress={previousPage}
                                    style={styles.registerButton}>
                                    <Text style={styles.textRegisterButton}>
                                        Atras
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={onSubmit}
                                    style={[
                                        GlobalStyles.buttonPrimaryLine,
                                        { flex: 1 },
                                    ]}>
                                    <Text
                                        style={
                                            GlobalStyles.textButtonPrimaryLine
                                        }>
                                        Confirmar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ViewAnimation>
                    )}
                </ViewAnimation>
            </ScrollView>

            <Modal
                onBackButtonPress={toggleModalTerms}
                onBackdropPress={toggleModalTerms}
                backdropOpacity={0.95}
                isVisible={state.showModalTerms}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                    }}>
                    <Text style={styles.textPartTerms}>
                        1. AlyPay es el sistema de pagos con criptomonedas de la
                        compañía AlySystem donde los usuarios podrán enviar,
                        recibir, transferir y realizar pagos a comercios
                        afiliados a la App.
                    </Text>

                    <Text style={styles.textPartTerms}>
                        2. Toda transacción realizada a través de la App paga un
                        0.2% debitado en la criptomoneda utilizada. Si posee
                        AlyCoin en AlyPay esta comisión se reducirá al 0.075%
                        debitado de su saldo de AlyCoin y no en la criptomoneda
                        que paga. Si no posee AlyCoin o el saldo no es
                        suficiente para cubrir el 0.075% se le debitará el 0.2%
                        en la criptomoneda utilizada.
                    </Text>

                    <Text style={styles.textPartTerms}>
                        3. No se cobra comisión por subir fondos a AlyPay en
                        ninguna criptomoneda.
                    </Text>

                    <Text style={styles.textPartTerms}>
                        4. Los fondos transferidos en criptomonedas mantendrán
                        el precio del coinmarketcap en tiempo real. Puedes
                        visitar el sitio web www.coinmarketcap.com
                    </Text>

                    <Text style={styles.textPartTerms}>
                        5. Los fondos transferidos en dólar americano a través
                        de Airtm u otras plataformas se cambiarán a la
                        criptomoneda Tether (USDT) en la App de AlyPay.
                    </Text>

                    <Text style={styles.textPartTerms}>
                        6. Si el usuario utiliza AlyExchange y/o Money Changer
                        en la App de AlyPay y posee AlyCoin se le cobrará una
                        comisión por el Exchange del 2.5% debitado en AlyCoin,
                        si no posee AlyCoin se cobrará la comisión establecida
                        en AlyExchange y Money Changer.
                    </Text>

                    <Text style={styles.textPartTerms}>
                        7. Los usuarios podrán adquirir desde AlyPay un plan de
                        inversión o realizar su upgrade en Speed Tradings Bank,
                        con Bitcoin o Ethereum según sea su plan.
                    </Text>

                    <Text style={styles.textPartTerms}>
                        8. Se cobrará una comisión de retiro del 2.5% en la
                        criptomoneda transferida más el fee de minero. Si el
                        usuario posee AlyCoin la comisión de retiro será del
                        1.5% en AlyCoin mas el fee de minero en la criptomoneda
                        retirada.
                    </Text>

                    <Text style={styles.textPartTerms}>
                        9. Todos los usuarios de AlyPay deberán verificar su
                        cuenta, enviando la documentación solicitada, para poder
                        solicitar sus retiros.
                    </Text>

                    <Text style={styles.textPartTerms}>
                        10. Los usuarios menores de 18 años deberán enviar su
                        carnet o cedula de menor y la autorización de uno de sus
                        padres o tutor.
                    </Text>

                    <Text style={styles.textPartTerms}>
                        11. Los usuarios que retiren sus dólares transferidos a
                        través de Airtm y soliciten su retiro se les enviará en
                        la criptomoneda Tether (USDT).
                    </Text>

                    <Text style={styles.textPartTerms}>
                        12. AlyPay no se hace responsable del mal uso de la App
                        y de sus fondos, en caso de extravíos o robo de su
                        dispositivo móvil, o envíos a wallet incorrectas por
                        error del usuario, o mal uso de sus contraseñas y claves
                        de la App.
                    </Text>

                    <Text style={styles.textPartTerms}>
                        13. En caso de un extravío o robo de su dispositivo
                        móvil puede escribir a soporte
                        support.alypay@alysystem.com solicitando el bloqueo de
                        tu cuenta. Puede visitar nuestra página www.alypay.com
                    </Text>

                    <Text style={styles.textPartTerms}>
                        14. Estos términos y condiciones podrán ser modificados
                        cuando se requiera, notificando a los usuarios por el
                        email registrado en la App.
                    </Text>

                    <TouchableOpacity
                        onPress={toggleModalTerms}
                        style={styles.buttonCloseModal}>
                        <Text style={{ color: "#FFF" }}>Cerrar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>

            <Modal
                animationIn="fadeIn"
                backdropOpacity={0.9}
                animationOut="fadeOut"
                onBackdropPress={_ =>
                    dispatch({ type: "showCountries", payload: false })
                }
                onBackButtonPress={_ =>
                    dispatch({ type: "showCountries", payload: false })
                }
                isVisible={state.showCountries}>
                <View style={styles.containerModal}>
                    <TextInput
                        style={GlobalStyles.textInput}
                        placeholder="Buscar"
                        placeholderTextColor="#FFF"
                        value={state.filter}
                        onChangeText={payload =>
                            dispatch({ type: "filter", payload })
                        }
                    />

                    <View style={{ height: 10 }} />

                    <FlatList
                        keyboardShouldPersistTaps="always"
                        data={state.countries}
                        renderItem={ItemCountry}
                        keyExtractor={(_, i) => i.toString()}
                    />
                </View>
            </Modal>

            <Modal
                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropOpacity={0.95}
                isVisible={state.showSuccess}>
                <View style={styles.containerModalSuccess}>
                    <Lottie
                        style={styles.animationSend}
                        source={sendAnimation}
                        loop
                        autoPlay
                    />

                    <Text style={styles.textTitleSuccess}>
                        Tu cuenta esta casi lista
                    </Text>
                    <Text style={styles.textSecondarySuccess}>
                        Hemos enviado un correo de activacion para verificar que
                        eres tu.
                    </Text>

                    <TouchableOpacity
                        style={styles.buttonSuccess}
                        onPress={_ => navigation.pop()}>
                        <Text style={GlobalStyles.textButton}>Listo</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                isVisible={showModal}
                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropOpacity={0.95}
                onBackButtonPress={_ => setShowModal(false)}>
                <View style={styles.containerModalSuccess1}>
                    <Image style={styles.logoSuccess} source={logo} />

                    <View style={[styles.rowImage, { alignItems: "center" }]}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.textTitleSuccess}>
                                Su cuenta ya esta casi lista
                            </Text>

                            <Text style={styles.subTitle}>
                                Enviaremos un correo de activacion para
                                verificar que eres tu
                            </Text>
                        </View>

                        <View style={{ paddingTop: 15 }}>
                            <Image
                                style={styles.logoSuccess}
                                source={LogoFunko}
                            />
                        </View>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <View style={styles.row}>
                            <Text style={styles.textTitleSuccess}>
                                ¡Gracias por registrarse con nosotros!
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonSuccess}
                        onPress={()=>{setShowModal(false)}}>
                        <Text style={GlobalStyles.textButton}>Listo</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },

    cap: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 0,
    },

    videoclip: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height,
        zIndex: 0,
    },

    logo: {
        marginTop: 25,
        alignSelf: "center",
        resizeMode: "contain",
        height: RFValue(128),
        width: RFValue(256),
    },

    subcontainer: {
        alignItems: "center",
        flex: 1,
        height: Dimensions.get("window").height,
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 20,
    },

    row: {
        marginVertical: RFValue(10),
        paddingHorizontal: RFValue(25),
        width: "100%",
    },

    textAccepTerms: {
        color: Colors.colorYellow,
        textTransform: "uppercase",
        fontSize: RFValue(12),
        marginRight: 10,
    },

    rowTerms: {
        alignItems: "center",
        flexDirection: "row",
    },

    rowButtons: {
        alignItems: "center",
        marginVertical: RFValue(10),
        paddingHorizontal: RFValue(25),
        width: "100%",
        flexDirection: "row",
    },

    rowPhoneNumber: {
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
    },

    legend: {
        color: Colors.colorYellow,
        fontSize: RFValue(12),
        marginBottom: RFValue(2.5),
    },

    containerModal: {
        alignSelf: "center",
        backgroundColor: Colors.colorMain,
        borderRadius: 10,
        padding: 10,
        height: "80%",
        width: "80%",
    },

    selectCodeCountry: {
        borderRadius: 5,
        backgroundColor: Colors.colorBlack,
        padding: 10,
    },

    itemCountry: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },

    registerButton: {
        marginRight: RFValue(50),
    },

    textRegisterButton: {
        fontSize: RFValue(14),
        color: Colors.colorYellow,
    },

    contentTab: {
        flex: 1,
        width: "100%",
    },

    datePicker: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        overflow: "hidden",
        width: Platform.OS === "ios" ? width * 0.85 : width * 0.87,
    },

    containerModalSuccess: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },

    containerModalSuccess1: {
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: Colors.colorBlack,
        borderRadius: 10,
        padding: 10,
        height: "80%",
        width: "90%",
    },

    animationSend: {
        height: RFValue(128),
        width: RFValue(128),
    },

    textTitleSuccess: {
        color: Colors.colorYellow,
        fontSize: RFValue(18),
        marginVertical: RFValue(10),
    },

    textSecondarySuccess: {
        color: "#FFF",
        fontSize: RFValue(12),
        textAlign: "center",
        width: "80%",
    },

    buttonSuccess: {
        ...GlobalStyles.buttonPrimary,
        marginTop: RFValue(25),
        width: "80%",
    },

    buttonTerms: {
        alignSelf: "center",
        marginLeft: 5,
        // padding: RFValue(10),
        // marginBottom: 25,
    },

    textTerms: {
        textTransform: "uppercase",
        color: Colors.colorYellow,
        textDecorationColor: Colors.colorYellow,
        textDecorationLine: "underline",
        fontSize: RFValue(12),
    },

    textPartTerms: {
        fontSize: RFValue(8),
        marginVertical: RFValue(5),
        color: "#FFF",
    },

    buttonCloseModal: {
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },

    containerCheckBoxFooterLastPage: {
        alignSelf: "center",
        marginVertical: RFValue(15),
        flexDirection: "row",
        width: "90%",
    },
    textInputCol: {
        flex: 0.9,
        paddingLeft: 5,
        padding: 0,
        color: "white",
    },
    textInputWithImage: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    touchableCol: {
        flex: 0.1,
        alignItems: "flex-end",
    },
    logoSuccess: {
        resizeMode: "contain",
        height: RFValue(128),
        width: RFValue(256),
    },
    rowImage: {
        flexDirection: "column",
        alignItems: "center",
    },
    subTitle: {
        color: "#FFF",
        fontSize: RFValue(14),
        textAlign: "center",
        //marginVertical: RFValue(10),
    },
})

export default Register
