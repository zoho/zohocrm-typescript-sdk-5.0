import {AddressValueMap} from "./address_value_map";
import {Model} from "../../../../../../utils/util/model";

class Address implements Model{

	private addressValueMap: AddressValueMap;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the addressValueMap
	 * @returns An instance of AddressValueMap
	 */
	public getAddressValueMap(): AddressValueMap	{
		return this.addressValueMap;

	}

	/**
	 * The method to set the value to addressValueMap
	 * @param addressValueMap An instance of AddressValueMap
	 */
	public setAddressValueMap(addressValueMap: AddressValueMap): void	{
		this.addressValueMap = addressValueMap;
		this.keyModified.set("Address_Value_Map", 1);

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
	Address as MasterModel,
	Address as Address
}
