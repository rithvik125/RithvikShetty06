export const SEEDS_URL = "https://691c2daa3aaeed735c8fd1bb.mockapi.io/FeaturedSeeds";

export async function getFeaturedSeeds() {
    try {
        const response = await fetch(SEEDS_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("SEEDS FETCH ERROR:", error);
        return [];
    }
}
