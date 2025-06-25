import node_geocoder from "node-geocoder";
import haversine from "haversine";
const options = {
	provider: "openstreetmap", // Dùng dịch vụ OpenStreetMap miễn phí
};
const geocoder = node_geocoder(options);
export const getCoordinates = async (address) => {
	try {
		const res = await geocoder.geocode(address);
		if (res.length > 0) {
			console.log(
				`Tọa độ của "${address}": Latitude: ${res[0].latitude}, Longitude: ${res[0].longitude}`,
			);
			return { latitude: res[0].latitude, longitude: res[0].longitude };
		}
		console.log(`Không tìm thấy tọa độ cho địa chỉ: "${address}"`);
		return null;
	} catch (error) {
		console.error("Lỗi:", error.message);
	}
};
export const calculateDistance = async (home, stock) => {
	const addrHome = await getCoordinates(home);
	const addrStock = await getCoordinates(stock);
	const distance = haversine(addrHome, addrStock);
	return distance;
};

export const calculatorQuantity = async (data) => {
	for (const q of data) {
		let totalQuantity = 0;
		for (const p of q.Product_variants) {
			if (p.Inventories) {
				for (const i of p.Inventories) {
					totalQuantity += i.quantity;
					p.setDataValue("totalQuantity", totalQuantity);
				}
			}
		}
	}
};
export const calculatorQuantityOnePrd = async (data) => {
	let totalQuantity = 0;
	for (const p of data.Product_variants) {
		if (p.Inventories) {
			for (const i of p.Inventories) {
				totalQuantity += i.quantity;
				p.setDataValue("totalQuantity", totalQuantity);
			}
		}
	}
};
export const calculatorProductVarianQuantity = async (data) => {
	let totalQuantity = 0;
	for (const p of data.Product_variants) {
		if (p.Inventories) {
			for (const i of p.Inventories) {
				totalQuantity += i.quantity;
				p.setDataValue("totalQuantity", totalQuantity);
			}
		}
	}
};
