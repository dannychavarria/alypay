import { Colors, RFValue } from "../../../utils/constants"

export default {
    container: {
        // flex: 1,
        margin: RFValue(25),
        alignItems: "center",
    },
    image: {
        resizeMode: "contain",
        width: RFValue(100),
        height: RFValue(100),
    },
    imageContainer: {
        borderRadius: RFValue(15),
        width: RFValue(100),
        height: RFValue(100),
        alignItems: "center",
        justifyContent: "center",
    },
    containerIcon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        paddingTop: 50,
        opacity: 0.6,
        // borderColor: Colors.colorYellow,
        alignItems: "center",
        justifyContent: "center",
    },

    containerCard: {
        marginHorizontal: RFValue(15),
    },
    containerCardInfo: {
        // width: "100%",
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
    rowCard: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        // marginHorizontal: RFValue(10),
    },
    rowButtons: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: RFValue(20),
        paddingHorizontal: RFValue(30),
        width: "100%",
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

    rowForm: {
        flexDirection: "column",
        width: "100%",
        marginVertical: RFValue(5),
    },
    labelsRow: {
        alignItems: "center",
        position: "relative",
        marginBottom: 5,
        flexDirection: "row",
    },
    rowFormsButtons: {
        alignItems: "center",
        // marginTop: 10,
        marginVertical: RFValue(25),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    header: {
        backgroundColor: Colors.colorBlack,
        paddingTop: RFValue(10),
        borderTopLeftRadius: RFValue(20),
        borderTopRightRadius: RFValue(20),
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
