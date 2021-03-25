import { Colors, RFValue } from "../../../utils/constants"

export default {
    container: {
        flex: 1,
        width: "100%",
        paddingHorizontal: RFValue(10),
    },
    col: {
        flex: 1,
        marginHorizontal: RFValue(10),
    },

    colSelectionCoin: {
        // flex: 1,
        width: "30%",
        marginHorizontal: RFValue(10),
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: RFValue(10),
    },

    legend: {
        color: Colors.colorYellow,
    },

    rowInput: {
        position: "relative",
        alignItems: "center",
        flexDirection: "row",
    },

    buttonScan: {
        backgroundColor: Colors.colorYellow,
        borderRadius: RFValue(5),
        // padding: RFValue(-),
        marginLeft: RFValue(10),
        zIndex: 1000,
    },

    lottieQRAnimation: {
        height: RFValue(50),
        width: RFValue(35),
    },
    constainerQR: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: RFValue(5),
        height: RFValue(320),
        overflow: "hidden",
    },
    retirementText: {
        fontSize: RFValue(16),
        color: Colors.colorYellow,
        textDecorationLine: "underline",
        textDecorationColor: Colors.colorYellow,
        textDecorationStyle: "double",
        paddingBottom: 5,
        textTransform: "uppercase",
    },
    retirementContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        marginHorizontal: RFValue(10),
    },
    cardInfo: {
        alignItems: "center",
        backgroundColor: Colors.colorGreen,
        justifyContent: "space-between",
        padding: RFValue(10),
        borderRadius: RFValue(10),
        marginVertical: RFValue(25),
        elevation: 25,
        flexDirection: "row",
    },
    subCard: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
    },
    avatar: {
        resizeMode: "contain",
        overflow: "hidden",
        width: RFValue(64),
        height: RFValue(64),
        marginRight: RFValue(15),
    },
    usernameCard: {
        fontSize: RFValue(16),
        color: Colors.colorYellow,
    },
    textFromCard: {
        fontSize: RFValue(12),
        color: "#FFF",
    },
    lottieVerifed: {
        height: RFValue(32),
        width: RFValue(32),
    },
    logo: {
        alignSelf: "center",
        // backgroundColor: 'red',
        resizeMode: "contain",
        height: RFValue(160),
        width: RFValue(380),
    },
    totalSatochi: {
        alignSelf: "center",
        color: Colors.colorYellow,
        fontSize: RFValue(24),
        marginVertical: RFValue(10),
    },
    totalSatochiFee: {
        alignSelf: "center",
        color: Colors.colorYellow,
        fontSize: RFValue(12),
        marginVertical: RFValue(10),
    },
    containerTitle: {
        marginTop: RFValue(10),
        flexDirection: "row",
        justifyContent: "center",
    },
    legendTitle: {
        color: Colors.colorYellow,
        fontSize: RFValue(24),
        textTransform: "uppercase",
        marginBottom: 10,
    },
    totalFees: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: Colors.colorYellow,
        borderBottomColor: Colors.colorYellow,
        marginHorizontal: RFValue(10),
    },
    containerTitleFee: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: RFValue(5),
    },
    containerPrinc: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    legendSubtitle: {
        color: "#FFF",
        fontSize: RFValue(16),
    },
    pickerItem: {
        height: RFValue(30),
        backgroundColor: "red",
    },
}
