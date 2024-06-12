import { init, RematchDispatch, RematchRootState } from "@rematch/core"
import persistPlugin from "@rematch/persist"
import { models, RootModel } from "./models"
import AsyncStorage from "@react-native-async-storage/async-storage"
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading"

type FullModel = ExtraModelsFromLoading<RootModel>

const persistConfig = persistPlugin<RematchRootState<RootModel>, RootModel, FullModel>({
	key: "root",
	storage: AsyncStorage,
	blacklist: ["loading"],
})

const store = init<RootModel, FullModel>({
	models,
	redux: {
		devtoolOptions: {},
		rootReducers: { RESET_APP: () => undefined }, // needed to reset the store
	},
	plugins: [persistConfig, loadingPlugin()],
})

export type Store = typeof store
export type AppDispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel, FullModel>

export default store
