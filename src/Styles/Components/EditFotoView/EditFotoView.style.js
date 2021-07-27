import { Colors, RFValue } from "../../../utils/constants"

export default {
    contain: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        paddingHorizontal: '5%',
        paddingVertical: '12.5%',
        justifyContent: "space-between",
        alignItems: "center",
    },
    subContainer: {
        height: '50%',
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    subContainerDown: {
        height: '40%',
        width: '100%',
        justifyContent: "space-between",
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
        flex: 1,
        backgroundColor: "blue",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        margin: 10,
        justifyContent: "space-between",
        marginVertical: RFValue(25),
        paddingTop: RFValue(15),
    },
}
