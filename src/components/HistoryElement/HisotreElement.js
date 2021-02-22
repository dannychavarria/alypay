import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

// Import Components
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Import constants and funtions
import { Colors, RFValue, CopyClipboard } from '../../utils/constants'

const HistoryElement = ({ item, index, navigate }) => {

    const proccessData = (value) => {
        CopyClipboard(value)
        navigate("DescriptionCommerce", { hash: value })
    }

    return (
        <View key={index}>
            <TouchableOpacity onPress={_ => proccessData(item.hash)} style={styles.container}>
                <View style={styles.subContainer}>
                    <View style={{
                        borderBottomColor: Colors.colorYellow,
                        borderBottomWidth: 2,
                        borderRadius: 3,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={styles.textTitle}>{item.description || 'Transacción'}</Text>
                        <Text style={styles.textId}># {item.id}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.legend}>Hash: </Text>
                        <Text style={styles.textHash}>{item.hash.substr(0, 25) || ''}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={styles.detailsContain}>
                            <Text style={styles.legend}>Fecha: </Text>
                            <Text style={styles.textDate}>{moment(item.date_create).format('DD/MM/YY - HH:mm a')}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name={item.debit ? 'arrow-expand-up' : 'arrow-collapse-down'} color={item.debit ? Colors.colorRed : Colors.colorGreen} size={RFValue(20)} />
                            <Text style={[styles.amount, item.debit ? styles.debitAmount : styles.creditAmount]}>{item.amount} {item.symbol}</Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.colorBlack,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderRadius: RFValue(10),
        flexDirection: 'row',
        // elevation: 25,
        padding: RFValue(10),
        margin: RFValue(10),
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    textTitle: {
        color: Colors.colorYellow,
        textTransform: 'uppercase',
        fontSize: RFValue(14),
    },
    textHash: {
        color: '#FFF',
        fontSize: RFValue(12),
        marginVertical: 10,
    },
    textId: {
        color: Colors.colorYellow,
        fontSize: RFValue(12),
        marginRight: RFValue(10),
    },
    textDate: {
        color: '#CCC',
        fontSize: RFValue(12),
    },
    detailsContain: {
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        // width: '100%',
    },
    amount: {
        fontSize: RFValue(16),
        color: '#FFF',
        marginLeft: 5,
    },
    debitAmount: {
        color: Colors.colorRed,
    },
    creditAmount: {
        color: Colors.colorGreen,
    },
    legend: {
        color: Colors.colorYellow,
        fontSize: RFValue(13)
    }
})

export default HistoryElement