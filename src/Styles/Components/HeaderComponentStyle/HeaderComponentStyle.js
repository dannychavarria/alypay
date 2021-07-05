import { Platform } from "react-native"
import { isIphoneX } from "react-native-iphone-x-helper"
import { Colors, RFValue } from "../../../utils/constants"

export default {
    container: {
        alignItems: "center",
        backgroundColor: "rgba(250, 250, 250, 0.2)",
        paddingHorizontal: 10,
        paddingTop: Platform.OS === "ios" && isIphoneX() ? RFValue(25) : 0,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },

    logo: {
        resizeMode: "contain",
        height: RFValue(60),
        width: RFValue(140),
    },

    buttonMore: {
        opacity: 1,
        borderRadius: 25,
        backgroundColor: "rgba(250, 250, 250, 0.2)",
        padding: 5,
    },

    imageMore: {
        resizeMode: "contain",
        height: RFValue(20),
    },

    containerModal: {
        borderColor: Colors.colorYellow,
        backgroundColor: "rgba(0, 0, 0, 2)",
        marginTop: "8%",
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        width: "55%",
    },

    line: {
        borderBottomColor: Colors.colorYellow,
        borderBottomWidth: 1,
        marginVertical: 10,
    },

    titleModal: {
        fontSize: RFValue(20),
        color: Colors.colorYellow,
    },

    selectionMenu: {
        position: "relative",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,
    },

    textSelection: {
        fontSize: RFValue(16),
        color: "#FFF",
        marginLeft: 10,
    },

    imageItem: {
        height: RFValue(24),
        width: RFValue(24),
    },

    textCommingSoon: {
        // marginLeft: 10,
        color: "#FFF",
        fontSize: RFValue(10),
        padding: 5,
        borderRadius: 5,
        backgroundColor: Colors.colorRed,
        position: "absolute",
        right: 0,
    },
}
