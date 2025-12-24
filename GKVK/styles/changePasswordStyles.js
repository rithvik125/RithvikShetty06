import { StyleSheet } from "react-native";

export const changePasswordStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
    },

    card: {
        backgroundColor: "#fff",
        margin: 15,
        padding: 20,
        borderRadius: 15,
        elevation: 4,
    },

    label: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 20,
    },

    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        paddingHorizontal: 12,
        marginTop: 6,
    },

    input: {
        paddingVertical: 12,
        fontSize: 16,
    },

    saveButton: {
        backgroundColor: "#0047FF",
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 30,
        alignSelf: "center",
        paddingHorizontal: 50,
    },

    saveText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

    error: {
        marginTop: 10,
        color: "red",
        fontSize: 14,
        fontWeight: "600",
    },

    success: {
        marginTop: 10,
        color: "green",
        fontSize: 14,
        fontWeight: "600",
    },
});
