import React, {
    useEffect,
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

import store from "../../store/index"

import MiniCardWallet from '../MiniCardWallet/MiniCardWallet.component'
import ModalPassword from '../ModalPassword/ModalPassword.component'
import {
    errorMessage,
    getHeaders,
    http,
    successMessage,
    loader
} from '../../utils/constants'
import { wallet } from '../../store/reducers/wallet'

const EditWallets = () => {
    const { global } = store.getState()
    
    const [showEdit, setShowEdit] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const [wallets, setWallets] = useState([])

    const [password, setPassword] = useState('')

    const [dataSent, setDataSent] = useState({
        display: 1,
        password: '',
        id_wallet: -1
    })

    const styles = useStyles(EditWalletsStyles)


    const openEdit = _ => setShowEdit(true)

    const closeEdit = _ => setShowEdit(false)

    const alternEdit = _ => setShowEdit(!showEdit)

    const getWallets = _ => {
        let wallets = global.wallets
        console.log('billeteras: ', wallets)
        setWallets(wallets)
    }

    const changeWallets = async _ => {
        try {
            loader(true)

            let dataComplet = {
                ...dataSent,
                password: password
            }

            setDataSent(dataComplet)

            const { data: response } = await http.post('/wallets/change-display',
                dataComplet,
                getHeaders()
            )
            
            if (response.error) {
                throw String(response.message)
            } else {
                successMessage('Billetera actualizada')
               
                // await updateStore()
            }
        } catch (error) {
            errorMessage(error)
        } finally {
            loader(false)
        }
    }

    const updateStore = async _ => {
        try {
            const { globalStorage } = store.getState()

            const { data: response } = await http.get('/wallets', getHeaders())

            if (response.error) {
                throw String(response.message)
            } else {
                const dataStorage = {
                    ...globalStorage,
                    wallets: response
                }

                store.dispatch({ type: 'SETSTORAGE', payload: dataStorage })
                setWallets(response)
            }
        } catch (error) {
            errorMessage(error)
        }
    }

    useEffect(_ => {
        getWallets()
        store.subscribe(_ =>{
            const { global:newStore } = store.getState()
            console.log('NewGlobal',newStore)
            setWallets(newStore.wallets)
            })
    }, [wallet])

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
                            keyExtractor={({ index }) => index}
                            data={wallets}
                            renderItem={({ item, index }) => <MiniCardWallet
                                wallet={item}
                                setDataSent={setDataSent}
                                setShowModal={setShowModal}
                                password={password} />}
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
            <ModalPassword
                password={password}
                setPassword={setPassword}
                showModal={showModal}
                setShowModal={setShowModal}
                fn={changeWallets} />
        </View>
    )
}

export default EditWallets