import React, { useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, BackHandler } from 'react-native'
import { Colors } from '../../utils/constants'

const ModalPin = ({ setShowModal }) => {

    const closeModal = () => {
        setShowModal(false)
        console.log('entra')
    }

    useEffect(() => {
        // Metodo que esta a la escucha cuando le dan atras
        const handledBack = BackHandler.addEventListener(
            "hardwareBackPress",
            () => { false },
        )
        return () => handledBack.remove()
    }, [])

    return (
        <TouchableOpacity style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}
            activeOpacity={false}
            onPress={closeModal}
            onLongPress={closeModal}
        >

            <View style={{
                width: '80%',
                backgroundColor: 'black',
                borderColor: Colors.colorYellow,
                borderWidth: 1,
                padding: 25
            }}>

                <Text style={{
                    alignSelf: 'center',
                    color: Colors.colorYellow,
                    fontSize: 22,
                    marginBottom: 15
                }}>Ingrese PIN</Text>

                <Text style={{
                    color: 'gray',
                    fontSize: 16,
                    marginBottom: 15
                }}>Ingrese un PIN válido de 6 dígitos y
                    recuerdelo, no comparta su PIN con nadie.
                    Es la manera más segura de verificar su
                identidad cuando efectúe usa transacción.</Text>

                <Text style={{
                    color: Colors.colorYellow,
                    fontSize: 22,
                }}>PIN</Text>

                <TextInput style={{
                    backgroundColor: Colors.colorBlack,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginBottom: 15
                }}
                    placeholder="000000"
                    placeholderTextColor='gray'
                />

                <Text style={{
                    color: Colors.colorYellow,
                    fontSize: 22,
                }}>Confirmar PIN</Text>

                <TextInput style={{
                    backgroundColor: Colors.colorBlack,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginBottom: 15
                }}
                    placeholder="000000"
                    placeholderTextColor='gray'
                />

                <Text style={{
                    color: 'gray',
                    fontSize: 16,
                }}>Ingrese su contraseña para verificar
                el cambio de PIN</Text>

                <Text style={{
                    color: Colors.colorYellow,
                    fontSize: 22,
                }}>Contraseña</Text>

                <TextInput style={{
                    backgroundColor: Colors.colorBlack,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginBottom: 15
                }}
                    placeholder="Ingrese su contraseña"
                    placeholderTextColor='gray'
                />

                <TouchableOpacity style={{backgroundColor: Colors.colorYellow}}>
                    <Text>Confirmar</Text>
                </TouchableOpacity>

            </View>

        </TouchableOpacity>
    )
}

export default ModalPin