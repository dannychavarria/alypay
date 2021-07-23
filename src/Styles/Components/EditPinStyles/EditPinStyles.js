import { Colors, RFValue } from "../../../utils/constants"

export default {
    container: {
        flex: 1,
        margin: RFValue(20),
        // alignItems: "center",
    },

    containerCard: {
        marginHorizontal: RFValue(15),
    },
    containerCardInfoMini: {
        height: RFValue(50),
        width: "100%",
        backgroundColor: Colors.colorBlack,
        borderRadius: RFValue(5),
        padding: RFValue(10),
    },
    containerCardInfoMax: {
        width: "100%",
        backgroundColor: Colors.colorBlack,
        borderRadius: RFValue(5),
        padding: RFValue(10),
    },
    row: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        // marginHorizontal: RFValue(10),
    },
    rowForm: {
        flexDirection: "column",
        width: "100%",
        paddingTop: 10,
        marginVertical: RFValue(5),
    },
    rowFormsButtons: {
        alignItems: "center",
        // marginTop: 10,
        marginVertical: RFValue(25),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    labelsRow: {
        alignItems: "center",
        position: "relative",
        marginBottom: 5,
        flexDirection: "row",
    },

    titlePrincipal: {
        color: Colors.colorYellow,
        fontSize: RFValue(18),
        padding: RFValue(5),
    },
    titlePrincipalCard: {
        color: Colors.colorYellow,
        fontSize: RFValue(16),
        padding: RFValue(5),
    },
    subTitle: {
        color: "#ccc",
        fontSize: RFValue(16),
    },
    subTitleCard: {
        color: "#FFF",
        fontSize: RFValue(14),
    },
    legendRow: {
        color: Colors.colorYellow,
        fontSize: RFValue(12),
        marginBottom: RFValue(2.5),
    },
}
