import {Choice} from "../../../../../../utils/util/choice";
import {Model} from "../../../../../../utils/util/model";

class PinFields implements Model{

	private apiName: string;
	private pin: Choice<boolean>;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the apiName
	 * @returns A String representing the apiName
	 */
	public getAPIName(): string	{
		return this.apiName;

	}

	/**
	 * The method to set the value to apiName
	 * @param apiName A String representing the apiName
	 */
	public setAPIName(apiName: string): void	{
		this.apiName = apiName;
		this.keyModified.set("api_name", 1);

	}

	/**
	 * The method to get the pin
	 * @returns An instance of Choice<boolean>
	 */
	public getPin(): Choice<boolean>	{
		return this.pin;

	}

	/**
	 * The method to set the value to pin
	 * @param pin An instance of Choice<boolean>
	 */
	public setPin(pin: Choice<boolean>): void	{
		this.pin = pin;
		this.keyModified.set("_pin", 1);

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
	PinFields as MasterModel,
	PinFields as PinFields
}
