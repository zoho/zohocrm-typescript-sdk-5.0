import {ActionHandler} from "./action_handler";
import {Model} from "../../../../../../utils/util/model";

class ActionWrapper implements Model{

	private hipaaCompliance: ActionHandler;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the hipaaCompliance
	 * @returns An instance of ActionHandler
	 */
	public getHipaaCompliance(): ActionHandler	{
		return this.hipaaCompliance;

	}

	/**
	 * The method to set the value to hipaaCompliance
	 * @param hipaaCompliance An instance of ActionHandler
	 */
	public setHipaaCompliance(hipaaCompliance: ActionHandler): void	{
		this.hipaaCompliance = hipaaCompliance;
		this.keyModified.set("hipaa_compliance", 1);

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