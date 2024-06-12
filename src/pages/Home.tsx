import { NativeStackScreenProps } from "@react-navigation/native-stack"
import moment from "moment"
import { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import IconButton from "../components/IconButton"
import InfoItem from "../components/InfoItem"
import Screen from "../components/Screen"
import Tab from "../components/Tab"
import TaskCard from "../components/TaskCard"
import { useAuth } from "../hooks/use-auth"
import { RootStackParamList } from "../navigation"
import { AppDispatch, RootState } from "../store"
import { Task } from "../store/models/Task"

type Props = NativeStackScreenProps<RootStackParamList, "Home">

const tabs = [
	{ label: "scheduled", labelValue: "scheduled" },
	{ label: "in progress", labelValue: "in_progress" },
	{ label: "completed", labelValue: "completed" },
]

const Home = ({ navigation }: Props) => {
	const { user } = useSelector((state: RootState) => state.account)
	const { tasks } = useSelector((state: RootState) => state.task)

	const [tab, setTab] = useState(tabs[0])

	const auth = useAuth()
	const dispatch = useDispatch<AppDispatch>()

	const renderGreeting = () => {
		const now = new Date()
		const hour = now.getHours()

		if (hour >= 5 && hour < 12) {
			return "Good Morning"
		} else if (hour >= 12 && hour < 17) {
			return "Good Afternoon"
		} else {
			return "Good Evening"
		}
	}

	const handleLogout = () => {
		dispatch.account.logOut()
	}

	useEffect(() => {
		dispatch.task.fetchTasks(user?.id ?? 0)
	}, [])

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
					onPress={handleLogout}
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
					active={tab.labelValue}
					onPress={(value) => {
						setTab(value)
					}}
				/>
			</View>

			<FlatList
				showsVerticalScrollIndicator={false}
				data={tasks.filter((activities: any) => activities.status === tab.labelValue)}
				contentContainerStyle={{ paddingVertical: 20 }}
				keyExtractor={(item) => JSON.stringify(item)}
				renderItem={({ item }: { item: Task }) => {
					return (
						<TaskCard
							task={item}
							onPress={() => navigation.navigate("TaskDetail", { task: item })}
						/>
					)
				}}
			/>
		</Screen>
	)
}

export default Home
