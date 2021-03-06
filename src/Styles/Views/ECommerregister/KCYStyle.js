import { Colors, RFValue, GlobalStyles } from "../../../utils/constants"

export default {
    borderLeft: {
        borderLeftWidth: 2,
        borderColor: Colors.colorYellow,
        paddingLeft: RFValue(20),
        marginLeft: RFValue(20),
    },

    borderYellow: {
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.colorMain,
        width: "82%",
        borderColor: Colors.colorYellow,
        paddingHorizontal: RFValue(20),
        marginLeft: 10,
    },

    textDate: {
        fontSize: RFValue(20),
        marginHorizontal: 20,
        color: Colors.colorYellow,
    },

    textInput: {
        backgroundColor: Colors.colorMain,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.colorYellow,
        color: "#FFF",
        elevation: 5,
        padding: RFValue(10),
        zIndex: 50,
    },

    scrollView: {
        flex: 1,
    },
    container: {
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingHorizontal: "5%",
    },
    containerTitle: {
        flex: 1,
        marginLeft: RFValue(10),
        paddingTop: RFValue(10),
    },
    containerTitleText: {
        color: Colors.colorYellow,
        fontSize: RFValue(23.8),
    },
    containerModal: {
        alignSelf: "center",
        backgroundColor: Colors.colorBlack,
        borderRadius: 10,
        padding: 10,
        height: "80%",
        width: "90%",
    },
    itemCountry: {
        borderRadius: 10,
        borderBottomWidth: 2,
        borderColor: Colors.colorYellow,
        padding: 10,
    },
    column: {
        flexDirection: "row",
    },
    logo: {
        alignContent: "center",
        resizeMode: "contain",
        height: RFValue(128),
        width: RFValue(256),
    },
    labelsColumn: {
        alignItems: "center",
        position: "relative",
        marginBottom: 5,
        flexDirection: "row",
    },
    legendColumn: {
        color: Colors.colorYellow,
        fontSize: RFValue(16),
    },
    labelsRow: {
        alignItems: "center",
        position: "relative",
        marginBottom: 5,
        flexDirection: "row",
    },
    legendRow: {
        color: Colors.colorYellow,
        fontSize: RFValue(16),
    },
    row: {
        flexDirection: "column",
        width: "100%",
        marginVertical: 10,
    },
    tab: {
        width: "100%",
        paddingBottom: RFValue(20),
    },
    textTitle: {
        color: Colors.colorYellow,
        fontSize: RFValue(22),
    },
    containerIcon: {
        justifyContent: "center",
    },
    containerInput: {
        marginHorizontal: 15,
        padding: 5,
    },
    containerPicker: {
        marginHorizontal: 15,
        padding: 5,
    },
    buttons: {
        alignItems: "center",
        backgroundColor: Colors.colorMain,
        borderColor: Colors.colorSecondary,
        borderRadius: 10,
        borderWidth: 1,
        height: 25,
        width: 45,
    },
    fields_container: {
        flexDirection: "row",
        backgroundColor: Colors.colorMain,
        borderColor: Colors.colorSecondary,
        borderRadius: 10,
        borderWidth: 1,
        height: RFValue(50),
        color: Colors.colorGray,
        paddingLeft: RFValue(15),
    },
    position: {
        padding: 10,
    },
    title: {
        marginLeft: 10,
        color: Colors.colorSecondary,
        fontSize: RFValue(16),
    },
    textBack: {
        color: Colors.colorYellow,
        textTransform: "uppercase",
        fontSize: RFValue(16),
    },
    textImage: {
        color: Colors.colorYellow,
        fontSize: RFValue(15),
    },
    SubContainerPicker: {
        borderColor: Colors.colorSecondary,
        backgroundColor: Colors.colorMain,
        borderRadius: 10,
        borderWidth: 1,
        elevation: 5,
    },
    picker: {
        paddingHorizontal: 0,
        color: "#FFF",
    },
    buttonsOptions: {
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: Colors.colorSecondary,
        justifyContent: "center",
        marginHorizontal: 15,
        padding: 10,
    },
    rowButtons: {
        alignItems: "center",
        marginHorizontal: RFValue(15),
        marginVertical: RFValue(25),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowPhoneNumber: {
        alignItems: "stretch",
        flexDirection: "row",
        marginTop: RFValue(5),
        width: "100%",
    },
    required: {
        backgroundColor: Colors.colorRed,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        color: "#FFF",
        fontSize: RFValue(10),
        position: "absolute",
        right: 0,
    },
    legendSeePassword: {
        color: Colors.colorYellow,
        marginRight: 10,
    },
    checkContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: RFValue(5),
    },
    viewImageUpload: {
        width: 90,
        height: 90,
        // resizeMode: "contain"
    },
    textInputWithImage: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    touchableCol: {
        flex: 0.1,
        alignItems: "flex-end",
    },
    textInputCol: {
        flex: 0.9,
        paddingLeft: 5,
        padding: 0,
        color: "white",
    },

    containerModalSuccess1: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.colorBlack,
        borderRadius: 10,
        paddingVertical: RFValue(20),
        height: "90%",
        width: "90%",
    },
    logoSuccess: {
        resizeMode: "contain",
        height: RFValue(128),
        width: RFValue(256),
    },
    rowImage: {
        flexDirection: "column",
        alignItems: "center",
    },
    subTitle: {
        color: "#FFF",
        fontSize: RFValue(14),
        textAlign: "center",
        marginVertical: RFValue(10),
    },
    textTitleSuccess: {
        color: Colors.colorYellow,
        fontSize: RFValue(18),
        marginVertical: RFValue(10),
        textAlign: "center",
    },
    buttonSuccess: {
        ...GlobalStyles.buttonPrimary,
        marginTop: RFValue(25),
        width: "80%",
    },
}
