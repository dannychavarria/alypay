import { Colors, RFValue } from "../../../utils/constants"

export default {
    contain: {
        // flex: 1,
        padding: RFValue(20),
        alignItems: "center",
        borderRadius: RFValue(10),
        borderWidth: RFValue(1),
        borderColor: Colors.colorYellow,
        backgroundColor: Colors.colorMain,
        width: "100%",
        height: RFValue(350),
        justifyContent: "center",
        // alignSelf: "center",
        // alignItems: "center",
        // justifyContent: "space-between",
        // backgroundColor: Colors.colorMain,
        // borderWidth: RFValue(2),
        // borderColor: Colors.colorYellow,
        // borderRadius: RFValue(10),
        // padding: RFValue(10),
        // width: "85%",
        // height: "65%",
    },
    title: {
        color: Colors.colorYellow,
        fontSize: RFValue(18),
    },
    subtitle: {
        textAlign: "center",
        color: "#CCC",
        fontSize: RFValue(16),
    },
    inputPassword: {
        position: "absolute",
        left: 0,
        height: RFValue(40),
        width: "100%",
        borderColor: Colors.colorYellow,
        borderWidth: RFValue(2),
        borderRadius: RFValue(10),
        paddingVertical: 0,
        paddingHorizontal: RFValue(10),
        color: "white",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    rowFormsButtons: {
        // flex: 1,
        // backgroundColor: "blue",
        flexDirection: "row",
        width: "100%",
        // alignItems: "center",
        // padding: 10,
        justifyContent: "space-between",
        marginVertical: RFValue(25),
    },
    button: {
        backgroundColor: "green",
        height: "100%",
        width: "45%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonClose: {
        backgroundColor: "red",
        height: "100%",
        width: "45%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    showPassword: {
        position: "absolute",
        right: 0,
        margin: RFValue(10),
        alignItems: "flex-end",
    },

    rowForm: {
        // flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingTop: 10,
        marginVertical: RFValue(5),
    },
}
