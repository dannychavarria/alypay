import { RFValue, Colors } from '../../../utils/constants'

export default {
    container:{
        padding: RFValue(20),
    },
    textInput: {
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.colorYellow + "55",
        color: 'black',
        elevation: 5,
        padding: RFValue(10),
        zIndex: 50,
    },
    cardContainer: {
        backgroundColor: 'white',
        height: RFValue(50),
        marginTop: RFValue(5)
    },
}