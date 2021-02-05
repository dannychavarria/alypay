import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'

// Import Constanst and funtions
import { Colors, GlobalStyles, errorMessage, RFValue } from '../../utils/constants'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const SearchCommerce = () => {
    const [searchText, setSearchText] = useState('')
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

export default SearchCommerce