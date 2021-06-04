import { Colors, RFValue } from "../../../utils/constants"

export default {
    bottomContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        borderRadius: 25,
        width: '100%',
        backgroundColor: 'white'
    },
    notEditableDataContainer: {
        margin: RFValue(10),
        backgroundColor: Colors.colorBlack,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    principalDataContainer: {
        width: RFValue(200),
        alignItems: 'center',
        margin: RFValue(10),
    },
    textContainer: {
        marginBottom: RFValue(5),
        width: '95%',
        padding: RFValue(5),
        borderRadius: 15,
    },
    bottomStyle: {
        backgroundColor: Colors.colorYellow,
        paddingVertical: RFValue(6.5),
        borderRadius: 30,
        marginHorizontal: RFValue(10),
        alignItems: 'center',
    },
    bottomSecundary: {
        borderWidth: 1,
        borderColor: Colors.colorYellow,
        paddingVertical: RFValue(6.5),
        borderRadius: 30,
        width: RFValue(180),
        alignItems: 'center',
    },
    imageStyle: {
        width: RFValue(180),
        height: RFValue(180),
        margin: RFValue(10),
        borderRadius: 120
    },
    principalTextCenter: {
        color: Colors.colorYellow,
        fontSize: RFValue(22),
        alignSelf: "center",
    },
    secundaryTextCenter: {
        color: 'gray',
        fontSize: RFValue(22),
        alignSelf: 'center'
    },
    textButton: {
        color: Colors.colorMain,
        fontSize: RFValue(22)
    },
    textButtonSecundary: {
        color: Colors.colorYellow,
        fontSize: RFValue(22)
    },

    modalContainer: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalOut: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalStyle: {
        width: '80%',
        backgroundColor: 'black',
        borderColor: Colors.colorYellow,
        borderWidth: 1,
        padding: 25,
        borderRadius: 5,
    },
    modalTextTitle: {
        alignSelf: 'center',
        color: Colors.colorYellow,
        fontSize: 22,
        marginBottom: 15
    },
    modalTextSubtitle: {
        color: 'gray',
        fontSize: 16,
        marginBottom: 15
    },
    modalTextTitleLeft: {
        color: Colors.colorYellow,
        fontSize: 22,
    },
    modalInput: {
        backgroundColor: Colors.colorBlack,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        color: Colors.colorYellow,
    }
}