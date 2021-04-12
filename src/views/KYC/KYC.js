import React from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

// Import Hook
import useStyles from "../../hooks/useStyles.hook"

// Import Styles
import { ECommerRegisterS } from "../../Styles/Views/index"

// Import Constans
import { GlobalStyles, errorMessage } from "../../utils/constants"
import countries from "../../utils/countries.json"

// Import Components
import Container from "../../components/Container/Container"
import { View as ViewAnimation } from "react-native-animatable"
import { Picker } from "@react-native-picker/picker"

const initialState = {
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

    // Estado que indica si muestra la modal de paises
    const [modalCoutry, setModalCountry] = useState(false)

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
                    style={styles.itemCountry}
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
            dispatch({ type: "tab", payload: tab + 1 })
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    /**Funcion que carga la anterior ventana */
    const previousPage = () => {
        const { tab } = state

        dispatch({ type: "tab", payload: tab - 1 })
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
                                    Nombre completo
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput style={GlobalStyles.textInput} />
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
                            <TextInput style={GlobalStyles.textInput} />
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
                                            color: Colors.colorSecondary,
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

                        <View style={classes.row}>
                            <View style={classes.labelsColumn}>
                                <Text style={classes.legendColumn}>
                                    Código de país
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <View style={GlobalStyles.containerPicker}>
                                <Picker style={GlobalStyles.picker}>
                                    <Picker.Item label="Ni +(505)" value={1} />
                                    <Picker.Item label="No :v" value={2} />
                                </Picker>
                            </View>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.labelsColumn}>
                                <Text style={classes.legendColumn}>
                                    Número de teléfono alternativo
                                </Text>
                                <Text style={classes.required}>Requerido</Text>
                            </View>
                            <TextInput style={GlobalStyles.textInput} />
                        </View>

                        <View style={classes.rowButtons}>
                            <TouchableOpacity>
                                <Text style={classes.textBack}>Atras</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={GlobalStyles.buttonPrimary}>
                                <Text style={GlobalStyles.textButton}>
                                    Siguiente
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
                <View style={styles.containerModal}>
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
