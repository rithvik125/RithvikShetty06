import { StyleSheet } from "react-native";

export const editProfileStyles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    container: { padding: 20 },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingBottom: 12,
        marginBottom: 15,
    },

    backButton: { padding: 5 },
    headerTitle: { fontSize: 20, fontWeight: "bold" },

    formCard: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        marginTop: 10,
        marginBottom: 30,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 5,
    },

    label: { marginTop: 15, fontWeight: "700", fontSize: 16 },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginTop: 5,
    },

    saveButton: {
        backgroundColor: "#0047AB",
        paddingVertical: 14,
        paddingHorizontal: 60,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 25,
    },

    saveText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },

    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },

    loaderText: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: "600",
        color: "#0047AB",
    },
});
