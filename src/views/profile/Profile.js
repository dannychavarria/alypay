import React, { useState, useEffect } from "react"
import { View, ScrollView } from "react-native"

// import components
import EditProfile from "../../components/EditProfile/EditProfile.component"
import EditPin from "../../components/EditPin/EditPin.component"
import EditWallets from "../../components/EditWallets/EditWallets.component"
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent"
//store
import store from '../../store/index'

const Profile = (props) => {
    const [dataUser, setDataUser] = useState({})
    // datos del cliente
    const { data } = props.route.params

    //objeto de navegacion
    const { navigation } = props

    useEffect(() => {
        setDataUser(data)
        store.subscribe(_ => {
            const { global } = store.getState()
            setDataUser(global)
        })
    }, [])

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "black",
            }}>
            <ScrollView>
                <HeaderComponent />
                <EditProfile data={dataUser} navigation={navigation} />
                <EditPin />
                <EditWallets />
            </ScrollView>
        </View>
    )
}

export default Profile
