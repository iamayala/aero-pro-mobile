import { Models } from "@rematch/core"
import { account } from "./Account"
import { task } from "./Task"

export interface RootModel extends Models<RootModel> {
	account: typeof account
	task: typeof task
}

export const models: RootModel = { account, task }
