import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

// Import Components
import { RFValue, Colors } from "../../utils/constants"
import { Image, View as ViewAnimation } from 'react-native-animatable'

// Import Assets
import images from "../../static/Recurso-2.png"
import pdf from "../../static/UPLOAD_PDF.png"


const UploadImage = ({ onChange, value, isPdf = false }) => (
    <ViewAnimation style={styles.container} animation="fadeIn">
        <View style={styles.containerImage}>
            <TouchableOpacity onPress={onChange}>
                {
                    value && value.type === "application/pdf"
                        ? <Text style={styles.legendTitle}>{value.name}</Text>
                        : <Image source={isPdf ? pdf : (value ? { uri: value.uri } : images)} style={value ? styles.bigPicture : styles.images} />
                }
            </TouchableOpacity>
            {
                (!value && isPdf) &&
                <Text style={styles.legendImage}>Presiona para subir un documento</Text>
            }

            {
                (!value && !isPdf) &&
                < Text style={styles.legendImage}>Presiona para subir o tomar una fotografia</Text>
            }
        </View>
    </ViewAnimation >
)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerImage: {
        alignItems: "center",
        backgroundColor: Colors.colorMain,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: Colors.colorYellow,
        borderStyle: "dashed",
        padding: 15
    },
    images: {
        alignContent: "center",
        resizeMode: "contain",
        height: RFValue(120),
        width: RFValue(250),
    },
    bigPicture: {
        alignContent: "center",
        resizeMode: "contain",
        height: RFValue(180),
        width: RFValue(300),
    },
    positionLabel: {
        marginBottom: 5,
    },
    legendImage: {
        fontSize: RFValue(15),
        color: Colors.colorYellow
    },
    legendTitle: {
        color: Colors.colorYellow,
        fontSize: RFValue(16),
        padding: 10,
    },
    deleteImage: {
        alignItems: "center",
        backgroundColor: Colors.colorRed,
        borderColor: Colors.colorGray,
        borderRadius: 10,
        borderWidth: 1,
        height: 25,
        width: 40
    },

})

export default UploadImage