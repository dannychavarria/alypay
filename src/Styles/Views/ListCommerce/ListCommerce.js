import { Colors, RFValue } from "../../../utils/constants"

export default {
    main: {
        flex: 1,
        backgroundColor: Colors.colorMain,
    },
    logo: {
        alignSelf: "center",
        resizeMode: "contain",
        height: RFValue(128),
        width: RFValue(256),
    },
    contenList: {
        flex: 1,
        marginVertical: RFValue(10),
    },
    containerTitle: {
        //flex: 1,
        marginHorizontal: RFValue(15),
        padding: RFValue(10),
    },
    title: {
        fontSize: RFValue(24),
        color: Colors.colorYellow,
    },
}
