import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    title: { fontSize: 22, fontWeight: "bold" },

    emptyView: { flex: 1, justifyContent: "center", alignItems: "center" },
    emptyText: { fontSize: 16, color: "#777" },

    card: {
        backgroundColor: "#f8f8f8",
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 12,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 15,
    },
    itemName: { fontSize: 16, fontWeight: "bold", width: "85%" },
    priceText: { marginTop: 4, color: "#555" },

    qtyRow: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "#0047AB",
        borderRadius: 10,
        width: 110,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
        paddingHorizontal: 10,
    },
    qtyBtn: { fontSize: 22, fontWeight: "bold", color: "#0047AB" },
    qtyValue: { fontSize: 18, fontWeight: "bold" },

    addMore: { alignSelf: "center", marginTop: 10 },
    addMoreText: { color: "#0047AB", fontWeight: "bold", fontSize: 16 },

    clearCartBtn: {
        width: "90%",
        backgroundColor: "#0047AB",
        alignSelf: "center",
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
    },
    clearText: { color: "#fff", fontWeight: "bold", textAlign: "center" },

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 15,
    },
    totalLabel: { fontSize: 16, fontWeight: "600" },
    totalValue: { fontSize: 16, fontWeight: "bold", color: "#0047AB" },

    orderBtn: {
        backgroundColor: "#0047AB",
        width: "100%",
        marginTop: 15,
        paddingVertical: 18,
    },
    orderText: { textAlign: "center", color: "#fff", fontSize: 18, fontWeight: "bold" },

    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    modalText: { fontSize: 15, color: "#555", textAlign: "center", marginBottom: 20 },

    modalButtons: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
    },
    modalButtonYES: {
        backgroundColor: "#0047AB",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    modalButtonNO: {
        backgroundColor: "#0047AB",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    btnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
