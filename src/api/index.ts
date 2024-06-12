import axios from "axios"
import { Task } from "../store/models/Task"

export const API_BASE_URL = "http://192.168.0.112:8080" // Adjust the base URL as needed

const api = {
	auth: {
		login: (payload: { password: string; email: string }) =>
			axios.post(`${API_BASE_URL}/auth/login`, payload),
		updatePassword: (payload: { id: number; currentPassword: string; newPassword: string }) =>
			axios.put(`${API_BASE_URL}/auth/update-password`, payload),
	},

	user: {
		getOne: (id: number) => axios.get(`${API_BASE_URL}/user/${id}`),
	},

	// aircraft: {
	// 	post: (payload) => axios.post(`${API_BASE_URL}/aircraft`, payload),
	// 	get: () => axios.get(`${API_BASE_URL}/aircraft/`),
	// 	getOne: (id) => axios.get(`${API_BASE_URL}/aircraft/${id}`),
	// 	put: (payload, id) => axios.put(`${API_BASE_URL}/aircraft/${id}`, payload),
	// 	delete: (id) => axios.delete(`${API_BASE_URL}/aircraft/${id}`),
	// },

	// document: {
	// 	post: (payload) => axios.post(`${API_BASE_URL}/document`, payload),
	// 	get: () => axios.get(`${API_BASE_URL}/document/`),
	// 	getOne: (id) => axios.get(`${API_BASE_URL}/document/${id}`),
	// 	put: (payload, id) => axios.put(`${API_BASE_URL}/document/${id}`, payload),
	// 	delete: (id) => axios.delete(`${API_BASE_URL}/document/${id}`),
	// },

	// flight: {
	// 	post: (payload) => axios.post(`${API_BASE_URL}/flight`, payload),
	// 	get: () => axios.get(`${API_BASE_URL}/flight/`),
	// 	getOne: (id) => axios.get(`${API_BASE_URL}/flight/${id}`),
	// 	put: (payload, id) => axios.put(`${API_BASE_URL}/flight/${id}`, payload),
	// 	delete: (id) => axios.delete(`${API_BASE_URL}/flight/${id}`),
	// },

	maintenance: {
		getByTechnicianId: (id: number) =>
			axios.get(`${API_BASE_URL}/maintenance/technician/${id}`),
		put: (payload: Task, id: number) => axios.put(`${API_BASE_URL}/maintenance/${id}`, payload),
	},

	part: {
		get: () => axios.get(`${API_BASE_URL}/part/`),
	},
}

export default api
