import { NativeStackScreenProps } from "@react-navigation/native-stack"
import moment from "moment"
import React from "react"
import { View } from "react-native"
import Button from "../components/Button"
import Header from "../components/Header"
import IconButton from "../components/IconButton"
import InfoHolder from "../components/InfoHolder"
import Screen from "../components/Screen"
import Tag from "../components/Tag"
import { RootStackParamList } from "../navigation"

type Props = NativeStackScreenProps<RootStackParamList, "TaskDetail">

const TaskDetail = ({ navigation, route }: Props) => {
	const { task } = route.params
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

			<View style={{ flexDirection: "row", marginTop: 20, marginBottom: 10 }}>
				<Tag label={task.activity_type} />
				<View style={{ flex: 1 }} />
			</View>

			<Header header={task.activity_description} color="#000000" />

			<View style={{ marginBottom: 30 }}>
				<InfoHolder
					label="Time Left"
					header={moment(task.start_datetime).fromNow()}
					subHeader={moment(task.start_datetime).format("dddd, MMM D YYYY h:mm A")}
				/>
			</View>

			<InfoHolder label="Additional Description" subHeader={task.activity_description} />

			<View style={{ marginTop: 30 }}>
				<InfoHolder
					label="Created"
					subHeader={`${moment(task.created_at).format("dddd, MMM D YYYY h:mm A")}`}
				/>
			</View>

			<View style={{ flex: 1 }} />

			<View style={{ marginBottom: 15 }}>
				<Button label="Mark as Completed" onPress={() => {}} type="light" />
			</View>
		</Screen>
	)
}

export default TaskDetail
