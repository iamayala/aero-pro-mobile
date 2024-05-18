import React from "react"
import { Text, View } from "react-native"

type Props = {
	label: string
	header?: string
	subHeader?: string
}

const InfoHolder = ({ label, header, subHeader }: Props) => {
	return (
		<View>
			<Text style={{ fontSize: 13, color: "#7A7D51" }}>{label}</Text>
			{header && <Text style={{ fontSize: 35, color: "#060B27" }}>{header}</Text>}
			{subHeader && (
				<Text style={{ marginTop: 5, fontSize: 18, color: "#060B27" }}>{subHeader}</Text>
			)}
		</View>
	)
}

export default InfoHolder
