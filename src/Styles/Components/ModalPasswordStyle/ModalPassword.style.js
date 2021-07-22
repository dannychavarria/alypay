import { Colors, RFValue } from "../../../utils/constants";

export default {
    contain: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: 'black',
        borderWidth: RFValue(2),
        borderColor: Colors.colorYellow,
        borderRadius: RFValue(10),
        padding: RFValue(10),
        width: "85%",
        height: '65%'
    },
    title: {
        color: Colors.colorYellow,
        fontSize: RFValue(18)
    },
    subtitle: {
        color: 'gray',
        fontSize: RFValue(16),
    },
    inputPassword: {
        position: 'absolute',
        left: 0,
        height: RFValue(40),
        width: '100%',
        borderColor: Colors.colorYellow,
        borderWidth: RFValue(2),
        borderRadius: RFValue(10),
        paddingVertical: 0,
        paddingHorizontal: RFValue(10),
        color: 'white'
    },
    row: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: 'green',
        height: '100%',
        width: '45%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonClose: {
        backgroundColor: 'red',
        height: '100%',
        width: '45%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    showPassword: {
        position: 'absolute',
        right: 0,
        margin: RFValue(10),
        alignItems: "flex-end",
    }
}