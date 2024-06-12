import { NativeStackScreenProps } from "@react-navigation/native-stack"
import moment from "moment"
import React from "react"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import api from "../api"
import Button from "../components/Button"
import Header from "../components/Header"
import IconButton from "../components/IconButton"
import InfoHolder from "../components/InfoHolder"
import Screen from "../components/Screen"
import Tag from "../components/Tag"
import { RootStackParamList } from "../navigation"
import { AppDispatch, RootState } from "../store"

type Props = NativeStackScreenProps<RootStackParamList, "TaskDetail">

const TaskDetail = ({ navigation, route }: Props) => {
	const { task } = route.params
	const { user } = useSelector((state: RootState) => state.account)
	const dispatch = useDispatch<AppDispatch>()

	const updateTask = () => {
		const payload = {
			...task,
			status: "in_progress",
		}

		api.maintenance
			.put(payload, task.id)
			.then((response) => {
				if (response.status === 200) {
					dispatch.task.fetchTasks(user?.id ?? 0)
					navigation.navigate("Home")
				}
			})
			.catch((error) => {
				new Error(error.message)
			})
	}
	return (
		<Screen color="#FDF684" style={{ paddingHorizontal: 25 }}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<IconButton icon="chevron-left" onPress={() => navigation.goBack()} type="light" />
			</View>

			<View style={{ flexDirection: "row", marginTop: 20, marginBottom: 10, gap: 10 }}>
				<Tag label={task.activity_type} />
				<Tag
					label={
						task.priority === 1
							? "High Priority"
							: task.priority === 2
							? "Medium Priority"
							: task.priority === 3
							? "Low Priority"
							: "No Priority"
					}
				/>
			</View>

			<Header header={task.activity_description} color="#000000" />

			<View style={{ marginBottom: 30 }}>
				<InfoHolder
					label="Aircraft Details"
					header={task.aircraft_manufacturer + " " + task.aircraft_model}
				/>
			</View>

			<InfoHolder label="Description" subHeader={task.activity_description} />

			<View style={{ marginTop: 30 }}>
				<InfoHolder
					label="Time Left"
					header={moment(task.start_datetime).fromNow()}
					subHeader={moment(task.start_datetime).format("dddd, MMM D YYYY h:mm A")}
				/>
			</View>

			<View style={{ marginTop: 30 }}>
				<InfoHolder
					label="Created"
					subHeader={`${moment(task.created_at).format("dddd, MMM D YYYY h:mm A")}`}
				/>
			</View>

			<View style={{ flex: 1 }} />

			{task.status !== "completed" && (
				<View style={{ marginBottom: 15 }}>
					<Button
						label={
							task.status === "scheduled"
								? "Start Task"
								: task.status === "in_progress"
								? "Finish Task"
								: ""
						}
						onPress={() =>
							task.status === "scheduled"
								? updateTask()
								: task.status === "in_progress"
								? navigation.navigate("Checkout", { task })
								: {}
						}
						type="light"
					/>
				</View>
			)}
		</Screen>
	)
}

export default TaskDetail
