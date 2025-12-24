import { StyleSheet } from "react-native";

export default StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#fff",
    },

    headerTitle: {
        fontSize: 25,
        fontWeight: "700",
    },

    cropName: {
        fontSize: 19,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 20,
    },

    varietyCount: {
        fontSize: 17,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 4,
        color: "#000",
    },

    cardsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginHorizontal: 12,
        marginTop: 12,
    },

    card: {
        width: "31%",
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 6,
        elevation: 3,
        height: 260,
        borderWidth: 1,
        borderColor: "#ddd",
        overflow: "hidden",
    },

    cardImage: {
        width: "100%",
        height: 120,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    cardDetails: {
        padding: 8,
        alignItems: "center",
    },

    cardTitle: {
        fontWeight: "400",
        fontSize: 15,
        color: "#000",
        textAlign: "center",
    },

    cardSubtitle: {
        fontSize: 12,
        color: "#444",
        marginTop: 10,
    },

    cardPrice: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000",
        marginTop: 8,
        textAlign: "center",
    },
});
