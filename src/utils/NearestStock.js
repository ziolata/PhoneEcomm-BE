import { getCoordinates } from "../utils/nodegeocoder";
import haversine from "haversine";

export const Nearest = async (home, stock) => {
	const addrHome = await getCoordinates(home);
	const addrStock = await getCoordinates(stock);
	const distance = haversine(addrHome, addrStock);
	return distance;
};
