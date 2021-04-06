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
        marginVertical: RFValue(10),
    },
}
