import { is } from '@babel/types'
import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Image,
    Switch
} from 'react-native'

import {
    urlAlyCoin,
} from '../../utils/constants'


const MiniCardWallet = (props) => {
    const [isActive, setActive] = useState(true)

    const { wallet, setDataSent, setShowModal } = props

    const urlImage =
        wallet._id !== null
            ? `https://s2.coinmarketcap.com/static/img/coins/128x128/${wallet._id
            }.png`
            : urlAlyCoin

    const alternWallet = _ => {
        // setActive(!isActive)
        setDataSent({
            display: wallet.id_state === 1 ? 2 : 1,
            id_wallet: wallet.id
        })
        setShowModal(true)
    }

    useEffect(_ => {
        setActive(wallet.id_state === 1 ? true : false)
    }, [wallet])
    return (
        <View style={{
            width: '100%',
            backgroundColor: 'black',
            height: 45,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
            paddingHorizontal: 10
        }}>

            <View style={{
                height: '100%',
                width: '40%',
                flexDirection: 'row',
                alignItems: 'center',
            }}>

                <Image source={{ uri: urlImage }} style={{
                    height: 45,
                    width: 45,
                    resizeMode: 'contain',
                    borderRadius: 50,
                    marginRight: 10,
                }} />

                <Text style={{
                    flex: 1,
                    color: 'yellow',
                    fontSize: 20,
                }}
                    numberOfLines={1}
                >{wallet.name}</Text>

            </View>

            <View style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 16
                }}
                    numberOfLines={1}
                >{wallet.price}</Text>
            </View>

            <View style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isActive ? "#f5dd4b" : "red"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={alternWallet}
                    value={isActive}
                />
            </View>
        </View>
    )
}

export default MiniCardWallet