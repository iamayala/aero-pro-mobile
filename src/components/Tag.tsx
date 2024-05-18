import React from "react"
import { Text, View } from "react-native"

type Props = {
	label: string
}

const Tag = ({ label }: Props) => {
	return (
		<View
			style={{
				height: 50,
				borderColor: "#000000",
				paddingHorizontal: 20,
				borderWidth: 1,
				borderRadius: 50,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={{ fontSize: 16, textTransform: "capitalize" }}>{label}</Text>
		</View>
	)
}

export default Tag
