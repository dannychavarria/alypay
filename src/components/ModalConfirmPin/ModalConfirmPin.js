import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import ModalConfirmPinS from "../../Styles/Components/ModalConfirmPinS/ModalConfirmPinS"
import useStyles from '../../hooks/useStyles.hook'

const ModalConfirmPin = () => {

    const [PIN, setPIN] = useState([])

    const classes = useStyles(ModalConfirmPinS)

    const PinFunction = (pin) => {
        PIN.length < 6 ? setPIN([...PIN, pin]) : ''
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'gray', alignItems: 'center' }}>

            <Text style={{ 
                fontSize: 24,
                borderWidth: 1
            }}
            >{PIN}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={classes.buttonStyle}
                    onPress={() => { PinFunction(1) }}
                >
                    <Text style={{ color: 'yellow' }}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={classes.buttonStyle}
                    onPress={() => { PinFunction(2) }}
                >
                    <Text style={{ color: 'yellow' }}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={classes.buttonStyle}
                    onPress={() => { PinFunction(3) }}
                >
                    <Text style={{ color: 'yellow' }}>3</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={classes.buttonStyle}
                    onPress={() => { PinFunction(4) }}
                >
                    <Text style={{ color: 'yellow' }}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={classes.buttonStyle}
                    onPress={() => { PinFunction(5) }}
                >
                    <Text style={{ color: 'yellow' }}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={classes.buttonStyle}
                    onPress={() => { PinFunction(6) }}
                >
                    <Text style={{ color: 'yellow' }}>6</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={classes.buttonStyle}
                    onPress={() => { PinFunction(7) }}
                >
                    <Text style={{ color: 'yellow' }}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={classes.buttonStyle}
                    onPress={() => { PinFunction(8) }}
                >
                    <Text style={{ color: 'yellow' }}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={classes.buttonStyle}
                    onPress={() => { PinFunction(9) }}
                >
                    <Text style={{ color: 'yellow' }}>9</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={classes.buttonStyle}
                    onPress={() => { setPIN(PIN.splice(0, PIN.length-1)) }}
                >
                    <Text style={{ color: 'yellow' }}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity style={classes.buttonStyle}
                    onPress={() => { PinFunction(0) }}
                >
                    <Text style={{ color: 'yellow' }}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={classes.buttonStyle}
                    onPress={() => {}}
                >
                    <Text style={{ color: 'yellow' }}>?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModalConfirmPin