import { Colors, RFValue } from "../../../utils/constants"

export default {
    contain: {
        flex: 1,
        backgroundColor: 'black'
    },
    container: {
        paddingHorizontal: '5%',
        paddingVertical: '15%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subContainer: {
        height: '60%',
        width: '100%',
        justifyContent: 'space-between',
    },
    subContainerDown: {
        height: '37.5%',
        width: '100%',
        justifyContent: 'space-between',
    },
    textWhite: {
        color: 'white',
        fontSize: RFValue(18)
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
        elevation: 6
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