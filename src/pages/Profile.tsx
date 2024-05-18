import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import IconButton from "../components/IconButton"
import Screen from "../components/Screen"
import Tag from "../components/Tag"
import { RootStackParamList } from "../navigation"

type ProfileComponent = {
	icon:
		| "activity"
		| "airplay"
		| "alert-circle"
		| "alert-octagon"
		| "alert-triangle"
		| "align-center"
		| "align-justify"
		| "align-left"
		| "align-right"
		| "anchor"
		| "at-sign"
		| "award"
		| "bar-chart-2"
		| "bar-chart"
		| "battery-charging"
		| "battery"
		| "bell-off"
		| "bell"
		| "bluetooth"
		| "book"
		| "bookmark"
		| "box"
		| "briefcase"
		| "calendar"
		| "cast"
		| "check-circle"
		| "check-square"
		| "check"
		| "circle"
		| "clipboard"
		| "clock"
		| "cloud-off"
		| "cloud"
		| "command"
		| "copy"
		| "cpu"
		| "delete"
		| "disc"
		| "download-cloud"
		| "download"
		| "edit-2"
		| "edit-3"
		| "edit"
		| "external-link"
		| "eye-off"
		| "eye"
		| "feather"
		| "file"
		| "filter"
		| "flag"
		| "folder"
		| "grid"
		| "hash"
		| "headphones"
		| "heart"
		| "home"
		| "inbox"
		| "info"
		| "layers"
		| "layout"
		| "life-buoy"
		| "link-2"
		| "link"
		| "list"
		| "loader"
		| "lock"
		| "log-in"
		| "log-out"
		| "maximize-2"
		| "maximize"
		| "menu"
		| "mic-off"
		| "mic"
		| "minimize-2"
		| "minimize"
		| "minus-circle"
		| "minus-square"
		| "minus"
		| "monitor"
		| "more-horizontal"
		| "more-vertical"
		| "move"
		| "music"
		| "octagon"
		| "package"
		| "pie-chart"
		| "plus-circle"
		| "plus-square"
		| "plus"
		| "power"
		| "printer"
		| "radio"
		| "refresh-ccw"
		| "refresh-cw"
		| "rotate-ccw"
		| "rotate-cw"
		| "scissors"
		| "search"
		| "settings"
		| "share-2"
		| "share"
		| "slash"
		| "speaker"
		| "square"
		| "star"
		| "tag"
		| "target"
		| "thumbs-down"
		| "thumbs-up"
		| "toggle-left"
		| "toggle-right"
		| "trash-2"
		| "trash"
		| "trending-down"
		| "trending-up"
		| "triangle"
		| "type"
		| "unlock"
		| "upload-cloud"
		| "upload"
		| "user-check"
		| "user-minus"
		| "user-plus"
		| "user-x"
		| "user"
		| "watch"
		| "wifi"
		| "x-circle"
		| "x-square"
		| "x"
		| "zap"
		| "zoom-in"
		| "zoom-out"
		| "fast-forward"
		| "pause"
		| "play"
		| "repeat"
		| "rewind"
		| "shuffle"
		| "skip-back"
		| "skip-forward"
		| "volume-1"
		| "volume-2"
		| "volume-x"
		| "volume"
		| "mail"
		| "message-circle"
		| "message-square"
		| "phone-call"
		| "phone-forwarded"
		| "phone-incoming"
		| "phone-missed"
		| "phone-off"
		| "phone-outgoing"
		| "phone"
		| "voicemail"
		| "aperture"
		| "camera-off"
		| "camera"
		| "image"
		| "video-off"
		| "video"
		| "compass"
		| "crosshair"
		| "globe"
		| "map-pin"
		| "map"
		| "navigation-2"
		| "navigation"
		| "cloud-drizzle"
		| "cloud-lightning"
		| "cloud-rain"
		| "cloud-snow"
		| "droplet"
		| "moon"
		| "sun"
		| "sunrise"
		| "sunset"
		| "thermometer"
		| "umbrella"
		| "wind"
		| "arrow-down-left"
		| "arrow-down-right"
		| "arrow-down"
		| "arrow-left"
		| "arrow-right"
		| "arrow-up-left"
		| "arrow-up-right"
		| "arrow-up"
		| "chevron-down"
		| "chevron-left"
		| "chevron-right"
		| "chevron-up"
		| "chevrons-down"
		| "chevrons-left"
		| "chevrons-right"
		| "chevrons-up"
		| "chrome"
		| "codepen"
		| "facebook"
		| "instagram"
		| "pocket"
		| "slack"
		| "twitter"
	title: string
	subTitle: string
}

type Props = NativeStackScreenProps<RootStackParamList, "Profile">

const Profile = ({ navigation }: Props) => {
	const ProfileComponent = ({ icon, subTitle, title }: ProfileComponent) => {
		return (
			<TouchableOpacity
				style={{ flexDirection: "row", alignItems: "center", marginVertical: 15 }}
			>
				<IconButton onPress={() => {}} type={"light"} icon={icon} />
				<View style={{ marginLeft: 15 }}>
					<Text style={{ fontSize: 22 }}>{title}</Text>
					<Text style={{ fontSize: 15, marginTop: 5, color: "#7A7D51" }}>{subTitle}</Text>
				</View>
			</TouchableOpacity>
		)
	}
	return (
		<Screen color="#FDF684" style={{ paddingHorizontal: 25 }}>
			<IconButton icon="chevron-left" onPress={() => navigation.goBack()} type="light" />

			<ScrollView>
				<View style={{ alignItems: "center" }}>
					<View
						style={{
							height: 100,
							width: 100,
							borderRadius: 50,
							backgroundColor: "#000000",
							marginVertical: 15,
						}}
					/>
					<Text style={{ fontSize: 25 }}>James Wilson</Text>
					<Text style={{ fontSize: 18, marginTop: 5 }}>JamesWilson@gmail.com</Text>
					<View
						style={{
							flexDirection: "row",
							marginTop: 15,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Tag label="Maintenance" />
					</View>
				</View>

				<View style={{ marginTop: 20 }}>
					<ProfileComponent
						subTitle="Make changes to your profile inbformation"
						title="Edit Profile"
						icon="edit-2"
					/>
					<ProfileComponent subTitle="Change your pin" title="Security" icon="lock" />
					<ProfileComponent
						subTitle="Setup notification preference"
						title="Notifications"
						icon="bell"
					/>
					<ProfileComponent
						subTitle="Call the service center to get help"
						title="Help and Support"
						icon="phone"
					/>
				</View>
			</ScrollView>
		</Screen>
	)
}

export default Profile
