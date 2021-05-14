import { Colors, RFValue, GlobalStyles } from "../../../utils/constants"
import { StyleSheet } from "react-native"

export default {
    container: {
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: Colors.colorMain,
        borderRadius: 10,
        marginHorizontal: RFValue(50),
        marginTop: RFValue(100),
        height: RFValue(550),
        width: RFValue(300),
        ...StyleSheet.absoluteFillObject,
        zIndex: 10000,
    },
    logoSuccess: {
        resizeMode: "contain",
        height: RFValue(128),
        width: RFValue(256),
    },
    rowImage: {
        flexDirection: "column",
        alignItems: "center",
    },
    subTitle: {
        color: "#FFF",
        fontSize: RFValue(14),
        textAlign: "center",
        //marginVertical: RFValue(10),
    },
    row: {
        marginVertical: RFValue(10),
        paddingHorizontal: RFValue(25),
        width: "100%",
    },
    buttonSuccess: {
        ...GlobalStyles.buttonPrimary,
        marginTop: RFValue(25),
        width: "80%",
    },
    rowButtons: {
        flex: 1,
        alignItems: "center",
        // marginVertical: RFValue(10),
        paddingHorizontal: RFValue(10),
        // width: "100%",
        flexDirection: "row",
    },

    registerButton: {
        marginRight: RFValue(50),
    },

    textRegisterButton: {
        textTransform: "uppercase",
        fontSize: RFValue(14),
        color: Colors.colorYellow,
    },
    textTitle: {
        color: Colors.colorYellow,
        fontSize: RFValue(18),
        marginVertical: RFValue(10),
    },

    textTitleSub: {
        color: Colors.colorYellow,
        fontSize: RFValue(18),
        marginVertical: RFValue(10),
        textAlign: "center",
    },
}
