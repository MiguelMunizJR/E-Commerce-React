const Loading = ({ isLoading }) => {
	if (isLoading) {
		return (
			<section className="loading">
				<div className="loading__spinner"></div>
			</section>
		);
	}
};

export default Loading;
