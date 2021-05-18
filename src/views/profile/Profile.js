import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'

import Container from "../../components/Container/Container"

const Profile = () => {

    return (
        <Container>
            <View style={{
                margin: 10,
                backgroundColor: 'red',
                borderRadius: 15,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <View style={{
                    backgroundColor: 'green',
                    width: 200,
                    alignItems: 'center',
                    margin: 10,
                }}>
                    <View style={{ backgroundColor: 'gray', width: 150, height: 150, margin: 10, borderRadius: 75 }} />

                    <View style={{ backgroundColor: 'blue', margin: 10 }}>
                        <Text style={{ color: 'yellow', fontSize: 16 }}>Nombre del usuario</Text>
                        <Text style={{ color: 'yellow', fontSize: 14, alignSelf: 'flex-end' }}>@username</Text>
                    </View>

                </View>

                <View style={{
                    margin: 10,
                    marginBottom: 10,
                    width: '95%',
                    backgroundColor: 'gray',
                    padding: 5,
                }}>

                    <Text style={{ color: 'yellow', fontSize: 18 }}>Correo:</Text>

                    <Text style={{ color: 'yellow', fontSize: 16, alignSelf: 'center' }}>Correo@correo.com</Text>

                </View>

            </View>

            <View style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginBottom: 10,
                height: 75,
                backgroundColor: 'gray',
                borderRadius: 15,
                justifyContent: 'space-between',
            }}>

                <View style={{
                    backgroundColor: 'blue',
                    borderRadius: 15,
                    padding: 5,
                    width: '80%'
                }}>
                    <Text style={{ color: 'yellow', fontSize: 18 }}>Fecha de nacimiento:</Text>

                    <Text style={{ color: 'yellow', fontSize: 18 }}>10/08/00</Text>
                </View>

                <TouchableOpacity style={{justifyContent: 'center'}}>
                    <Icon style={{alignSelf: 'center'}} name='camera' size={40}/>
                </TouchableOpacity>

            </View>

            <View style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginBottom: 10,
                height: 75,
                backgroundColor: 'gray',
                borderRadius: 15,
                justifyContent: 'space-between'
            }}>

                <View style={{
                    backgroundColor: 'blue',
                    borderRadius: 15,
                    padding: 5,
                    width: '47.5%'
                }}>
                    <Text style={{ color: 'yellow', fontSize: 18 }}>PIN:</Text>

                    <TextInput style={{
                        color: 'yellow',
                        fontSize: 18,
                        backgroundColor: 'chocolate',
                        padding: 0,
                    }}
                        placeholder='00000000'
                        placeholderTextColor='yellow'
                        keyboardType='number-pad'
                    />
                </View>

                <View style={{
                    backgroundColor: 'blue',
                    borderRadius: 15,
                    padding: 5,
                    width: '47.5%'
                }}>
                    <Text style={{ color: 'yellow', fontSize: 18 }}>Confirmar PIN:</Text>

                    <TextInput style={{
                        color: 'yellow',
                        fontSize: 18,
                        backgroundColor: 'chocolate',
                        padding: 0,
                    }}
                        placeholder='00000000'
                        placeholderTextColor='yellow'
                        keyboardType='number-pad'
                    />
                </View>

            </View>

        </Container>
    )
}

export default Profile