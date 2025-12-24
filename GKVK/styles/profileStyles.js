import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 40,
    },

    notLoggedContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    notLoggedText: {
        fontSize: 18,
        marginVertical: 15,
    },
    loginButton: {
        backgroundColor: "#0047AB",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    loginBtnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
    },

    name: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
    },
    email: {
        textAlign: "center",
        color: "#555",
        fontSize: 16,
        marginTop: 5,
    },
    phone: {
        textAlign: "center",
        color: "#555",
        fontSize: 16,
        marginTop: 5,
    },

    line: {
        height: 1,
        backgroundColor: "#ddd",
        marginVertical: 20,
    },

    option: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
    },
    optionText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 18,
    },
});
