import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native'

import Modal from "react-native-modal"

const ModalPassword = ({ password, setPassword, showModal, setShowModal, fn }) => {

    return (
        <Modal isVisible={showModal}>
            <View style={{
                alignSelf: "center",
                alignItems: "center",
                justifyContent: 'space-between',
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'yellow',
                borderRadius: 10,
                padding: 10,
                width: "70%",
                height: '50%'
            }}>

                <Text style={{
                    color: 'yellow',
                    fontSize: 18
                }}>¡Atención!</Text>

                <Text style={{
                    color: 'gray',
                    fontSize: 16
                }}>
                Usted esta apunto de desablitar una billetera.
                Al hacerlo, no podra usar sus fondos en dicha 
                billetera para realizar transacciones. Si esta
                deacuerdo, presione el boton "Continuar"
                </Text>

                <TextInput 
                    style={{
                        height: 45,
                        width: '100%',
                        borderColor: 'yellow',
                        borderWidth: 2,
                        borderRadius: 10,
                        color: 'white'
                    }}
                    value={password}
                    onChangeText={setPassword}
                    placeholder='Constraseña'
                    placeholderTextColor='gray'
                />

                <TouchableOpacity style={{
                    backgroundColor: 'red',
                    height: '10%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                    onPress={_ => {
                        setShowModal(false)
                        fn()
                    }}
                >
                    <Text>Continuar</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    )
}

export default ModalPassword