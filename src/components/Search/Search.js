import React, { useState } from 'react'
import { TextInput, TouchableOpacity, Text, View, StyleSheet, ScrollView } from "react-native"

// import all components
import { useNavigation } from '@react-navigation/native'
import Icon from "react-native-vector-icons/MaterialIcons"

// import constants and functions
import { GlobalStyles, http, loader, errorMessage, CopyClipboard, RFValue, Colors} from '../../utils/constants'
import moment from "moment"



const stylesDescription = StyleSheet.create({
    //Secciones de los detalles
    facePost: {
        backgroundColor: Colors.colorBlack,
        margin: 10,
        borderRadius: 5,
    },
    hashsec: {
        backgroundColor: Colors.colorBlack,
        margin: 10,
        borderRadius: 5,
    },
    scroll: {
        paddingHorizontal: RFValue(5),
    },
    text: {
        padding: 5,

    },
    title: {
        color: "#ffcb08",
        fontSize: RFValue(14)
    },
    // Contenedor de los titulos principales estaticos
    containertitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: RFValue(5),
    },
    //contenedor de los subtitulos 
    containerPrinc: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 20,
        borderBottomColor: "#ffcb08",
        borderBottomWidth: 2,
        borderRadius: 3
    },
    //subtitulos de los textos
    subtitle: {
        color: "#6D6D6D",
        fontSize: RFValue(16)
    },
    textInfoEmpty: {
        alignSelf: "center",
        color: Colors.colorMain,
        flex: 1,
        fontSize: RFValue(18),
        textAlign: "center",
        marginVertical: RFValue(10),
    }
})

const Description = ({ item }) => {
    return (
        <ScrollView style={stylesDescription.scroll}>
            <TouchableOpacity onPress={_ => CopyClipboard(item.hash)} >
                <View style={[stylesDescription.hashsec, stylesDescription.text]}>
                    <View style={stylesDescription.containertitle}>
                        <Text style={stylesDescription.title}>HASH</Text>
                        <Icon name="ios-copy" size={15} color="#877E7C" />
                    </View>
                    <View style={stylesDescription.containertitle}>
                        <Text style={stylesDescription.subtitle}>{(item.hash ? item.hash : "")}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={[stylesDescription.facePost, stylesDescription.text]}>
                <View style={stylesDescription.containerPrinc}>

                    <View style={stylesDescription.containertitle}>
                        <Text style={stylesDescription.title}>Monto de Transacción</Text>
                        <Text style={stylesDescription.title}>Monto (USD)</Text>
                    </View>

                    <View style={stylesDescription.containertitle}>
                        <Text style={stylesDescription.subtitle}>{(item.amount ? item.amount : "")}</Text>
                        <Text style={stylesDescription.subtitle}>{(item.amount_usd ? item.amount_usd : "")}</Text>
                    </View>
                </View>
                <View style={stylesDescription.containerPrinc}>

                    <View style={stylesDescription.containertitle}>
                        <Text style={stylesDescription.title}>Moneda</Text>
                        <Text style={stylesDescription.title}>Descripcion</Text>
                    </View>

                    <View style={stylesDescription.containertitle}>
                        <Text style={stylesDescription.subtitle}>{(item.name_coin_transaction ? item.name_coin_transaction : "")}</Text>
                        <Text style={stylesDescription.subtitle}>{(item.transaction_tail ? item.transaction_tail : "None")}</Text>
                    </View>

                </View>

                <View style={stylesDescription.containerPrinc}>
                    <View style={stylesDescription.containertitle}>
                        <Text style={stylesDescription.title}>Fee</Text>
                        <Text style={stylesDescription.title}>Fecha</Text>
                    </View>

                    <View style={stylesDescription.containertitle}>
                        <Text style={stylesDescription.subtitle}>{(item.amount_fee && item.coin_fee ? item.amount_fee && item.coin_fee : "")}</Text>
                        <Text style={stylesDescription.subtitle}>{(item.date_create ? moment(item.date_create).format("DD/MM/YY - HH:mm") : "")}</Text>
                    </View>

                </View>
            </View>

            <TouchableOpacity onPress={_ => CopyClipboard(item.wallet_to)}>
                <View style={[stylesDescription.hashsec, stylesDescription.text]}>
                    <View style={stylesDescription.containertitle}>
                        <Text style={stylesDescription.title}>Billetera Remitente</Text>
                        <Icon name="ios-copy" size={15} color="#877E7C" />
                    </View>

                    <View style={stylesDescription.containertitle}>
                        {
                            item.wallet_to
                                ? <Text style={stylesDescription.subtitle}>{item.wallet_to}</Text>
                                : <Text style={stylesDescription.textInfoEmpty}>SIN DATOS</Text>
                        }

                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={_ => CopyClipboard(item.wallet_from)}>
                <View style={[stylesDescription.hashsec, stylesDescription.text]}>

                    <View style={stylesDescription.containertitle} >
                        <Text style={stylesDescription.title}>Billetera Receptora</Text>
                        <Icon name="ios-copy" size={15} color="#877E7C" />
                    </View>

                    <View style={stylesDescription.containertitle}>
                        <Text style={stylesDescription.subtitle}>{(item.wallet_from ? item.wallet_from : "")}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        </ScrollView>
    )

}


const Search = () => {
    const [searchText, setSearchText] = useState("")
    const { navigate } = useNavigation()

    const goToSearch = () => {
        try {
            if (searchText.length < 50) {
                throw String('Ingrese un hash de formato correcto')
            }

            navigate("Description", { hash: searchText })

        } catch (error) {
            errorMessage(error.toString())
        }
    }

    const getAllData = async () => {
        try {

            // verificamos si el hash es de un formato correcto
            if (searchText.length < 50) {
                throw String("Ingrese un hash de formato correcto")
            }

            loader(true)
            // get all data
            const { data } = await http.get(`/blockchain/transaction/${searchText}`)

            // verificamos si hash la llamada api retorna una repuesta
            if (!data.hash) {
                throw String("Su HASH no se ha encontrado")
            }

            // set data response
            setDescripResult(data)

        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.col}>

                    <View style={styles.rowInput}>
                        <TextInput
                            style={[GlobalStyles.textInput, { flex: 1 }]}
                            value={searchText}
                            onChangeText={setSearchText}
                            placeholder="Buscar detalle de transaccion"
                            placeholderTextColor='#CCC'
                        />

                        <TouchableOpacity onPress={goToSearch} style={styles.buttonSearch}>
                            <Icon name='search' size={RFValue(40)} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: RFValue(10)
    },

    textInput: {
        backgroundColor: Colors.$colorBlack,
        borderColor: Colors.$colorYellow,
        borderRadius: 5,
        borderWidth: 1.5,
        color: '#FFF',
        padding: RFValue(5),
    },
    col: {
        flex: 1,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        // marginVertical: RFValue(10)
    },
    rowInput: {
        alignItems: "center",
        flexDirection: "row"
    },
    buttonSearch: {
        backgroundColor: Colors.colorYellow,
        borderRadius: RFValue(5),
        padding: RFValue(5),
        marginLeft: RFValue(10),
        height: RFValue(50),
        width: RFValue(50),
    }
})

export default Search 