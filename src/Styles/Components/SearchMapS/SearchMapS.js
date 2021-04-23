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