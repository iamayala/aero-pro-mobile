import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

const Tab = ({
	active,
	onPress,
	tabs,
	style,
}: {
	active: string
	onPress: (value: string) => void
	tabs: { label: string; labelValue: number }[]
	style?: any
}) => {
	return (
		<View
			style={[
				{
					flexDirection: "row",
					alignItems: "center",
					borderBottomColor: "#6F7C94",
					borderBottomWidth: 1,
				},
				style,
			]}
		>
			{tabs.map((tab, index) => {
				return (
					<TouchableOpacity
						onPress={() => onPress(tab.label)}
						key={index}
						style={{
							paddingBottom: 15,
							flexDirection: "row",
							alignItems: "center",
							flex: 1,
							borderBottomColor: "#FFFFFF",
							borderBottomWidth: active === tab.label ? 1 : 0,
						}}
					>
						<View
							style={{
								backgroundColor: active === tab.label ? "#FFFFFF" : "transparent",
								height: 30,
								alignItems: "center",
								justifyContent: "center",
								paddingHorizontal: 13,
								borderRadius: 20,
								borderColor: "#FFFFFF",
								borderWidth: active !== tab.label ? 1 : 0,
							}}
						>
							<Text
								style={{
									fontSize: 16,
									color: active === tab.label ? "#000000" : "#FFFFFF",
								}}
							>
								{tab.labelValue}
							</Text>
						</View>
						<Text
							style={{
								marginLeft: 13,
								color: active === tab.label ? "#658DF7" : "#FFFFFF",
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
		</View>
	)
}

export default Tab
