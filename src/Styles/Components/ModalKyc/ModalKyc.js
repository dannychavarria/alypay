import { Colors, RFValue, GlobalStyles } from "../../../utils/constants"
import { StyleSheet } from "react-native"

export default {
    container: {
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: Colors.colorBlack,
        borderRadius: 10,
        padding: 10,
        width: "95%",
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
        alignItems: "center",
        marginVertical: RFValue(10),
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