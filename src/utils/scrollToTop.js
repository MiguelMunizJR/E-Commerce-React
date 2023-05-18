export const scrollToTop = () => {
	const container = document.querySelector("*");
	container?.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};