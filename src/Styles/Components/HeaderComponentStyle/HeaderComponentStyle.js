import { Colors, RFValue } from '../../../utils/constants'

export default {

    principalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 55,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.colorBlack
    },
    imageStyle: {
        height: '100%',
        width: 200,
        resizeMode: "contain"
    },
    modalOut: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    modalStyle: {
        position: 'absolute',
        end: 0,
        top: 0,
        marginTop: 65,
        marginRight: 40,
        backgroundColor: Colors.colorMain,
        borderColor: Colors.colorYellow,
        borderRadius: 5,
        padding: 10,
        borderWidth: 2
    },
    textButtonStyle: {
        height: 30, 
        color: Colors.colorYellow, 
        fontSize: 16 
    }

}