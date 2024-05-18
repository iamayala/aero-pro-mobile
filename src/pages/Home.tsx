import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import moment from "moment"
import { useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import Header from "../components/Header"
import IconButton from "../components/IconButton"
import InfoItem from "../components/InfoItem"
import Screen from "../components/Screen"
import Tab from "../components/Tab"
import TaskCard from "../components/TaskCard"
import { RootStackParamList } from "../navigation"

type Props = NativeStackScreenProps<RootStackParamList, "Home">

const Home = ({ navigation }: Props) => {
	const [tab, setTab] = useState("pending")

	const tabs = [
		{ label: "pending", labelValue: 1 },
		{ label: "completed", labelValue: 0 },
	]

	const renderGreeting = () => {
		const now = new Date()
		const hour = now.getHours()

		if (hour >= 5 && hour < 12) {
			return "Good Morning"
		} else if (hour >= 12 && hour < 18) {
			return "Good Afternoon"
		} else {
			return "Good Evening"
		}
	}

	return (
		<Screen color="#121C2D" style={{ paddingHorizontal: 25 }}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<IconButton
					icon="user"
					onPress={() => navigation.navigate("Profile")}
					type="dark"
				/>
				<IconButton
					icon="log-out"
					onPress={() => navigation.navigate("Login")}
					type="dark"
					// hasAlert
				/>
			</View>

			<View style={{ marginTop: 20 }}>
				<Header header={renderGreeting()} />
				<InfoItem
					header={`Today's ${moment().format("dddd")}`}
					subHeader={moment().format("dddd, MMM D YYYY h:mm A")}
					align="LEFT"
				/>
				<Tab
					style={{ marginTop: 20 }}
					tabs={tabs}
					active={tab}
					onPress={(value) => setTab(value)}
				/>
			</View>

			{tab === "pending" && (
				<FlatList
					data={[
						{
							id: 1,
							activity_type: "maintenance",
							activity_description: "Routine maintenance check",
							aircraft_id: 1,
							technician_id: "technician1",
							start_datetime: "2024-05-10T06:00:00.000Z",
							end_datetime: "2024-05-10T10:00:00.000Z",
							parts_replaced: ["part1", "part2"],
							issues_resolved: "No issues found",
							status: "completed",
							created_at: "2024-05-10T18:36:52.000Z",
							updated_at: "2024-05-10T18:43:49.000Z",
							aircraft_manufacturer: "Boeing",
							aircraft_model: "737",
							registration_number: "ABC122",
							technician_name: "james jr. cameron",
							technician_email: "jamescameron@aero.pro",
						},
					]}
					contentContainerStyle={{ paddingVertical: 20 }}
					keyExtractor={(item) => JSON.stringify(item)}
					renderItem={({ item }) => {
						return (
							<TaskCard
								task={item}
								onPress={() => navigation.navigate("TaskDetail", { task: item })}
							/>
						)
					}}
				/>
			)}
		</Screen>
	)
}

export default Home
