import React, { useState, useEffect, useMemo } from "react"
import { View, Text, Image, TouchableOpacity, Alert } from "react-native"

// Import Components
import Modal from "react-native-modal"
import { GlobalStyles, logOutApp } from "../../utils/constants"
import { useNavigation } from "@react-navigation/native"

// Import Hooks
import useStyles from "../../hooks/useStyles.hook"

// Import Styles
import { ModalKycStyles } from "../../Styles/Components/index"

// Import Assets
import Logo from "../../static/alypay.png"
import LogoFunko from "../../static/AlyFunko.png"

// Import Stoore
import store from "../../store/index"

<<<<<<< HEAD
const ModalKyc = () => {
    const classes = useStyles(ModalKycStyles)

    const { global, navigation } = store.getState()

    //const { navigate } = useNavigation()
=======
const ModalKyc = _ => {
    const classes = useStyles(ModalKycStyles)

    const { navigation } = store.getState()
>>>>>>> 10fccf273cef9061a6c85dce5e43db8bdc61016f

    const [showModal, setShowModal] = useState(true)

    const onKyc = () => {
<<<<<<< HEAD
        navigation.push("Kyc")
=======
>>>>>>> 10fccf273cef9061a6c85dce5e43db8bdc61016f
        setShowModal(false)
        navigation.push("Kyc")
    }

    // ??????
    const toggleMenu = () => {
        Alert.alert(
            "Cerrar sesion",
            "Estas apunto de cerrar sesion en AlyPay",
            [
                {
                    text: "Cancelar",
                    onPress: () => {},
                },
                {
                    text: "Cerrar Sesion",
                    onPress: logOut,
                },
            ],
        )
    }

    const logOut = async () => {
        try {
            await logOutApp()
        } catch (error) {
            console.log(error)
        }
    }

<<<<<<< HEAD
    // useEffect(() => {
    //     store.subscribe(() => {
    //         const newStore = store.getState()
=======
    useEffect(() => {
        store.subscribe(() => {
            const newStore = store.getState().global
>>>>>>> 10fccf273cef9061a6c85dce5e43db8bdc61016f

    //         const conditional =
    //             "kyc_type" in newStore && newStore?.kyc_type === 0

<<<<<<< HEAD
    //         setShowModal(conditional)
    //     })
    // }, [])
=======
            console.log(conditional)

            setShowModal(conditional)
        })
    }, [])
>>>>>>> 10fccf273cef9061a6c85dce5e43db8bdc61016f

    return (
        <Modal
            isVisible={showModal}
            onBackdropPress={_ => setShowModal(false)}
            animationIn="fadeIn"
            animationOut="fadeOut">
            <View style={classes.container}>
                <Image style={classes.logoSuccess} source={Logo} />

                <View style={[classes.rowImage, { alignItems: "center" }]}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={classes.textTitle}>
                            Su cuenta ya esta casi lista
                        </Text>

                        <Text style={classes.subTitle}>
                            Ahora solo debe terminar el proceso de registro con
                            la informacion solicitada
                        </Text>
                    </View>

                    <View style={{ paddingTop: 15 }}>
                        <Image style={classes.logoSuccess} source={LogoFunko} />
                    </View>
                </View>

                <View style={{ alignItems: "center" }}>
                    <View style={classes.row}>
                        <Text style={classes.textTitleSub}>
                            Pulsa el bóton 'Continuar' para terminar su registro
                        </Text>
                    </View>
                </View>

                <View style={classes.rowButtons}>
                    <TouchableOpacity
                        style={classes.registerButton}
                        onPress={toggleMenu}>
                        <Text style={classes.textRegisterButton}>
                            cerrar session
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onKyc}
                        style={[GlobalStyles.buttonPrimaryLine]}>
                        <Text style={GlobalStyles.textButtonPrimaryLine}>
                            continuar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalKyc
