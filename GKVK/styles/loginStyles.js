import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    absoluteBlur: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 25,
        paddingTop: 90,
    },
    logo: {
        width: 130,
        height: 130,
        marginBottom: 10,
        backgroundColor: "transparent", // ensure no background added by code
        borderRadius: 65, // makes sure corners are rounded if image ever has edge pixels
        overflow: "hidden",
    },

    welcomeText: {
        fontSize: 28,
        fontWeight: "700",
        color: "#0047AB",
        marginBottom: 4,
        textAlign: "center",
        fontFamily: Platform.select({ ios: "System", android: "Roboto" }),
    },
    subtitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#0047AB",
        marginBottom: 40, // moved it a bit lower
        textAlign: "center",
        fontFamily: Platform.select({ ios: "System", android: "Roboto" }),
    },
    input: {
        width: "100%",
        height: 52,
        borderColor: "#ccc",
        borderWidth: 1.2,
        borderRadius: 10,
        paddingHorizontal: 16,
        backgroundColor: "rgba(255,255,255,0.95)",
        fontSize: 17,
        marginBottom: 25,
        fontFamily: Platform.select({ ios: "System", android: "Roboto" }),
    },
    passwordWrapper: {
        width: "100%",
        position: "relative",
    },
    eyeIcon: {
        position: "absolute",
        right: 15,
        top: 14,
    },
    button: {
        backgroundColor: "#0047AB",
        width: "50%", // half width
        alignSelf: "center",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 25,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        fontFamily: Platform.select({ ios: "System", android: "Roboto" }),
    },
    // ⚙️ Updated: Forgot password + Login OTP on one line
    linksRow: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginTop: 10,
    },
    forgotText: {
        color: "#000",
        fontSize: 17,
        fontFamily: Platform.select({ ios: "System", android: "Roboto" }),
    },
    loginOtpText: {
        color: "#0047AB",
        fontWeight: "700",
        fontSize: 17,
        marginLeft: 5,
        fontFamily: Platform.select({ ios: "System", android: "Roboto" }),
    },
    bottomLinks: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 22,
    },
    bottomText: {
        color: "#000",
        fontSize: 17,
        fontFamily: Platform.select({ ios: "System", android: "Roboto" }),
    },
    linkText: {
        color: "#0047AB",
        fontWeight: "700",
        fontSize: 17,
        fontFamily: Platform.select({ ios: "System", android: "Roboto" }),
    },
    errorText: {
        color: "#FF3B30",
        fontSize: 15,
        alignSelf: "flex-start",
        marginBottom: 10,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
    },
});
