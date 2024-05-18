import { StyleSheet } from "react-native"
import Navigation from "./src/navigation"

export default function App() {
	return <Navigation />
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#121C2D",
		paddingTop: 50,
	},
})
