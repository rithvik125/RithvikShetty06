// app/api/authApi.js

export const BASE_URL = "https://691c2daa3aaeed735c8fd1bb.mockapi.io/GKVK";

// REGISTER USER → POST API
export async function registerUser(userData) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        return { ok: response.ok, data: result };
    } catch (error) {
        console.log("REGISTER API ERROR:", error);
        return { ok: false, data: null };
    }
}

// GET ALL USERS → GET API (for login)
export async function getAllUsers() {
    try {
        const response = await fetch(BASE_URL);
        const users = await response.json();
        return users;
    } catch (error) {
        console.log("GET USERS ERROR:", error);
        return [];
    }
}
