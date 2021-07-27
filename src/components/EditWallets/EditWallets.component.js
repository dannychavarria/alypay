import React, { useEffect, useState, useReducer } from "react"
import { View, TouchableOpacity, Text, FlatList } from "react-native"

//utils
import {
    errorMessage,
    getHeaders,
    http,
    successMessage,
    loader,
    reducer,
} from "../../utils/constants"
//estilos
import useStyles from "../../hooks/useStyles.hook"
import EditWalletsStyles from "../../Styles/Components/EditWalletsStyle/EditWallets.styles"
//store
import store from "../../store/index"
//componentes
import MiniCardWallet from "../MiniCardWallet/MiniCardWallet.component"
import ModalPassword from "../ModalPassword/ModalPassword.component"

const EditWallets = () => {
    //accedomes al store
    const { global } = store.getState()
    //estado para mostra la edicion de las billeteras
    const [showEdit, setShowEdit] = useState(false)
    //estado para mostrar el modal que pide la contraseña
    const [showModal, setShowModal] = useState(false)
    //estado para manejar las wallets de manera local al componente
    const [wallets, setWallets] = useState([])
    const [walletIndex, setWalletIndex] = useState(-1)
    //estado para la contraseña
    const [password, setPassword] = useState("")
    //estado para manejar el envio a la endpoint
    const [dataSent, setDataSent] = useState({
        display: 1,
        password: "",
        id_wallet: -1,
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
        setWallets(wallets)
    }
    //funcion de peticion, para cambiar el estado de las billeteras
    const changeWallets = async _ => {
        try {
            loader(true)

            let dataComplet = {
                ...dataSent,
                password: password,
            }

            setDataSent(dataComplet)

            const { data: response } = await http.post(
                "/wallets/change-display",
                dataComplet,
                getHeaders(),
            )

            if (response.error) {
                throw String(response.message)
            } else {
                updateStore()
                successMessage("Billetera actualizada")
                setShowEdit(false)
            }
        } catch (error) {
            errorMessage(error)
        } finally {
            loader(false)
        }
    }

    //funcion que actualiza la store
    const updateStore = _ => {
        let walletChange = wallets[walletIndex]
        walletChange.id_state = walletChange.id_state === 1 ? 2 : 1

        let walletsPosChange = wallets
        walletsPosChange[walletIndex] = walletChange

        setWallets(walletsPosChange)

        const { globalStorage } = store.getState()

        const dataStorage = {
            ...globalStorage,
            wallets: walletsPosChange,
        }

        store.dispatch({ type: "SETSTORAGE", payload: dataStorage })

        store.getState().functions.reloadWallets()
    }
    
    useEffect(() => {
        getWallets()

        // store.subscribe(() => {
        //     // Actualizar informacion de la billetera
        //     let { global } = store.getState()
        //     setWallets(global.wallets)

        // })
    }, [wallets])

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.titlePrincipal}>Billeteras</Text>
                <TouchableOpacity onPress={alternEdit}>
                    <Text style={styles.subTitle}>
                        {showEdit ? "X" : "Editar"}
                    </Text>
                </TouchableOpacity>
            </View>
            {showEdit ? (
                <View style={styles.containerCardInfoMax}>
                    <FlatList
                        keyExtractor={(item, index) => `${item.name}`}
                        data={wallets}
                        renderItem={({ item, index }) => (
                            <MiniCardWallet
                                wallet={item}
                                setDataSent={setDataSent}
                                setShowModal={setShowModal}
                                setWalletIndex={setWalletIndex}
                                index={index}
                            />
                        )}
                    />
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.containerCardInfoMini}
                    onPress={openEdit}>
                    <Text style={styles.subTitle}>Mostrar mis belleteras</Text>
                </TouchableOpacity>
            )}
            <ModalPassword
                password={password}
                setPassword={setPassword}
                showModal={showModal}
                setShowModal={setShowModal}
                fn={changeWallets}
                indexWallet={walletIndex}
            />
        </View>
    )
}

export default EditWallets
