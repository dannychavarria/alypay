import { Colors, RFValue } from '../../../utils/constants'

export default {
    container: {
        height: RFValue(30),
        width: '100%',
        alignItems: 'center',
        marginTop: RFValue(15),
    },
    items: {
        height: '100%',
        marginHorizontal: RFValue(5),
        paddingHorizontal: RFValue(15),
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: Colors.colorYellow + 55,
        borderWidth: 1
    },
    text: {
        fontSize: RFValue(14),
        color: Colors.colorYellow
    },
    flatListContainer: {
        height: '100%',
        width: '87.5%'
    }
}