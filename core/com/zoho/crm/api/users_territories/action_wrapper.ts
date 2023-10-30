import {ActionHandler} from "./action_handler";
import {ActionResponse} from "./action_response";
import {TransferActionHandler} from "./transfer_action_handler";
import {Model} from "../../../../../../utils/util/model";

class ActionWrapper implements Model, ActionHandler, TransferActionHandler{

	private territories: Array<ActionResponse>;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the territories
	 * @returns An Array representing the territories
	 */
	public getTerritories(): Array<ActionResponse>	{
		return this.territories;

	}

	/**
	 * The method to set the value to territories
	 * @param territories An Array representing the territories
	 */
	public setTerritories(territories: Array<ActionResponse>): void	{
		this.territories = territories;
		this.keyModified.set("territories", 1);

	}

	/**
	 * The method to check if the user has modified the given key
	 * @param key A String representing the key
	 * @returns A number representing the modification
	 */
	public isKeyModified(key: string): number | null | undefined	{
		if(this.keyModified.has(key))	{
			return this.keyModified.get(key);
		}
		return null;

	}

	/**
	 * The method to mark the given key as modified
	 * @param key A String representing the key
	 * @param modification A number representing the modification
	 */
	public setKeyModified(key: string, modification: number): void	{
		this.keyModified.set(key, modification);

	}

}
export {
	ActionWrapper as MasterModel,
	ActionWrapper as ActionWrapper
}
