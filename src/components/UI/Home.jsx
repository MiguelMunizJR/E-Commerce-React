import { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard.jsx";
import { scrollToTop } from "../../utils/scrollToTop";
import closeCartSlider from "../../utils/closeCartSlider.js";
import { ProductsLoading } from "../Loading";
import useProducts from "../../hooks/useProducts.js";

const Home = ({ isLogin }) => {
	const [filteredProducts, setFilteredProducts] = useState(null);
	const { products, productsCategories, loading } = useProducts();

	useEffect(() => {
		closeCartSlider();
		scrollToTop();
	}, [isLogin]);

	const searchAndFilterProducts = (evt, category) => {
		const { value } = evt.target;
		let productCat;
		closeCartSlider();
		//* Filtrado mediante el input search
		const filterSearchResult = products?.filter((item) =>
			item?.title.toLowerCase().includes(value.toLowerCase().trim())
		);

		//* Filtrado mediante categorias
		if (category !== "All") {
			productCat = filterSearchResult?.filter(
				(product) => product.category === category
			);
		} else {
			productCat = filterSearchResult;
		}

		setFilteredProducts(productCat);
	};

	return (
		<section className="home">
			<article className="home__products">
				<article className="home__search">
					<div className="search__div">
						<input
							type="text"
							id="search"
							placeholder="iPhone 14 Pro, Samsung Galaxy S23, Laptop Asus..."
							className="search__input"
							onChange={(evt) => searchAndFilterProducts(evt, "All")}
						/>
						<i className="fa-solid fa-magnifying-glass search__btn"></i>
					</div>
					<div className="search__categories-div">
						<h5>Categories</h5>
						<div className="search__categories-container">
							<button onClick={(evt) => searchAndFilterProducts(evt, "All")}>
                All
							</button>
							{productsCategories?.map((category, index) => (
								<button
									key={index}
									onClick={(event) => searchAndFilterProducts(event, category)}
								>
									{category}
								</button>
							))}
						</div>
					</div>
				</article>
				<article className="home__container">
					<h2 className="home__title">
            Products{" "}
						<small>{`${
							filteredProducts ? filteredProducts?.length : products?.length
						}/${products?.length}`}</small>
					</h2>
					<article className="products__container">
						{loading ? (
							<ProductsLoading />
						) : filteredProducts ? (
							filteredProducts?.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
								/>
							))
						) : (
							products?.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
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
