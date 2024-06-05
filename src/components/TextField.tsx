import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { Feather } from "@expo/vector-icons"

type Props = {
	label: string
	error: string
	placeholder: string
	value: string
	onChangeText: (value: string) => void
	type?: "EMAIL" | "PASSWORD" | "SEARCH"
}

const TextField = ({ label, error, placeholder, type, value, onChangeText }: Props) => {
	const [showPwd, setShowPwd] = useState(false)

	return (
		<View style={{ marginVertical: 5 }}>
			{label && <Text style={{ color: "#FFFFFF", fontSize: 15 }}>{label}</Text>}
			<View
				style={{
					marginTop: 10,
					flexDirection: "row",
					borderColor: error ? "red" : "#647187",
					borderWidth: 1,
					height: 60,
					borderRadius: 15,
					alignItems: "center",
					paddingHorizontal: 15,
				}}
			>
				{type === "EMAIL" && <Feather name="mail" size={24} color="#647187" />}
				{type === "PASSWORD" && <Feather name="lock" size={24} color="#647187" />}
				{type === "SEARCH" && <Feather name="search" size={24} color="#647187" />}
				<TextInput
					value={value}
					placeholder={placeholder}
					secureTextEntry={type === "PASSWORD" && !showPwd}
					style={{
						flex: 1,
						marginLeft: 15,
						color: "#FFFFFF",
						fontSize: 18,
					}}
					onChangeText={onChangeText}
					placeholderTextColor="#647187"
				/>
				{type === "PASSWORD" && (
					<TouchableOpacity
						onPress={() => setShowPwd(!showPwd)}
						style={{ padding: 10, borderRadius: 20 }}
					>
						<Feather name={showPwd ? "eye-off" : "eye"} size={24} color="#647187" />
					</TouchableOpacity>
				)}
			</View>
			<Text style={{ color: "red", marginTop: 7, marginLeft: 15 }}>{error ?? ""}</Text>
		</View>
	)
}

export default TextField
