import { RFValue, Colors, GlobalStyles } from '../../../utils/constants'

export default {
    container:{
        padding: RFValue(20),
    },
    containerPicker: {
        ...GlobalStyles.textInput,
        alignItems: "center",
        flexDirection: "row",
    },
    textInput: {
        borderColor: Colors.colorSecondary + "55",
        padding: 8,
        flex: 1,
        color: 'white',
    },
    textInputCol: {
        flex: 0.9,
        paddingLeft: 5,
        padding: 0,
        color: 'white',
    },
    cardContainer: {
        backgroundColor: 'gray',
        height: RFValue(40),
        marginTop: RFValue(2),
        justifyContent: "center",
        alignItems: "center",
    },
    textWhite:{    
        color: 'white',
    }
}