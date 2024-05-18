export interface Maintenance {
	id: number
	activity_type: string
	activity_description: string
	aircraft_id: number
	technician_id: string
	start_datetime: string
	end_datetime: string
	parts_replaced: string[]
	issues_resolved: string
	status: string
	created_at: string
	updated_at: string
	aircraft_manufacturer: string
	aircraft_model: string
	registration_number: string
	technician_name: string
	technician_email: string
}
