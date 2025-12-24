import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
    },

    card: {
        marginHorizontal: 15,
        marginTop: 12,
        padding: 18,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 12,
    },

    fieldContainer: {
        marginBottom: 12,
    },
    fieldLabel: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 2,
    },
    fieldValue: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },

    line: {
        height: 1,
        backgroundColor: "#D1D5DB",
        marginVertical: 15,
    },

    button: {
        backgroundColor: "#0047FF",
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
});
