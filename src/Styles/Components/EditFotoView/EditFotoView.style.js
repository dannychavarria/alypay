import { Colors, RFValue } from "../../../utils/constants"

export default {
    contain: {
        flex: 1,
        backgroundColor: "black",
    },
    container: {
        marginHorizontal: RFValue(10),
        // paddingHorizontal: '5%',
        paddingVertical: "15%",
        // flexDirection: "row",
        // justifyContent: "center",
        // justifyContent: "row",
        // alignItems: "center",
    },
    subContainer: {
        height: RFValue(300),
        width: "100%",
        flexDirection: "column",
        padding: RFValue(10),
        // justifyContent: "space-between",
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
        // paddingTop: RFValue(30),
        // height: "100%",
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
        // flex: 1,
        // backgroundColor: "blue",
        flexDirection: "row",
        // width: "100%",
        alignItems: "center",
        margin: 10,
        justifyContent: "space-between",
        marginVertical: RFValue(25),
        paddingTop: RFValue(15),
    },
}
