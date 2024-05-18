import React from "react"
import { View, Text } from "react-native"

type Props = {
	header: string
	subHeader: string
	align: "LEFT" | "RIGHT"
}

const InfoItem = ({ header, subHeader, align }: Props) => {
	return (
		<View style={{ alignItems: align === "LEFT" ? "flex-start" : "flex-end" }}>
			<Text style={{ color: "#FFFFFF", fontSize: 20 }}>{header}</Text>
			{subHeader && (
				<Text style={{ color: "#647187", fontSize: 16, marginTop: 5 }}>{subHeader}</Text>
			)}
		</View>
	)
}

export default InfoItem
