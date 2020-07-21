import React, { useEffect, useReducer } from "react"

// Import components
import Video from "react-native-video"
import { Text, TextInput, StyleSheet, Image, View, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"

// Import Assets
import logo from "../../static/alypay.png"
import videoclip from "../../static/videos/cover.mp4"

const initialState = {}

const { height } = Dimensions.get("window")

const Login = ({ navigation }) => {
    const [state, dispatch] = useReducer(reducer, initialState)


    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.rootContainer}>
            <Video
                selectedVideoTrack={{ type: "disabled" }}
                repeat={true}
                resizeMode="cover"
                playInBackground={true}
                controls={false}
                muted={true}
                playWhenInactive={true}
                source={videoclip}
                style={styles.videoclip} />

            <View style={styles.cap} />


        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    cap: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 15,
    },

    videoclip: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height,
        zIndex: 0,
    },
})

export default Login