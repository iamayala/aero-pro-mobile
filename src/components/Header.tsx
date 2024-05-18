import React from "react"
import { Text } from "react-native"

type Props = {
	header: string
	color?: string
}

const Header = ({ header, color }: Props) => {
	return (
		<Text
			style={{ fontSize: 50, color: color ?? "#658DF7", maxWidth: "90%", marginBottom: 20 }}
		>
			{header}
		</Text>
	)
}

export default Header
