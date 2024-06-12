import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { useSelector } from "react-redux"
import Checkout from "../pages/Checkout"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import TaskDetail from "../pages/TaskDetail"
import { RootState } from "../store"
import { Task } from "../store/models/Task"

export type RootStackParamList = {
	Home: undefined
	Profile: undefined
	TaskDetail: { task: Task }
	Checkout: { task: Task }
	Login: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const AuthenticationStack = () => (
	<Stack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		<Stack.Screen name="Login" component={Login} />
	</Stack.Navigator>
)

const SecuredStack = () => (
	<Stack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		<Stack.Screen name="Home" component={Home} />
		<Stack.Screen name="Profile" component={Profile} />
		<Stack.Screen name="TaskDetail" component={TaskDetail} />
		<Stack.Screen name="Checkout" component={Checkout} />
	</Stack.Navigator>
)

const Navigation = () => {
	const { registered } = useSelector((state: RootState) => state.account)

	return (
		<NavigationContainer>
			{registered === true ? <SecuredStack /> : <AuthenticationStack />}
		</NavigationContainer>
	)
}

export default Navigation
