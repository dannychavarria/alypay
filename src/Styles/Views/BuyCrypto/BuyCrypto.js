import { Colors, RFValue } from "../../../utils/constants"

export default {
    containerWallet: {
        margin: RFValue(20)    
    },
    containerInput:{
        width: '100%',
        height: 350,
    },
    containerInputHorizontal: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    inputStyle: {
        backgroundColor: Colors.colorBlack,
        color: 'white',
        borderColor: Colors.colorYellow,
        borderWidth: 1,
        width: RFValue(160),
        borderRadius: 5
    },
    textTitleInput: {
        color: Colors.colorYellow,
        fontSize: RFValue(18)
    },
    textTitle: {
        color: Colors.colorYellow,
        alignSelf: 'center',
        fontSize: RFValue(26),
        marginVertical: RFValue(40)
    },
    textTouchable: {
        backgroundColor: Colors.colorBlack,
        borderColor: Colors.colorYellow,
        borderWidth: 1,
        marginHorizontal: RFValue(10),
        borderRadius: 5,
        paddingHorizontal: RFValue(10),
        paddingVertical: RFValue(5)
    },
    textTitleInputWaller: {
        color: Colors.colorYellow,
        fontSize: RFValue(18),
        alignSelf: 'center'
    },
    containerWalletTouchable: {
        flexDirection: 'column',
        marginBottom: RFValue(40),
    },
    buttonBuy: {
        width: '100%',
        backgroundColor: Colors.colorYellow,
        paddingVertical: RFValue(5),
        borderRadius: 5,
        marginTop: RFValue(20)
    },
    textBuy: {
        color: Colors.colorBlack,
        fontSize: RFValue(18),
        alignSelf: 'center',
    },
    containerCheckbox: {
        flexDirection: 'row',
    },
    textTitleCheckbox: {
        paddingHorizontal: 10,
        color: Colors.colorYellow,
        fontSize: RFValue(18),
    },
    inputHashStyle: {
        backgroundColor: Colors.colorBlack,
        color: 'white',
        borderColor: Colors.colorYellow,
        borderWidth: 1,
        width: '100%',
        borderRadius: 5
    },
    containerHash: {
        marginVertical: 20
    }
}
