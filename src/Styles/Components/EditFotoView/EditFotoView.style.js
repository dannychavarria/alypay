import { Colors, RFValue } from "../../../utils/constants"

export default {
    contain: {
        flex: 1,
        backgroundColor: "black",
    },
    container: {
        // flex: 1,
        paddingTop: RFValue(15),
        marginHorizontal: RFValue(10),
        // paddingVertical: "15%",
    },
    subContainer: {
        height: RFValue(300),
        width: "100%",
        flexDirection: "column",
        padding: RFValue(10),
    },
    subContainerDown: {
        alignItems: "center",
        paddingTop: RFValue(20),
    },
    textWhite: {
        color: "#CCC",
        fontSize: RFValue(18),
    },
    panelHeader: {
        alignItems: "center",
    },
    panelHandle: {
        width: RFValue(40),
        height: RFValue(10),
        borderRadius: 4,
        backgroundColor: Colors.colorYellow,
        marginBottom: RFValue(10),
    },
    panel: {
        padding: RFValue(20),
        backgroundColor: Colors.colorBlack,
        elevation: 6,
        paddingTop: RFValue(30),
        height: "100%",
    },
    panelTitle: {
        fontSize: RFValue(20),
        color: Colors.colorYellow,
    },
    panelSubtitle: {
        fontSize: RFValue(16),
        color: "#CCC",
    },

    rowFormsButtons: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: RFValue(30),
        padding: RFValue(15),
    },
}
