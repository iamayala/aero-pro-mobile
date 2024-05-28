import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Feather } from "@expo/vector-icons"

type Props = {
	type?: "error" | "warning" | "success"
	message: string
	handleClose: () => void
}

const Snackbar = ({ type = "success", message, handleClose }: Props) => {
	return (
		<View
			style={{
				backgroundColor:
					type === "error" ? "#dc3545" : type === "warning" ? "#fd7e14" : "#198754",
				position: "absolute",
				left: 25,
				right: 25,
				top: 20,
				zIndex: 99,
				borderRadius: 15,
				paddingHorizontal: 15,
				paddingVertical: 15,
				flexDirection: "row",
				alignItems: "center",
			}}
		>
			<Text style={{ color: "white", marginRight: 10, flex: 1, fontSize: 16 }}>
				{message}
			</Text>
			<TouchableOpacity
				onPress={handleClose}
				style={{
					height: 40,
					width: 40,
					borderRadius: 30,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Feather name="x" size={26} color="white" />
			</TouchableOpacity>
		</View>
	)
}

export default Snackbar
