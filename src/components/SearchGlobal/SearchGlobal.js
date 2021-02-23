import React, { useState } from 'react'
import { TextInput, TouchableOpacity, Text, View, StyleSheet, ScrollView } from "react-native"

// import all components
import Container from '../../components/Container/Container'
import Icon from "react-native-vector-icons/Ionicons"
import Lottie from 'lottie-react-native';
import _ from "lodash"

// import constants and functions
import { GlobalStyles, http, loader, errorMessage, CopyClipboard, RFValue, Colors } from '../../utils/constants'
import moment from "moment"

// import assets
import empty from '../../animations/empty.json';

const styles = StyleSheet.create({
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
        <ScrollView style={styles.scroll}>
            <TouchableOpacity onPress={_ => CopyClipboard(item.hash)} >
                <View style={[styles.hashsec, styles.text]}>
                    <View style={styles.containertitle}>
                        <Text style={styles.title}>HASH</Text>
                        <Icon name="ios-copy" size={15} color="#877E7C" />
                    </View>
                    <View style={styles.containertitle}>
                        <Text style={styles.subtitle}>{(item.hash ? item.hash.substr(0, 36) : "")}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={[styles.hashsec, styles.text]}>
                <View style={styles.containertitle}>
                    <Text style={styles.title}>Descripcion</Text>
                    <Text style={styles.subtitle}>{item.description_transaction}</Text>
                </View>
            </View>

            <View style={[styles.facePost, styles.text]}>
                <View style={styles.containerPrinc}>

                    <View style={styles.containertitle}>
                        <Text style={styles.title}>Fecha</Text>
                        <Text style={styles.title}>Hora</Text>
                    </View>

                    <View style={styles.containertitle}>
                        <Text style={styles.subtitle}>{(item.date_create ? moment(item.date_create).format("DD/MM/YYYY") : "")}</Text>
                        <Text style={styles.subtitle}>{(item.date_create ? moment(item.date_create).format("HH:mm a") : "")}</Text>
                    </View>
                </View>


                <View style={styles.containerPrinc}>
                    <View style={styles.containertitle}>
                        <Text style={styles.title}>Monto de Transacción</Text>
                        <Text style={styles.title}>Monto (USD)</Text>
                    </View>

                    <View style={styles.containertitle}>
                        <Text style={styles.subtitle}>{(item.amount ? item.amount : "")}</Text>
                        <Text style={styles.subtitle}>{(item.amount_usd ? item.amount_usd : "")}</Text>
                    </View>
                </View>

                <View style={styles.containerPrinc}>
                    <View style={styles.containertitle}>
                        <Text style={styles.title}>Moneda</Text>
                        <Text style={styles.title}>Fee</Text>
                    </View>

                    <View style={styles.containertitle}>
                        <Text style={styles.subtitle}>{(item.id_type >= 6 ? item.name_coin_to : item.name_coin_transaction)}</Text>
                        <Text style={styles.subtitle}>{(`${item.amount_fee} ${item.coin_fee}`)}</Text>

                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={styles.titleTotal}>Total: </Text>

                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: '#FFF', fontSize: RFValue(20) }}>{_.floor(item.amount_usd + item.amount_fee, 2)} USD</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={_ => CopyClipboard(item.wallet_too)}>
                <View style={[styles.hashsec, styles.text]}>
                    <View style={styles.containertitle}>
                        <Text style={styles.title}>Billetera Remitente</Text>
                        <Icon name="ios-copy" size={15} color="#877E7C" />
                    </View>

                    <View style={styles.containertitle}>
                        {
                            item.wallet_to
                                ? <Text style={styles.subtitle}>{item.wallet_to.substr(0, 36)}</Text>
                                : <Text style={styles.textInfoEmpty}>SIN DATOS</Text>
                        }

                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={_ => CopyClipboard(item.wallet_from)}>
                <View style={[styles.hashsec, styles.text]}>

                    <View style={styles.containertitle} >
                        <Text style={styles.title}>Billetera Receptora</Text>
                        <Icon name="ios-copy" size={15} color="#877E7C" />
                    </View>

                    <View style={styles.containertitle}>
                        <Text style={styles.subtitle}>{(item.wallet_from ? item.wallet_from.substr(0, 36) : "")}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView >
    )

}


const SearchGlobal = () => {

    const [searchText, setSearchText] = useState("")
    const [DescripReuslt, setDescripResult] = useState("")

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
        <Container>
            <View style={stylesComponent.containerSearch}>
                <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Buscar hash, billetera.."
                    placeholderTextColor="#ffff"
                    returnKeyType="search"
                    onSubmitEditing={getAllData}
                    style={[GlobalStyles.textInput, stylesComponent.inputSearch]} />

                <TouchableOpacity style={stylesComponent.buttonSearch} onPress={getAllData}>
                    <Text>
                        <Icon name="ios-search" size={30} color={Colors.colorYellow} />
                    </Text>
                </TouchableOpacity>
            </View>
            {
                (DescripReuslt.hash)
                    ? <Description item={DescripReuslt} />
                    : <Lottie source={empty} style={stylesComponent.empty} loop={false} autoPlay />
            }
        </Container >
    )
}

const stylesComponent = StyleSheet.create({
    containerSearch: {
        alignItems: "center",
        flexDirection: "row",
        margin: 15
    },
    buttonSearch: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 10,
        paddingHorizontal: RFValue(10),
        paddingVertical: RFValue(5),
        justifyContent: "center",
        margin: 5
    },
    inputSearch: {
        flex: 1,
    },
    empty: {
        alignSelf: "center",
        resizeMode: "contain",
        height: RFValue(500),
        width: RFValue(250),
    }

})

export default SearchGlobal