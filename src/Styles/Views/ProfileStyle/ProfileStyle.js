import { Colors, RFValue } from "../../../utils/constants"

export default {
    principalContainer: {
        backgroundColor: Colors.colorMain,
        flex: 1
    },
    dataContainer: {
        width: '100%',
        height: '70%'
    },
    bottomContainer: {
        width: '100%',
        height: '30%',
        flexDirection: 'column-reverse',
        alignItems: 'center'
    },
    notEditableDataContainer: {
        margin: RFValue(10),
        backgroundColor: Colors.colorBlack,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    birthdayContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10,
        height: RFValue(65),
        backgroundColor: Colors.colorBlack,
        borderRadius: 15,
        justifyContent: 'space-between',
    },
    twoInputContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10,
        height: RFValue(65),
        borderRadius: 15,
        justifyContent: 'space-between',
    },
    principalDataContainer: {
        width: RFValue(200),
        alignItems: 'center',
        margin: 10,
    },
    mailContainer: {
        margin: 10,
        marginBottom: 10,
        width: '95%',
        padding: 5,
        borderRadius: 15,
    },
    inputPIN: {
        color: Colors.colorYellow,
        fontSize: 18,
        padding: 0,
    },
    principalText: {
        color: Colors.colorYellow,
        fontSize: 18
    },
    inputHorizontalContainer: {
        borderRadius: 15,
        padding: 5,
        backgroundColor: Colors.colorBlack,
        width: '47.5%'
    },
    bottomStyle: {
        backgroundColor: Colors.colorYellow,
        padding: RFValue(10),
        borderRadius: 30,
        marginBottom: RFValue(20),
    },
    iconContainer: {
        justifyContent: 'center',
        width: RFValue(100),
        height: '100%',
    },
    birthdayTextContainer: {
        borderRadius: 15,
        padding: 5,
        width: '70%'
    },
    imageStyle:{
        backgroundColor: 'gray', 
        width: 150, 
        height: 150, 
        margin: 10, 
        borderRadius: 75
    },
    secundaryTextEnd:{
        color: Colors.colorYellow, 
        fontSize: 16, 
        alignSelf: 'flex-end'
    },
    secundaryTextCenter:{
        color: Colors.colorYellow, 
        fontSize: 16, 
        alignSelf: 'center'
    },
    usuarioNameContainer: { 
        margin: RFValue(10) 
    }
}