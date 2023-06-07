import { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard.jsx";
import { scrollToTop } from "../../utils/scrollToTop";
import closeCartSlider from "../../utils/closeCartSlider.js";
import { ProductsLoading } from "../Loading";
import useProducts from "../../hooks/useProducts.js";

const Home = ({ isLogin }) => {
	const [filteredProducts, setFilteredProducts] = useState(null);
	const { products, loading } = useProducts();

	useEffect(() => {
		closeCartSlider();
		scrollToTop();
	}, []);

	const searchProducts = (event) => {
		event.preventDefault();
		const { value } = event.target;

		const filterSearchResult = products?.filter((item) =>
			item?.title.toLowerCase().includes(value.toLowerCase().trim())
		);

		setFilteredProducts(filterSearchResult);
	};

	return (
		<section className="home">
			<article className="home__products">
				<form className="home__search" onSubmit={(evt) => evt.preventDefault()} onChange={searchProducts}>
					<div className="search__div">
						<input
							type="text"
							id="search"
							placeholder="iPhone 14 Pro, Samsung Galaxy S23, Laptop Asus... "
							className="search__input"
						/>
						<i className="fa-solid fa-magnifying-glass search__btn"></i>
					</div>
				</form>
				<article className="home__container">
					<h2 className="home__title">Products</h2>
					<article className="products__container">
						{loading ? (
							<ProductsLoading />
						) : filteredProducts ? (
							filteredProducts?.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									isLogin={isLogin}
								/>
							))
						) : (
							products?.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									isLogin={isLogin}
								/>
							))
						)}
					</article>
				</article>
			</article>
		</section>
	);
};

export default Home;
