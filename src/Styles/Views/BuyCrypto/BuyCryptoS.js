import { Colors, RFValue } from "../../../utils/constants"

export default {
    containerWallet: {
        margin: RFValue(20)    
    },
    containerInputVertical: {
        justifyContent: 'space-around',
        flex: 1
    },
    containerInputHorizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerInputItem:{
        marginVertical: 10
    },
    inputStyle: {
        backgroundColor: Colors.colorBlack,
        color: 'white',
        borderColor: Colors.colorYellow,
        borderWidth: 1,
        height: 40,
        width: '100%',
        borderRadius: 5
    },
    textTitleInput: {
        color: Colors.colorYellow,
        fontSize: RFValue(14)
    },
    textTitle: {
        color: Colors.colorYellow,
        alignSelf: 'center',
        fontSize: RFValue(26),
        marginBottom: RFValue(40)
    },
    textTouchable: {
        backgroundColor: Colors.colorBlack,
        borderColor: Colors.colorYellow,
        borderWidth: 1,
        marginHorizontal: RFValue(10),
        borderRadius: 25,
        paddingHorizontal: RFValue(10),
        paddingVertical: RFValue(5)
    },
    textTitleInputWaller: {
        color: Colors.colorYellow,
        fontSize: RFValue(14),
        alignSelf: 'center'
    },
    containerWalletTouchable: {
        flexDirection: 'column',
        marginBottom: RFValue(10),
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
        borderRadius: 25
    },
    containerHash: {
        marginVertical: 20
    },
    imageStyle: {
        resizeMode: "contain",
        height: RFValue(120),
        width: RFValue(120),
        alignSelf: 'center',
        marginRight: 10,
    },
    textWhite: {
        color: 'white',
        fontSize: RFValue(16)
    }
}
