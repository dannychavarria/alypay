import { Colors, RFValue } from "../../../utils/constants"

export default {
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
}