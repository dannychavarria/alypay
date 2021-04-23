import { RFValue, Colors } from '../../../utils/constants'

export default {
    container:{
        padding: RFValue(20),
    },
    textInput: {
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.colorSecondary + "55",
        elevation: 5,
        padding: RFValue(10),
        zIndex: 50,
    },
    textInputCol: {
        flex: 0.9,
        paddingLeft: 5,
        padding: 0,
        color: 'black',
    },
    cardContainer: {
        backgroundColor: 'white',
        height: RFValue(40),
        marginTop: RFValue(2),
        justifyContent: "center",
        alignItems: "center",
    },
}