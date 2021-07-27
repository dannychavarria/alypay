import React, { useEffect, useState } from "react"
import { View, Text, Image, Switch } from "react-native"

//utils
import { urlAlyCoin, WithDecimals } from "../../utils/constants"
//estilos
import useStyles from "../../hooks/useStyles.hook"
import EditWalletsStyles from "../../Styles/Components/EditWalletsStyle/EditWallets.styles"

// Import Component
import Floor from "lodash/floor"

const MiniCardWallet = props => {
    //estado para activar o desactivar el switch
    const [isActive, setActive] = useState(true)
    //props
    const { wallet, setDataSent, setShowModal, index, setWalletIndex } = props
    //estilos
    const styles = useStyles(EditWalletsStyles)

    // console.log("Wallet", wallet)
    //url imagen
    const urlImage =
        wallet._id !== null
            ? `https://s2.coinmarketcap.com/static/img/coins/128x128/${wallet._id
            }.png`
            : urlAlyCoin
    //funcion para alternar el switch
    const alternWallet = _ => {
        setDataSent({
            display: wallet.id_state === 1 ? 2 : 1,
            id_wallet: wallet.id,
        })
        setWalletIndex(index)
        setShowModal(true)
    }

    useEffect(
        _ => {
            setActive(wallet.id_state === 1 ? true : false)
        },
        [wallet],
    )
    return (
        <View style={styles.miniContainer}>
            <View style={styles.miniLeftContainer}>
                <Image source={{ uri: urlImage }} style={styles.miniImage} />

                <View style={{ width: '60%' }}>
                    <Text style={styles.miniTextCoin}
                        numberOfLines={1}
                    >{wallet.name}</Text>
                </View>
            </View>

            <View style={styles.miniContainerCenter}>
                <Text style={styles.miniTextCenter}
                    numberOfLines={1}
                >
                    $ {WithDecimals(Floor(wallet.price, 2))}
                </Text>
            </View>

            <View style={styles.miniRightContainer}>
                <Switch
                    disabled={wallet.name === "Alycoin" ? true : false}
                    trackColor={{ false: "#949494", true: "#c7c7c7" }}
                    thumbColor={
                        isActive
                            ? wallet.name === "Alycoin"
                                ? "#767577"
                                : "#d5b73f"
                            : "#ff2424"
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={alternWallet}
                    value={isActive}
                />
            </View>
        </View>
    )
}

export default MiniCardWallet
