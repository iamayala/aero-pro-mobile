import moment from "moment"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import IconButton from "./IconButton"
import Tag from "./Tag"

type Props = {
	task: any
	onPress: () => void
}

const TaskCard = ({ task, onPress }: Props) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{ backgroundColor: "#FDF684", padding: 15, borderRadius: 25, marginBottom: 15 }}
		>
			<View style={{ marginBottom: 20 }}>
				<Text style={{ fontSize: 18, marginRight: 10 }}>
					{moment(task.start_datetime).format("dddd, MMM D YYYY h:mm A")}
				</Text>
				<Text style={{ fontSize: 35, marginTop: 5 }}>{task.activity_description}</Text>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Tag label={task.activity_type} />
			</View>
		</TouchableOpacity>
	)
}

export default TaskCard
