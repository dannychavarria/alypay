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
        justifyContent: 'center',
        width: "100%",
        backgroundColor: Colors.colorBlack,
        borderRadius: RFValue(5),
        padding: RFValue(10),
    },
    containerCardInfoMax: {
        justifyContent: 'center',
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
        color: "#ccc",
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
    //minicardwallet
    miniContainer: {
        width: '100%',
        backgroundColor: 'black',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingHorizontal: 10
    },
    miniLeftContainer: {
        height: '100%',
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    miniImage: {
        height: 45,
        width: 45,
        resizeMode: 'contain',
        borderRadius: 50,
        marginRight: 10,
    },
    miniTextCoin: {
        flex: 1,
        color: Colors.colorYellow,
        fontSize: 20,
    },
    miniContainerCenter: {
        height: '100%',
        width: '15%',
        justifyContent: 'center',
    },
    miniTextCenter: {
        color: 'white',
        fontSize: 16
    },
    miniRightContainer: {
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    }
}
