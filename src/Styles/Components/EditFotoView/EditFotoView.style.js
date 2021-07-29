import { Colors, RFValue } from "../../../utils/constants"

export default {
    contain: {
        flex: 1,
        backgroundColor: "black",
    },
    container: {
        // flex: 1,
        // paddingTop: RFValue(15),
        // marginHorizontal: RFValue(10),
        // paddingVertical: "15%",
    },
    subContainer: {
        height: RFValue(300),
        // width: "100%",
        paddingTop: RFValue(15),
        marginHorizontal: RFValue(10),
        flexDirection: "column",
        padding: RFValue(10),
    },
    subContainerDown: {
        alignItems: "center",
        paddingTop: RFValue(20),
        paddingTop: RFValue(15),
        marginHorizontal: RFValue(10),
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
        flex: 1,
        padding: RFValue(20),
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: Colors.colorBlack,
        elevation: 6,
        paddingTop: RFValue(30),
        // backgroundColor: "blue",
        width: "100%",
    },
    panelContainerButton: {
        // backgroundColor: "blue",
        // alignItems: "center",
        flexDirection: "row",
        margin: 10,
        // padding: RFValue(15),
        // marginVertical: RFValue(20)
        // paddingTop: RFValue(20),
        justifyContent: "space-between",
        // height: "100%",
    },
    panelTitle: {
        fontSize: RFValue(24),
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
