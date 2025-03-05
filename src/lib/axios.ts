import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://reminder-be.onrender.com",
});

export default apiClient;
