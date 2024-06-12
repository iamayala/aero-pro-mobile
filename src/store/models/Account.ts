import { createModel } from "@rematch/core"
import { RootModel } from "./index"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../api"

export interface User {
	id?: number
	username: string
	email: string
	role: "admin" | "technician" | "staff"
	full_name: string
	status: boolean
}

export interface AccountState {
	registered?: Boolean
	user?: User
}

const initialState: AccountState = {
	registered: false,
	user: {
		full_name: "",
		email: "",
		role: "technician",
		status: false,
		username: "",
	},
}

const clearAsyncStorage = async () => {
	AsyncStorage.clear()
}

export const account = createModel<RootModel>()({
	state: initialState,
	reducers: {
		setRegistered: (state, payload: boolean) => ({
			...state,
			registered: payload,
		}),
		setUser: (state, payload: User) => ({
			...state,
			user: payload,
		}),
	},

	effects: (dispatch) => {
		const { account } = dispatch
		return {
			authenticate: async (payload: { password: string; email: string }) => {
				api.auth
					.login(payload)
					.then((response) => {
						if (response.status === 200) {
							account.setUser(response.data.user)
							account.setRegistered(true)
							return response
						}
					})
					.catch((error) => {
						throw new Error(error)
					})
			},
			async logOut() {
				clearAsyncStorage()
				account.setRegistered(false)
				account.setUser({} as User)
				dispatch({ type: "RESET_APP" })
			},
		}
	},
})
