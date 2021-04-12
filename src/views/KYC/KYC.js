import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import useStyles from "../../hooks/useStyles.hook"
import { ECommerRegisterS } from "../../Styles/Views/index"

import { GlobalStyles } from "../../utils/constants"

import { View as ViewAnimation } from "react-native-animatable"
import { Picker } from "@react-native-picker/picker"

import Container from "../../components/Container/Container"


const ECommerRegister = () => {
    const classes = useStyles(ECommerRegisterS)
    return (
        // <Container showLogo>

        //     <Text style={classes.textTitleContent}>{'1. Información personal'}</Text>

        //     <Text style={classes.textTitle}>{'Nombre(s)'}</Text>
        //     <TextInput style={classes.textInput}
        //         placeholderTextColor={'gray'}
        //         placeholder={'Ingrese nombre'} />

        //     <Text style={classes.textTitle}>{'Apellido(s)'}</Text>
        //     <TextInput style={classes.textInput}
        //         placeholderTextColor={'gray'}
        //         placeholder={'Ingrese apellido'} />

        //     <Text style={classes.textTitle}>{'Fecha de nacimiento'}</Text>
        //     <TextInput style={classes.textInput}
        //         placeholderTextColor={'gray'}
        //         placeholder={'hola'} />

        //     <Text style={classes.textTitle}>{'Tipo de identificación'}</Text>
        //     <TextInput style={classes.textInput}
        //         placeholderTextColor={'gray'}
        //         placeholder={'hola'} />

        //     <Text style={classes.textTitle}>{'Número de identificación'}</Text>
        //     <TextInput style={classes.textInput}
        //         placeholderTextColor={'gray'}
        //         placeholder={'Ingrese ID'} />

        //     <Text style={classes.textTitleContent}>{'2. Información de contacto'}</Text>

        //     <View style={classes.container2Items}>

        //         <View>
        //             <Text style={classes.textTitle}>{'Código del país'}</Text>
        //             <TextInput style={classes.textInput}
        //                 placeholderTextColor={'gray'}
        //                 placeholder={'Ingrese ID'} />
        //         </View>

        //         <View>
        //             <Text style={classes.textTitle}>{'Número de teléfono principal'}</Text>
        //             <TextInput style={classes.textInput}
        //                 placeholderTextColor={'gray'}
        //                 placeholder={'Ingrese teléfono principal'} />
        //         </View>

        //     </View>

        //     <View style={classes.container2Items}>

        //         <View>
        //             <Text style={classes.textTitle}>{'Código del país'}</Text>
        //             <TextInput style={classes.textInput}
        //                 placeholderTextColor={'gray'}
        //                 placeholder={'Ingrese ID'} />
        //         </View>

        //         <View>
        //             <Text style={classes.textTitle}>{'Número de teléfono alternativo'}</Text>
        //             <TextInput style={classes.textInput}
        //                 placeholderTextColor={'gray'}
        //                 placeholder={'Ingrese teléfono alternativo'} />
        //         </View>

        //     </View>

        // </Container>

        <Container showLogo>
            <View style={classes.container}>
                <ViewAnimation style={classes.tab} animation='fadeIn'>
                    <View style={classes.containerTitle}>
                        <Text style={classes.containerTitleText}>Información del titular de la cuenta</Text>
                    </View>

                    <View style={classes.containerTitle}>
                        <Text style={classes.textTitle}>1. Información personal</Text>
                    </View>

                    <View style={classes.row}>
                        <View style={classes.labelsRow}>
                            <Text style={classes.legendRow}>Nombre completo</Text>
                            <Text style={classes.required}>Requerido</Text>
                        </View>
                        <TextInput style={GlobalStyles.textInput} />
                    </View>

                    <View style={classes.row}>
                        <View style={classes.labelsRow}>
                            <Text style={classes.legendRow}>Tipo de identificación</Text>
                            <Text style={classes.required}>Requerido</Text>
                        </View>
                        <View style={GlobalStyles.containerPicker}>
                            <Picker style={GlobalStyles.picker}>
                                <Picker.Item label='Identificación' value={1} />
                                <Picker.Item label='Cedula' value={2} />
                            </Picker>
                        </View>
                    </View>

                    <View style={classes.row}>
                        <View style={classes.labelsRow}>
                            <Text style={classes.legendRow}>Número de identificación</Text>
                            <Text style={classes.required}>Requerido</Text>
                        </View>
                        <TextInput style={GlobalStyles.textInput} />
                    </View>

                    <View style={classes.containerTitle}>
                        <Text style={classes.textTitle}>2. Información de contacto</Text>
                    </View>

                    <View style={classes.row}>
                        <View style={classes.labelsColumn}>
                            <Text style={classes.legendColumn}>Código de país</Text>
                            <Text style={classes.required}>Requerido</Text>
                        </View>
                        <View style={GlobalStyles.containerPicker}>
                            <Picker style={GlobalStyles.picker}>
                                <Picker.Item label='Ni +(505)' value={1} />
                                <Picker.Item label='No :v' value={2} />
                            </Picker>
                        </View>
                    </View>

                    <View style={classes.row}>
                        <View style={classes.labelsColumn}>
                            <Text style={classes.legendColumn}>Número de teléfono principal</Text>
                            <Text style={classes.required}>Requerido</Text>
                        </View>
                        <TextInput style={GlobalStyles.textInput} />
                    </View>

                    <View style={classes.row}>
                        <View style={classes.labelsColumn}>
                            <Text style={classes.legendColumn}>Código de país</Text>
                            <Text style={classes.required}>Requerido</Text>
                        </View>
                        <View style={GlobalStyles.containerPicker}>
                            <Picker style={GlobalStyles.picker}>
                                <Picker.Item label='Ni +(505)' value={1} />
                                <Picker.Item label='No :v' value={2} />
                            </Picker>
                        </View>
                    </View>

                    <View style={classes.row}>
                        <View style={classes.labelsColumn}>
                            <Text style={classes.legendColumn}>Número de teléfono alternativo</Text>
                            <Text style={classes.required}>Requerido</Text>
                        </View>
                        <TextInput style={GlobalStyles.textInput} />
                    </View>

                    <View style={classes.rowButtons}>
                        <TouchableOpacity>
                            <Text style={classes.textBack}>Atras</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={GlobalStyles.buttonPrimary}>
                            <Text style={GlobalStyles.textButton}>Siguiente</Text>
                        </TouchableOpacity>
                    </View>

                </ViewAnimation>
            </View>
        </Container>

    )
}

export default ECommerRegister