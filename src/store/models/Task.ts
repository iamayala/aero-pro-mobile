import { createModel } from "@rematch/core"
import { RootModel } from "."
import api from "../../api"

export interface Task {
	activity_description: string
	activity_type: string
	aircraft_id: number
	aircraft_manufacturer: string
	aircraft_model: string
	created_at: string
	end_datetime: string
	id: number
	issues_resolved: string | null
	parts_replaced: PartsReplaced[] | null
	priority: number
	registration_number: string
	start_datetime: string
	status: string
	technician_email: string
	technician_id: number
	technician_name: string
	updated_at: string
}

export interface PartsReplaced {
	created_at: string
	description: string
	id: number
	location: string
	manufacturer: string
	part_name: string
	part_number: string
	quantity: number
	status: string
	unit_price: string
	updated_at: string
}

export interface TaskState {
	tasks: Task[]
	loading: boolean
}

const initialState: TaskState = {
	tasks: [],
	loading: false,
}

export const task = createModel<RootModel>()({
	state: initialState,
	reducers: {
		setTasks: (state, payload: Task[]) => ({
			...state,
			tasks: payload,
		}),
		setLoading: (state, payload: boolean) => ({
			...state,
			loading: false,
		}),
	},

	effects: (dispatch) => {
		const { task } = dispatch
		return {
			fetchTasks: async (payload: number) => {
				task.setLoading(true)
				api.maintenance
					.getByTechnicianId(payload)
					.then((response) => {
						if (response.status === 200) {
							task.setTasks(response.data)
							return response.data
						}
					})
					.catch((error) => {
						throw new Error(error)
					})
					.finally(() => {
						task.setLoading(true)
					})
			},
		}
	},
})
