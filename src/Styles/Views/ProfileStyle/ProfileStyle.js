import { Colors, RFValue } from "../../../utils/constants"

export default {
    bottomContainer: {
        height: RFValue(140),
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        borderRadius: 25
    },
    notEditableDataContainer: {
        margin: RFValue(10),
        backgroundColor: Colors.colorBlack,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    principalDataContainer: {
        width: RFValue(200),
        alignItems: 'center',
        margin: 10,
    },
    textContainer: {
        marginBottom: RFValue(5),
        width: '95%',
        padding: 5,
        borderRadius: 15,
    },
    bottomStyle: {
        backgroundColor: Colors.colorYellow,
        paddingVertical: RFValue(6.5),
        borderRadius: 30,
        width: RFValue(180),
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
        backgroundColor: 'gray',
        width: RFValue(180),
        height: RFValue(180),
        margin: 10,
        borderRadius: 120
    },
    principalTextCenter: {
        color: Colors.colorYellow,
        fontSize: 22,
        alignSelf: "center",
    },
    secundaryTextCenter: {
        color: 'gray',
        fontSize: 22,
        alignSelf: 'center'
    },
    textButton: {
        color: Colors.colorMain,
        fontSize: 22
    },
    textButtonSecundary: {
        color: Colors.colorYellow,
        fontSize: 22
    }
}