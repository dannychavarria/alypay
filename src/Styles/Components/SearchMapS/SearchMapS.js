import { RFValue, Colors } from '../../../utils/constants'

export default {
    container:{
        position: "absolute",
        top: 0,
        width: "100%",
        padding: RFValue(20),
    },
    textInput: {
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.colorSecondary + "55",
        color: 'black',
        elevation: 5,
        padding: RFValue(10),
        zIndex: 50,
    },
    cardContainer: {
        backgroundColor: 'white',
        height: RFValue(40),
        marginTop: RFValue(2),
        justifyContent: "center",
        alignItems: "center",
    },
}