import React, {
    useState
} from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    FlatList
} from 'react-native'

import useStyles from '../../hooks/useStyles.hook'
import EditWalletsStyles from '../../Styles/Components/EditWalletsStyle/EditWallets.styles'

import MiniCardWallet from '../MiniCardWallet/MiniCardWallet.component'

const EditWallets = () => {

    const [showEdit, setShowEdit] = useState(false)

    const styles = useStyles(EditWalletsStyles)

    const openEdit = _ => setShowEdit(true)

    const closeEdit = _ => setShowEdit(false)

    const alternEdit = _ => setShowEdit(!showEdit)

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.titlePrincipal}>Billeteras</Text>
                <TouchableOpacity
                    onPress={alternEdit}
                >
                    <Text style={styles.subTitle}>
                        {showEdit ? 'X' : 'Editar'}
                    </Text>
                </TouchableOpacity>
            </View>
            {
                showEdit ? (
                    <View style={styles.containerCardInfoMax}>
                        <FlatList
                            keyExtractor={index => index}
                            data={[0,1,2,3,4]}
                            renderItem={()=><MiniCardWallet/>}
                        />
                    </View>
                ) : (
                    <TouchableOpacity style={styles.containerCardInfoMini}
                        onPress={openEdit}
                    >
                        <Text style={styles.subTitle}>Mostrar mis belleteras</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default EditWallets