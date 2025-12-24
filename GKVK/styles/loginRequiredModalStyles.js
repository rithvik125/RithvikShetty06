import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        width: "85%",
        borderRadius: 20,
        backgroundColor: "white",
        paddingVertical: 32,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    close: {
        position: "absolute",
        top: 15,
        right: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginTop: 12,
    },
    subtitle: {
        textAlign: "center",
        marginTop: 8,
        fontSize: 16,
        color: "#666",
        paddingHorizontal: 10,
    },
    loginBtn: {
        marginTop: 25,
        backgroundColor: "#0047AB",
        paddingVertical: 12,
        width: "100%",
        borderRadius: 12,
        alignItems: "center",
    },
    loginBtnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});
