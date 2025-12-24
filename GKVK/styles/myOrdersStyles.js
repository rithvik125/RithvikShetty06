import { StyleSheet } from "react-native";

export const myOrdersStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
    },

    headerTitle: { fontSize: 20, fontWeight: "700" },

    empty: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 18,
        fontWeight: "600",
    },

    /* TABLE */
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#E8EBFF",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#C7CCE8",
    },

    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
        paddingVertical: 12,
    },

    /* COLUMN WIDTH + BORDER */
    th: {
        width: 150,
        textAlign: "center",
        fontWeight: "700",
        fontSize: 14,
        color: "#111",
        borderRightWidth: 1,
        borderColor: "#DADFEA",
        paddingVertical: 4,
    },

    td: {
        width: 150,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "600",
        color: "#444",
        borderRightWidth: 1,
        borderColor: "#DADFEA",
        paddingVertical: 4,
    },

    orderNo: {
        color: "#0061FF",
        textDecorationLine: "underline",
    },

    status: {
        color: "#FF9F00",
        fontWeight: "700",
    },
});
