export const calculatorQuantity = async (data) => {
	for (const q of data) {
		let totalQuantity = 0;
		for (const s of q.Stocks) {
			totalQuantity += s.quantity;
		}
		q.setDataValue("totalStockQuantity", totalQuantity);
	}
};
