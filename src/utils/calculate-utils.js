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
