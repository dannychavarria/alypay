import { RFValue, Colors, GlobalStyles } from '../../../utils/constants'

export default {
    container:{
        width: '100%',
        paddingTop: RFValue(20),
        alignItems: 'center',
    },
    containerPicker: {
        ...GlobalStyles.textInput,
        alignItems: "center",
        flexDirection: "row",
        width: '87.5%',
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
        backgroundColor: Colors.colorBlack,
        height: RFValue(40),
        width: '87.5%',
        marginTop: RFValue(2),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderColor: Colors.colorYellow + 55,
        borderWidth: 1,
        borderRadius: 5,
    },
    textWhite:{    
        color: Colors.colorYellow,
    }
}