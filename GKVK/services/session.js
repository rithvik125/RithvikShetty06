// app/services/session.js
import * as SecureStore from "expo-secure-store";

export async function saveSession() {
    try {
        await SecureStore.setItemAsync("userToken", "logged_in");
    } catch (err) {
        console.log("Error saving session", err);
    }
}

export async function getSession() {
    try {
        return await SecureStore.getItemAsync("userToken");
    } catch (err) {
        console.log("Error reading session", err);
        return null;
    }
}

export async function clearSession() {
    try {
        await SecureStore.deleteItemAsync("userToken");
    } catch (err) {
        console.log("Error clearing session", err);
    }
}
