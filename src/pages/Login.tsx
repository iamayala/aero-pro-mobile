import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useState } from "react"
import { View } from "react-native"
import { useDispatch } from "react-redux"
import Button from "../components/Button"
import Header from "../components/Header"
import Screen from "../components/Screen"
import Snackbar from "../components/Snackbar"
import TextField from "../components/TextField"
import { AppDispatch } from "../store"

const Login = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	const [errors, setErrors] = useState({
		username: "",
		password: "",
	})

	const dispatch = useDispatch<AppDispatch>()

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
		dispatch.account
			.authenticate(data)
			.then(() => {
				setUsername("")
				setPassword("")
			})
			.catch((error: { message: React.SetStateAction<string> }) => {
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
