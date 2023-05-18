export const Loading = () => {
	return (
		<section className="loading">
			<div className="loading__spinner"></div>
		</section>
	);
};

export const ProductsLoading = () => {
	return (
		<section className="products__loading">
			<div className="products__loading-spinner"></div>
		</section>
	);
};

export const CartLoading = () => {
	return (
		<section className="cart__loading">
			<div className="cart__loading-spinner"></div>
		</section>
	);
};

export const OrdersLoading = () => {
	return (
		<section className="orders__loading">
			<div className="orders__loading-spinner"></div>
		</section>
	);
};

export default Loading;
