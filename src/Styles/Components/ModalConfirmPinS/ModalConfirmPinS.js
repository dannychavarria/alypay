import { Colors, RFValue } from '../../../utils/constants'

export default {
    buttonStyle: {
        backgroundColor: Colors.colorBlack,
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 40,
        margin: 5
    },
    textButtonStyle: { 
        color: Colors.colorYellow,
        fontWeight: "bold",
        fontSize: RFValue(18)
    },
    rowContainer:{
        flexDirection: 'row', 
        justifyContent: 'center' 
    },
    principalContainer:{
        flex: 1,
        marginTop: RFValue(80),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'gray',
        marginBottom: 40,
        fontSize: RFValue(18)
    }
}