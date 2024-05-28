/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { RootStackParamList } from "../navigation"

// type Props = NativeStackScreenProps<RootStackParamList, "Login">

export const useAuth = () => {
	const navigation = useNavigation()

	const getUserData = async () => {
		try {
			const userData = await AsyncStorage.getItem("cookieman")
			console.log("--> ", userData)

			return userData ? JSON.parse(userData) : null
		} catch (e) {
			console.error("Error parsing JSON", e)
			return null
		}
	}

	const cookieman = async () => {
		const userData = await AsyncStorage.getItem("cookieman")
		console.log("--> ", userData)

		return userData ? JSON.parse(userData) : null
	}

	const saveUserToLocalStorage = async (_cookieman: any) => {
		try {
			console.log("saved ---> ", _cookieman)

			await AsyncStorage.setItem("cookieman", JSON.stringify(_cookieman))
		} catch (e) {
			console.error("Error saving JSON", e)
		}
	}

	const logout = async () => {
		try {
			await AsyncStorage.clear()
			// @ts-ignore
			navigation.navigate("Login")
		} catch (e) {
			console.error("Error clearing storage", e)
		}
	}

	return useMemo(
		() => ({
			cookieman,
			saveUserToLocalStorage,
			logout,
		}),
		[cookieman, saveUserToLocalStorage, logout]
	)
}
