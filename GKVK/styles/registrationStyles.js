import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.12)", // uniform blur layer
        paddingHorizontal: 20,
        paddingTop: 50,
    },


    absoluteBlur: {
        ...StyleSheet.absoluteFillObject,
    },

    keyboardView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginBottom: 20,
    },
    backButton: {
        position: "absolute",
        left: 0,
        padding: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#0047AB",
    },

    formContainer: {
        backgroundColor: "transparent",
        padding: 10,
        marginTop: 10,
        marginBottom: 40,
    },

    extraForm: {
        marginTop: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
        marginBottom: 8,
    },
    input: {
        height: 48,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "rgba(255,255,255,0.92)", // slightly opaque to stay readable
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#0047AB",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    captchaContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 20,
    },
    captchaBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#dfe4ff",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
    },
    captchaText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0047AB",
        marginRight: 8,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 14,
        color: "#000",
        flexShrink: 1,
    },
    errorText: {
        color: "#FF3B30",
        fontSize: 14,
        marginBottom: 8,
    },
});
