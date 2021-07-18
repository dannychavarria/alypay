import React, {
    useEffect,
    useState,
    useReducer
} from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    FlatList
} from 'react-native'

//utils
import {
    errorMessage,
    getHeaders,
    http,
    successMessage,
    loader,
    reducer
} from '../../utils/constants'
//estilos
import useStyles from '../../hooks/useStyles.hook'
import EditWalletsStyles from '../../Styles/Components/EditWalletsStyle/EditWallets.styles'
//store
import store from "../../store/index"
//componentes
import MiniCardWallet from '../MiniCardWallet/MiniCardWallet.component'
import ModalPassword from '../ModalPassword/ModalPassword.component'

const initialState = {
    hash: "",
    amount: "",
    information: null,
}

const EditWallets = () => {
    //accedomes al store
    const { global, wallet } = store.getState()
    const [state, dispatch] = useReducer(reducer, initialState)
    //estado para mostra la edicion de las billeteras
    const [showEdit, setShowEdit] = useState(false)
    //estado para mostrar el modal que pide la contraseña
    const [showModal, setShowModal] = useState(false)
    //estado para manejar las wallets de manera local al componente
    const [wallets, setWallets] = useState([])
    //estado para la contraseña
    const [password, setPassword] = useState('')
    //estado para manejar el envio a la endpoint
    const [dataSent, setDataSent] = useState({
        display: 1,
        password: '',
        id_wallet: -1
    })
    //estilos :v
    const styles = useStyles(EditWalletsStyles)
    //funcion para abrir la edicion de las billeteras
    const openEdit = _ => setShowEdit(true)
    //funcion para cerrar la edicion de las billeteras
    const closeEdit = _ => setShowEdit(false)
    //funcion que alterna entre abrir o cerrar la edicion de la billeteras
    const alternEdit = _ => setShowEdit(!showEdit)
    //funcion para obtener las billeteras del store
    const getWallets = _ => {
        let wallets = global.wallets
        console.log('billeteras: ', wallets)
        setWallets(wallets)
    }
    //funcion de peticion, para cambiar el estado de las billeteras
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
    //funcion que actualiza la store
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

    useEffect(() => {
        getWallets()

        const { information } = wallet

        // Actualizar informacion de la billetera
        dispatch({ type: "information", payload: information })

        // Suscribimos a cualquier cambio
        store.subscribe(() => {
            // Actualizar informacion de la billetera
            dispatch({ type: "information", payload: wallet })
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