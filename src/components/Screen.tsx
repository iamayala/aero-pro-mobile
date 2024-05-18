import React from "react"
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native"

type Props = {
	children: any
	color?: string
	style?: any
}

const Screen = ({ children, color, style }: Props) => {
	return (
		<SafeAreaView style={[styles.container, { backgroundColor: color ?? "blue" }]}>
			<StatusBar barStyle="dark-content" />
			<View style={[{ flex: 1 }, style]}>{children}</View>
		</SafeAreaView>
	)
}

export default Screen

const styles = StyleSheet.create({
	container: { flex: 1 },
})
