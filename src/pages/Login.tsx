import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useState } from "react"
import { View } from "react-native"
import api, { API_BASE_URL } from "../api"
import Button from "../components/Button"
import Header from "../components/Header"
import Screen from "../components/Screen"
import Snackbar from "../components/Snackbar"
import TextField from "../components/TextField"
import { useAuth } from "../hooks/use-auth"
import { RootStackParamList } from "../navigation"

type Props = NativeStackScreenProps<RootStackParamList, "Login">

type LoginPayload = {
	email: string
	password: string
}

type LoginResponse = {
	token: string
	user: {
		id: string
		email: string
		name: string
		// Add any other fields you expect in the response
	}
}

const Login = ({ navigation }: Props) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	const [errors, setErrors] = useState({
		username: "",
		password: "",
	})

	const auth = useAuth()

	const validateForm = () => {
		const newErrors: any = {}
		if (!username) newErrors.username = "Username is required"
		if (!password) newErrors.password = "Password is required"

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
		} else {
			setErrors({
				username: "",
				password: "",
			})
			handleLogin({ email: username, password })
		}
	}

	const handleLogin = (data: { password: string; email: string }) => {
		api.auth
			.login({
				email: data.email,
				password: data.password,
			})
			.then((response) => {
				auth.saveUserToLocalStorage(response.data.user).then(() => {
					setUsername("")
					setPassword("")
					navigation.navigate("Home")
				})
			})
			.catch((error) => {
				setErrorMessage(error.message)
			})
	}

	return (
		<Screen color="#121C2D" style={{ paddingHorizontal: 25 }}>
			{errorMessage && (
				<Snackbar
					message={errorMessage}
					type="error"
					handleClose={() => setErrorMessage("")}
				/>
			)}
			<View style={{ marginTop: 20 }}>
				<Header header={"Log in to your account"} />
			</View>
			<View>
				<TextField
					label="Username"
					value={username}
					placeholder="Username"
					error={errors.username}
					type="EMAIL"
					onChangeText={(e) => setUsername(e)}
				/>
				<TextField
					label="Password"
					placeholder="Password"
					error={errors.password}
					type="PASSWORD"
					value={password}
					onChangeText={(e) => setPassword(e)}
				/>

				<Button onPress={validateForm} label="Login" loading={false} />
			</View>
		</Screen>
	)
}

export default Login
