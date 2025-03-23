import db from "../models";

export const createOption = async (data) => {
	try {
		const optionExist = await db.Option.findOne({
			where: {
				name: data.name,
			},
		});
		if (optionExist) {
			throw { status: 400, message: "Tên Option đã tồn tại" };
		}
		const response = await db.Option.create(data);
		return { data: response };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const updateOption = async (data) => {
	try {
		const existingOption = await db.Option.findOne({
			where: {
				id: data.id,
			},
		});
		if (!existingOption) {
			throw { status: 404, message: "Option không tồn tại không thể thêm" };
		}
		if (existingOption.name === data.name) {
			throw { status: 400, message: "Tên option đã tồn tại" };
		}
		await db.Option.update(
			{
				name: data.name,
			},
			{
				where: {
					id: data.id,
				},
			},
		);
		return { message: "Cập nhật thành công" };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const getAllOption = async () => {
	try {
		const response = await db.Option.findAll();
		return { data: response };
	} catch (error) {
		console.log(error);
	}
};
