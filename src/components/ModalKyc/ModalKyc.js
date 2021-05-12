import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"

// Import Components
import Modal from "react-native-modal"
import { GlobalStyles } from "../../utils/constants"
import { useNavigation } from "@react-navigation/native"

// Import Hooks
import useStyles from "../../hooks/useStyles.hook"

// Import Styles
import { ModalKycStyles } from "../../Styles/Components/index"

// Import Assets
import Logo from "../../static/alypay.png"
import LogoFunko from "../../static/AlyFunko.png"

const ModalKyc = ({ navigation }) => {
    const classes = useStyles(ModalKycStyles)

    const { navigate } = useNavigation()

    const [showModal, setShowModal] = useState(true)

    const onKyc = () => {
        navigate("Kyc")
        setShowModal(false)
    }

    const goBack = () => {}

    return (
        <Modal isVisible={showModal}>
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
                    <TouchableOpacity style={classes.registerButton}>
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
