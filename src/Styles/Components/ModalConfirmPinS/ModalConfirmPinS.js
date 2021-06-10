import { Colors, RFValue } from "../../../utils/constants"

export default {
    buttonStyle: {
        backgroundColor: Colors.colorBlack,
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 20,
        width: RFValue(75),
        margin: 5,
    },
    textButtonStyle: {
        color: Colors.colorYellow,
        fontWeight: "bold",
        fontSize: RFValue(18),
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    principalContainer: {
        flex: 1,
        // marginTop: RFValue(20),
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        width: '80%'
    },
    title: {
        color: "gray",
        marginBottom: 40,
        fontSize: RFValue(18),
    },
    buttonCloseStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: RFValue(30),
        width: '100%'
    },
}
