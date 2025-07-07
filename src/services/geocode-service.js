import node_geocoder from "node-geocoder";
import haversine from "haversine";
import db from "../models/index.js";

const options = {
	// provider: "openstreetmap",
	provider: "locationiq",
	apiKey: process.env.loca_api_key,
};
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const geocoder = node_geocoder(options);

export const getCoordinates = async (address) => {
	try {
		// tìm kiếm tọa độ có sẵn
		const cached = await db.Address_cache.findOne({ where: { address } });
		if (cached) {
			return { latitude: cached.latitude, longitude: cached.longitude };
		}
		const res = await geocoder.geocode(address);
		if (res.length > 0) {
			const coords = { latitude: res[0].latitude, longitude: res[0].longitude };
			// Lưu lại tọa độ mới
			await db.Address_cache.create({
				address,
				latitude: coords.latitude,
				longitude: coords.longitude,
			});
			return coords;
		}
		return null;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const calculateDistance = async (home, stock) => {
	const addrHome = await getCoordinates(home);
	await delay(200);
	const addrStock = await getCoordinates(stock);
	const distance = haversine(addrHome, addrStock);
	return distance;
};
export const calculateShippingFee = async (userAddress, warehouseAddress) => {
	const distance = await calculateDistance(userAddress, warehouseAddress); // đơn vị km
	if (distance <= 50) return 19000;
	if (distance <= 200) return 29000;
	return 39000;
};
