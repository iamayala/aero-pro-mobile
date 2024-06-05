import React from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"

const Tab = ({
	active,
	onPress,
	tabs,
	style,
}: {
	active: string
	onPress: (value: any) => void
	tabs: { label: string; labelValue: string }[]
	style?: any
}) => {
	return (
		<ScrollView
			horizontal
			style={[
				{
					flexDirection: "row",
					borderBottomColor: "#6F7C94",
					borderBottomWidth: 1,
				},
				style,
			]}
		>
			{tabs.map((tab, index) => {
				return (
					<TouchableOpacity
						onPress={() => onPress(tab)}
						key={index}
						style={{
							paddingBottom: 15,
							paddingHorizontal: 15,
							flexDirection: "row",
							alignItems: "center",
							flex: 1,
							borderBottomColor: "#FFFFFF",
							borderBottomWidth: active === tab.labelValue ? 1 : 0,
						}}
					>
						<Text
							style={{
								color: active === tab.labelValue ? "#658DF7" : "#FFFFFF",
								fontSize: 26,
								fontWeight: "300",
								textTransform: "capitalize",
							}}
						>
							{tab.label}
						</Text>
					</TouchableOpacity>
				)
			})}
		</ScrollView>
	)
}

export default Tab
