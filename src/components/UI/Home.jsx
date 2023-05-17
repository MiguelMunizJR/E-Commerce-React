import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../products/ProductCard.jsx";
import { scrollToTop } from "../../utils/scrollToTop";
import useProducts from "../../hooks/useProducts.js";
import Loading from "../Loading.jsx";
import { ROUTES_PATH } from "../../consts.js";
import closeCartSlider from "../../utils/closeCartSlider.js";

const Home = ({ isLogin }) => {
	const navigate = useNavigate();
	// const [productsCategory, setProductsCategory] = useState(null);
	// const [category, setCategory] = useState();
	const [searchResult, setSearchResult] = useState(null);
	const { products } = useProducts();

	useEffect(() => {
		closeCartSlider();
		scrollToTop();
	}, []);

	// const productCategories = {
	// 	Computers: products?.filter((item) => {
	// 		if (item?.category.name === "Computers") {
	// 			return item;
	// 		}
	// 	}),
	// 	"Smart TV": products?.filter((item) => {
	// 		if (item?.category.name === "Smart TV") {
	// 			return item;
	// 		}
	// 	}),
	// 	Smartphones: products?.filter((item) => {
	// 		if (item?.category.name === "Smartphones") {
	// 			return item;
	// 		}
	// 	}),
	// };

	const handleSearchItem = (product) => {
		navigate(`${ROUTES_PATH.PRODUCTS}/${product.id}`);
	};

	const searchProducts = (event) => {
		event.preventDefault();
		const searchContainer = document.querySelector(".search__container")?.style;
		const { value } = event.target;

		const filterSearchResult = products?.filter((item) => item?.title.toLowerCase().includes(value.toLowerCase().trim()));

		if (value.trim() === "" || filterSearchResult?.length === 0) {
			searchContainer.display = "none";
			return;
		} else {
			searchContainer.display = "flex";
		}

		setSearchResult(filterSearchResult);
	};

	// const filterPrice = (e) => {
	// 	e.preventDefault();
	// 	const from = e.target.from.value;
	// 	const to = e.target.to.value;

	// const productsFilterPrice = products?.filter((product) => {
	// 	if (parseInt(product.price) >= from && parseInt(product.price) <= to) {
	// 		return product;
	// 	}
	// });
	// if (from == "" || to == "") {
	// 	setProductsCategory(products);
	// } else {
	// 	setProductsCategory(productsFilterPrice);
	// }
	// 	e.target.from.value = "";
	// 	e.target.to.value = "";
	// 	scrollToTop();
	// };

	return (
		<section className="home">
			<article className="home__products">
				<form className="home__search" onChange={searchProducts}>
					<div className="search__div">
						<input
							type="text"
							id="search"
							placeholder="iPhone 14 Pro, Samsung Galaxy S23, Laptop Asus... "
							className="search__input"
						/>
						<i className="fa-solid fa-magnifying-glass search__btn"></i>
					</div>
					<section className="search__container">
						<ul className="search__list">
							{searchResult?.map((product) => (
								<li
									className="search__item"
									key={product.id}
									onClick={() => handleSearchItem(product)}
								>
									{product.title}
								</li>
							))}
						</ul>
					</section>
				</form>
				<article className="home__container">
					<h2 className="home__title">Products</h2>
					<article className="products__container">
						{<Loading />}
						{products?.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								isLogin={isLogin}
							/>
						))}
					</article>
				</article>
			</article>
		</section>
	);
};

export default Home;
