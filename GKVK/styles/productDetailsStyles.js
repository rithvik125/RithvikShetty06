import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    headerTitle: { fontSize: 20, fontWeight: "700" },

    swiper: { height: 240 },
    mainImage: {
        width: "90%",
        height: 210,
        borderRadius: 12,
        alignSelf: "center",
        marginTop: 10,
    },
    dot: { backgroundColor: "#ccc", width: 8, height: 8 },
    activeDot: { backgroundColor: "#0047AB", width: 8, height: 8 },

    thumbnailContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        marginTop: 10,
    },
    thumbnail: {
        width: 55,
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    selectedThumbnail: {
        borderWidth: 3,
        borderColor: "#0047AB",
    },

    productName: {
        fontSize: 22,
        fontWeight: "700",
        marginTop: 3,
        paddingHorizontal: 15,
    },
    priceText: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 1,
        paddingHorizontal: 15,
    },

    detailsContainer: {
        paddingHorizontal: 15,
        marginTop: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginTop: 6,
    },
    sectionContent: {
        fontSize: 14,
        marginTop: 3,
        color: "#555",
    },

    monthsTagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 3,
    },
    monthTag: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#0047AB",
        backgroundColor: "#0047AB22",
    },
    monthText: {
        color: "#0047AB",
        fontSize: 14,
        fontWeight: "600",
    },

    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    qtyContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 2,
        borderColor: "#0047AB",
        borderRadius: 10,
        width: "40%",
        height: 40,
        paddingHorizontal: 15,
    },
    qtyBtn: {
        fontSize: 22,
        fontWeight: "700",
        color: "#0047AB",
    },
    qtyValue: {
        fontSize: 20,
        fontWeight: "700",
    },

    addCartBtn: {
        width: "40%",
        height: 40,
        borderWidth: 2,
        borderColor: "#0047AB",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    addedToCartBtn: {
        backgroundColor: "#0047AB",
        borderWidth: 0,
    },
    addCartText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0047AB",
    },
    addedCartText: { color: "#fff" },

    stockText: {
        textAlign: "center",
        marginTop: 12,
        color: "#555",
        fontWeight: "600",
    },

    blueBox: {
        backgroundColor: "#0047AB",
        paddingVertical: 12,
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
        marginTop: 12,
    },
    blueBoxText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "700",
    },

    stateText: {
        fontSize: 15,
        marginTop: 6,
    },

    bottomContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 12,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#ddd",
        alignItems: "center",
    },
    bottomCartBtn: {
        width: "100%",
        backgroundColor: "#0047AB",
        paddingVertical: 14,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomCartText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700",
    },
});
