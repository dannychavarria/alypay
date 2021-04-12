import { Colors, RFValue } from "../../../utils/constants"

export default {

    textInput: {
        paddingHorizontal: RFValue(10),
        height: RFValue(47),
        color: '#fff',
        backgroundColor: Colors.colorBlack,
        borderRadius: RFValue(25),
        borderWidth: RFValue(1),
        borderColor: Colors.colorYellow,
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
        padding: 10,
        marginLeft: 10
    },
    containerTitleText: {
        color: Colors.colorYellow,
        fontSize: RFValue(20)
    },
    containerModal: {
        alignSelf: "center",
        backgroundColor: Colors.colorMain,
        borderRadius: 10,
        padding: 10,
        height: "80%",
        width: "90%",
    },
    column: {
        flexDirection: "row",
        width: "100%",
        marginVertical: 10,
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
        fontSize: RFValue(16)
    },
    labelsRow: {
        alignItems: "center",
        position: "relative",
        marginBottom: 5,
        flexDirection: "row",
    },
    legendRow: {
        color: Colors.colorYellow,
        fontSize: RFValue(16)
    },
    row: {
        flexDirection: "column",
        width: "100%",
        marginVertical: 10,
    },
    tab: {
        width: "100%",
        paddingBottom: RFValue(20)
    },
    textTitle: {
        color: Colors.colorYellow,
        fontSize: RFValue(18)
    },
    containerIcon: {
        justifyContent: "center"
    },
    containerInput: {
        marginHorizontal: 15,
        padding: 5
    },
    containerPicker: {
        marginHorizontal: 15,
        padding: 5
    },
    buttons: {
        alignItems: "center",
        backgroundColor: Colors.colorMain,
        borderColor: Colors.colorSecondary,
        borderRadius: 10,
        borderWidth: 1,
        height: 25,
        width: 45
    },
    fields_container: {
        flexDirection: "row",
        backgroundColor: Colors.colorMain,
        borderColor: Colors.colorSecondary,
        borderRadius: 10,
        borderWidth: 1,
        height: RFValue(50),
        color: Colors.colorGray,
        paddingLeft: RFValue(15)
    },
    position: {
        padding: 10
    },
    title: {
        marginLeft: 10,
        color: Colors.colorSecondary,
        fontSize: RFValue(16)
    },
    textBack: {
        color: Colors.colorYellow,
        textTransform: "uppercase",
        fontSize: RFValue(16)
    },
    textImage: {
        color: Colors.colorYellow,
        fontSize: RFValue(15)
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
        // paddingTop: RFValue(15),
        marginHorizontal: RFValue(25),
        // marginVertical: RFValue(30),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowPhoneNumber: {
        alignItems: "stretch",
        flexDirection: "row",
        marginTop: RFValue(5),
        width: '100%',
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
    }

}