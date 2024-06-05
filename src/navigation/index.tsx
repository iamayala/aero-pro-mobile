import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useState } from "react"
import Checkout from "../pages/Checkout"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import TaskDetail from "../pages/TaskDetail"
import { Maintenance } from "../types"

export type RootStackParamList = {
	Home: undefined
	Profile: undefined
	TaskDetail: { task: Maintenance }
	Checkout: { task: Maintenance }
	Login: undefined
}

const Navigation = () => {
	const Stack = createNativeStackNavigator<RootStackParamList>()
	const [userData, setUserData] = useState(null)

	const getUserData = async () => {
		try {
			const userData = await AsyncStorage.getItem("cookieman")
			setUserData(userData ? JSON.parse(userData) : null)
		} catch (e) {
			console.error("Error parsing JSON", e)
			return null
		}
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown: false,
					gestureEnabled: false,
				}}
			>
				<Stack.Screen name="Profile" component={Profile} />
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="TaskDetail" component={TaskDetail} />
				<Stack.Screen name="Checkout" component={Checkout} />
				<Stack.Screen name="Login" component={Login} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
