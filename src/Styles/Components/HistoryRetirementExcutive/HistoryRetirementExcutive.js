import { Colors, RFValue } from "../../../utils/constants"

export default {
    main: {
        flex: 1,
        backgroundColor: Colors.colorMain,
    },
    logo: {
        alignSelf: "center",
        resizeMode: "contain",
        height: RFValue(128),
        width: RFValue(256),
    },
    contenList: {
        flex: 1,
        marginVertical: RFValue(10),
    },
    containerTitle: {
        //flex: 1,
        marginHorizontal: RFValue(15),
        padding: RFValue(10),
    },
    title: {
        fontSize: RFValue(24),
        color: Colors.colorYellow,
    },
    bodyRowTable: {
        borderBottomColor: "#FFF",
        borderBottomWidth: 1,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    card: {
        backgroundColor: Colors.colorBlack,
        borderRadius: 10,
        marginHorizontal: RFValue(10),
        padding: RFValue(10),
        marginTop: RFValue(10),
        height: "55%",
    },
    headerTable: {
        borderBottomColor: Colors.colorYellow,
        borderBottomWidth: 2,
        paddingVertical: 10,
        // marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textHeaderTable: {
        color: Colors.colorYellow,
        fontSize: RFValue(14),
    },
    textRowTable: {
        color: "#FFF",
        fontSize: RFValue(12),
        justifyContent: "center",
    },
    textRowTableCompany: {
        color: "#FFF",
        fontSize: RFValue(11),
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
    totalAmounts: {
        marginHorizontal: RFValue(20),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textFooterTable: {
        color: Colors.colorYellow,
        fontSize: RFValue(18),
    },
}
