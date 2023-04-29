const getConfig = () => ({
	headers: {
		Authorization: `JWT ${localStorage.getItem("token")}`,
	},
});

export default getConfig;
