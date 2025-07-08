// helpers/paginationHelper.js
export const mapPaginateResult = (page, paginateResult) => {
	const { docs, ...pagination } = paginateResult;

	return {
		items: docs,
		...pagination,
		prev: page > 1 ? page - 1 : null,
		next: page < pagination.pages ? page + 1 : null,
		hasPrev: page > 1,
		hasNext: page < pagination.pages,
	};
};
