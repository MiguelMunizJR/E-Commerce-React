import useProducts from "../hooks/useProducts";

const Loading = () => {
	const { loading } = useProducts();

	if (loading) {
		return (
			<section className="loading">
				<div className="loading__spinner"></div>
			</section>
		);
	}
};

export default Loading;
