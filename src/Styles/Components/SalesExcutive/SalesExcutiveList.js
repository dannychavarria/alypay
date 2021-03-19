// Import Constants
import { RFValue, Colors } from '../../../utils/constants'

export default {
    containerTitle: {
        flex: 1,
        marginHorizontal: RFValue(15),
    },

    container: {
        alignItems: "center",
        backgroundColor: Colors.colorBlack,
        borderRadius: RFValue(5),
        padding: RFValue(10),
        marginVertical: RFValue(5),
        marginHorizontal: RFValue(10),
        flexDirection: "row",
        elevation: 25,
    },
    cardInfo: {
        flexDirection: 'column',
        justifyContent: "center",
        flex: 1,
    },
    headerTableTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
    },
    titleCard: {
        fontSize: RFValue(16),
        color: Colors.colorYellow
    },
    subContainerInfo: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        resizeMode: "contain",
        marginRight: RFValue(10),
        height: RFValue(80),
        width: RFValue(80),
    },
    headerTable: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: "50%",
    },
    subTitle: {
        color: "#CCC",
        fontSize: RFValue(14),
    },
    containerButton: {
        margin: RFValue(15),
    },
    containerModal: {
        alignSelf: "center",
        backgroundColor: Colors.colorBlack,
        borderRadius:10,
        padding: 10,
        height: "80%",
        width: "90%",
    }
}