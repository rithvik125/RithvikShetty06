import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    background: { flex: 1 },
    scrollContainer: { paddingBottom: 100 },

    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.97)",
        paddingHorizontal: 10,
        paddingTop: 45,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    leftLogo: { width: 60, height: 60 },
    rightLogo: { width: 65, height: 65 },

    headerTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 6,
    },
    universityName: {
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
        color: "#000",
        textTransform: "uppercase",
    },
    subText: {
        fontSize: 12,
        color: "#000",
        textAlign: "center",
        fontWeight: "500",
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 15,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: "#000",
    },

    sliderContainer: {
        height: 180,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 10,
        overflow: "hidden",
    },
    sliderImage: {
        width: width - 40,
        height: 180,
        borderRadius: 10,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
        marginLeft: 20,
        marginTop: 25,
    },

    cardsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginHorizontal: 12,
        marginTop: 12,
    },
    card: {
        width: "31%",
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: 10,
        marginVertical: 10,
        overflow: "hidden",
        elevation: 3,
        height: 230,
    },
    cardImage: { width: "100%", height: 120 },

    cardContent: { padding: 8, alignItems: "center" },
    cardTitle: {
        fontWeight: "700",
        fontSize: 13,
        color: "#000",
        textAlign: "center",
    },
    cardSubtitle: { fontSize: 12, color: "#444" },
});
