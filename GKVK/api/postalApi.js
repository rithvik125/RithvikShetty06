// api/postalApi.js
import axios from "axios";

/**
 * Fetch postal details from Indian Postal API using PIN code.
 * @param {string} pin - 6-digit Indian PIN code
 * @returns {Promise<{State: string, District: string, PostOffices: string[]}>}
 */
export const fetchPostalDetails = async (pin) => {
    if (!pin || pin.length !== 6) {
        throw new Error("Invalid PIN: must be 6 digits.");
    }

    try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
        const data = response.data[0];

        if (data.Status === "Success" && data.PostOffice && data.PostOffice.length > 0) {
            const { State, District } = data.PostOffice[0];
            const PostOffices = data.PostOffice.map((po) => po.Name);
            return { State, District, PostOffices };
        } else {
            throw new Error("Invalid PIN: No matching location found.");
        }
    } catch (error) {
        console.error("Postal API Error:", error.message);
        throw new Error("Failed to fetch postal details. Check your connection or PIN code.");
    }
};
