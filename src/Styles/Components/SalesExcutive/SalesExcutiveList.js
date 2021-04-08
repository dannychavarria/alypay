// Import Constants
import { RFValue, Colors } from "../../../utils/constants"

export default {
    main: {
        flex: 1,
    },
    container: {
        alignItems: "center",
        backgroundColor: Colors.colorBlack,
        borderRadius: RFValue(5),
        padding: RFValue(10),
        marginVertical: RFValue(5),
        marginHorizontal: RFValue(10),
        flexDirection: "row",
        elevation: 25,
    },
    containerTitle: {
        //flex: 1,
        marginHorizontal: RFValue(15),
        padding: RFValue(10),
    },
    cardInfo: {
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
    },
    headerTableTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    titleCard: {
        fontSize: RFValue(16),
        color: Colors.colorYellow,
    },
    subContainerInfo: {
        flex: 1,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        resizeMode: "contain",
        marginRight: RFValue(10),
        height: RFValue(80),
        width: RFValue(80),
    },
    headerTable: {
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "50%",
    },
    subTitle: {
        color: "#CCC",
        fontSize: RFValue(14),
    },
    title: {
        fontSize: RFValue(24),
        color: Colors.colorYellow,
    },

    rowButtons: {
        alignItems: "center",
        marginVertical: RFValue(10),
        paddingHorizontal: RFValue(25),
        width: "100%",
        flexDirection: "row",
    },

    containerError: {
        alignItems: "center",
    },
    empty: {
        alignSelf: "center",
        resizeMode: "contain",
        height: RFValue(250),
        width: RFValue(250),
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
}
