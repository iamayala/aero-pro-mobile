import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import TaskDetail from "../pages/TaskDetail"
import { Maintenance } from "../types"

export type RootStackParamList = {
	Home: undefined
	Profile: undefined
	TaskDetail: { task: Maintenance }
	Login: undefined
}

const Navigation = () => {
	const Stack = createNativeStackNavigator<RootStackParamList>()
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Login"
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="Profile" component={Profile} />
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="TaskDetail" component={TaskDetail} />
				<Stack.Screen name="Login" component={Login} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
