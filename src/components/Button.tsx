import React from "react"
import { ActivityIndicator, Text, TouchableOpacity } from "react-native"

type Props = {
	onPress: () => void
	label: string
	type?: "light" | "dark"
	loading?: boolean
}

const Button = ({ onPress, label, loading = false, type = "dark" }: Props) => {
	return (
		<TouchableOpacity
			onPress={() => (loading ? null : onPress())}
			style={{
				marginTop: 10,
				flexDirection: "row",
				backgroundColor: type === "dark" ? "#658DF7" : "#000000",
				height: 60,
				borderRadius: 50,
				alignItems: "center",
				paddingHorizontal: 15,
				justifyContent: "center",
			}}
		>
			{loading ? (
				<ActivityIndicator color={"#ffffff"} />
			) : (
				<Text style={{ fontSize: 18, color: "#FFFFFF" }}>{label}</Text>
			)}
		</TouchableOpacity>
	)
}

export default Button
