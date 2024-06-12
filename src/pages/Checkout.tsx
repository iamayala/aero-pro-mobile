import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useCallback, useEffect, useState } from "react"
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import api from "../api"
import Button from "../components/Button"
import IconButton from "../components/IconButton"
import Screen from "../components/Screen"
import TextField from "../components/TextField"
import { RootStackParamList } from "../navigation"
import { AppDispatch, RootState } from "../store"

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">

const Checkout = ({ navigation, route }: Props) => {
	const { task } = route.params

	const [parts, setParts] = useState([])
	const [results, setResults] = useState([])
	const [query, setQuery] = useState("")
	const [comment, setComment] = useState("")
	const [toolUsed, setToolUsed] = useState([])

	const { user } = useSelector((state: RootState) => state.account)
	const dispatch = useDispatch<AppDispatch>()

	const getAllParts = () => {
		api.part.get().then((response) => {
			if (response.status === 200) {
				setParts(response.data)
			}
		})
	}

	useEffect(() => {
		getAllParts()
	}, [])

	useEffect(() => {
		if (query) {
			const results = parts.filter((part: any) =>
				part?.part_name.toLowerCase().includes(query.toLowerCase())
			)
			setResults(results)
		}
	}, [query])

	const addItem = useCallback((item: any) => {
		setToolUsed((prevTools: any) => {
			const existingItem = prevTools.find((tool: any) => tool.id === item.id)
			if (existingItem) {
				return prevTools.map((tool: any) =>
					tool.id === item.id ? { ...tool, quantity: tool.quantity + 1 } : tool
				)
			} else {
				return [...prevTools, { ...item, quantity: 1 }]
			}
		})
	}, [])

	const removeItem = useCallback((itemId: number) => {
		setToolUsed((prevTools: any) => {
			const existingItem = prevTools.find((tool: any) => tool.id === itemId)
			if (existingItem && existingItem.quantity > 1) {
				return prevTools.map((tool: any) =>
					tool.id === itemId ? { ...tool, quantity: tool.quantity - 1 } : tool
				)
			} else {
				return prevTools.filter((tool: any) => tool.id !== itemId)
			}
		})
	}, [])

	const handleSubmit = () => {
		const payload = {
			...task,
			parts_replaced: toolUsed,
			issues_resolved: comment.trim(),
			status: "completed",
		}

		api.maintenance
			.put(payload, task.id)
			.then((response) => {
				if (response.status === 200) {
					dispatch.task.fetchTasks(user?.id ?? 0)
					navigation.navigate("Home")
				}
			})
			.catch((error) => {
				new Error(error.message)
			})
	}

	return (
		<Screen color="#121C2D" style={{ paddingHorizontal: 25 }}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<IconButton icon="chevron-left" onPress={() => navigation.goBack()} type="light" />
			</View>

			<ScrollView>
				<TextField
					value={query}
					error=""
					label=""
					onChangeText={(query) => setQuery(query)}
					placeholder="Search..."
					type="SEARCH"
				/>

				{(query ? results : parts).map((item: any) => {
					return (
						<View
							key={item?.part_number}
							style={{
								backgroundColor: "#FDF684",
								paddingHorizontal: 15,
								flexDirection: "row",
								alignItems: "center",
								borderRadius: 15,
								paddingVertical: 20,
								marginBottom: 10,
							}}
						>
							<Text style={{ color: "#000", flex: 1, fontSize: 18 }}>
								{item.part_name}
							</Text>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<TouchableOpacity>
									<IconButton icon="minus" onPress={() => removeItem(item.id)} />
								</TouchableOpacity>
								<Text
									style={{
										width: 50,
										alignSelf: "center",
										textAlign: "center",
										fontSize: 20,
									}}
								>
									{(toolUsed as any[]).filter(
										(tool: any) => tool.id === item.id
									)[0]?.quantity ?? 0}
								</Text>
								<TouchableOpacity>
									<IconButton icon="plus" onPress={() => addItem(item)} />
								</TouchableOpacity>
							</View>
						</View>
					)
				})}

				<TextField
					label=""
					placeholder="Leave a comment..."
					error={""}
					value={comment}
					onChangeText={(e) => setComment(e)}
				/>
			</ScrollView>
			<Button label="Submit" onPress={() => handleSubmit()} type="dark" />
		</Screen>
	)
}

export default Checkout
