import { getPersistor } from "@rematch/persist"
import { StyleSheet } from "react-native"
import { RootSiblingParent } from "react-native-root-siblings"
import { Provider } from "react-redux"
import Navigation from "./src/navigation"
import store from "./src/store"
import { PersistGate } from "redux-persist/lib/integration/react"

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={getPersistor()} loading={null}>
				<RootSiblingParent>
					<Navigation />
				</RootSiblingParent>
			</PersistGate>
		</Provider>
	)
}
