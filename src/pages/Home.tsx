import AsyncStorage from "@react-native-async-storage/async-storage"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import moment from "moment"
import { useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import api from "../api"
import Header from "../components/Header"
import IconButton from "../components/IconButton"
import InfoItem from "../components/InfoItem"
import Screen from "../components/Screen"
import Tab from "../components/Tab"
import TaskCard from "../components/TaskCard"
import { useAuth } from "../hooks/use-auth"
import { RootStackParamList } from "../navigation"

type Props = NativeStackScreenProps<RootStackParamList, "Home">

const Home = ({ navigation }: Props) => {
	const [tab, setTab] = useState("scheduled")
	const [userData, setUserData] = useState<any>(null)
	const [activities, setActivities] = useState([])
	const [refreshing, setRefreshing] = useState(false)

	const auth = useAuth()

	const tabs = [
		{ label: "scheduled", labelValue: 1 },
		{ label: "completed", labelValue: 0 },
	]

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
		auth.logout()
	}

	useEffect(() => {
		getUserData()
	}, [])

	const getUserData = async () => {
		try {
			const userData = await AsyncStorage.getItem("cookieman")
			setUserData(userData ? JSON.parse(userData) : null)
		} catch (e) {
			console.error("Error parsing JSON", e)
			return null
		}
	}

	useEffect(() => {
		handleFetchActivities()
	}, [])

	const handleFetchActivities = () => {
		setRefreshing(true)
		api.maintenance
			.getByTechnicianId(userData?.id)
			.then((response) => {
				setActivities(response.data)
			})
			.finally(() => {
				setRefreshing(false)
			})
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
					active={tab}
					onPress={(value) => setTab(value)}
				/>
			</View>

			{tab === "scheduled" && (
				<FlatList
					refreshing={refreshing}
					onRefresh={handleFetchActivities}
					data={activities}
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
