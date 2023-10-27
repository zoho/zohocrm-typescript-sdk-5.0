import {DefaultForm} from "./default_form";
import {FeaturesAvailable} from "./features_available";
import {FromAddress} from "./from_address";
import {User} from "./user";
import {Model} from "../../../../../../utils/util/model";

class DataMap implements Model{

	private user: User;
	private featuresAvailable: FeaturesAvailable;
	private fromAddress: Array<FromAddress>;
	private relayDomains: Array<any>;
	private mergefieldsdata: string;
	private defaultFrom: DefaultForm;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the user
	 * @returns An instance of User
	 */
	public getUser(): User	{
		return this.user;

	}

	/**
	 * The method to set the value to user
	 * @param user An instance of User
	 */
	public setUser(user: User): void	{
		this.user = user;
		this.keyModified.set("user", 1);

	}

	/**
	 * The method to get the featuresAvailable
	 * @returns An instance of FeaturesAvailable
	 */
	public getFeaturesAvailable(): FeaturesAvailable	{
		return this.featuresAvailable;

	}

	/**
	 * The method to set the value to featuresAvailable
	 * @param featuresAvailable An instance of FeaturesAvailable
	 */
	public setFeaturesAvailable(featuresAvailable: FeaturesAvailable): void	{
		this.featuresAvailable = featuresAvailable;
		this.keyModified.set("features_available", 1);

	}

	/**
	 * The method to get the fromAddress
	 * @returns An Array representing the fromAddress
	 */
	public getFromAddress(): Array<FromAddress>	{
		return this.fromAddress;

	}

	/**
	 * The method to set the value to fromAddress
	 * @param fromAddress An Array representing the fromAddress
	 */
	public setFromAddress(fromAddress: Array<FromAddress>): void	{
		this.fromAddress = fromAddress;
		this.keyModified.set("from_address", 1);

	}

	/**
	 * The method to get the relayDomains
	 * @returns An Array representing the relayDomains
	 */
	public getRelayDomains(): Array<any>	{
		return this.relayDomains;

	}

	/**
	 * The method to set the value to relayDomains
	 * @param relayDomains An Array representing the relayDomains
	 */
	public setRelayDomains(relayDomains: Array<any>): void	{
		this.relayDomains = relayDomains;
		this.keyModified.set("relay_domains", 1);

	}

	/**
	 * The method to get the mergefieldsdata
	 * @returns A String representing the mergefieldsdata
	 */
	public getMergefieldsdata(): string	{
		return this.mergefieldsdata;

	}

	/**
	 * The method to set the value to mergefieldsdata
	 * @param mergefieldsdata A String representing the mergefieldsdata
	 */
	public setMergefieldsdata(mergefieldsdata: string): void	{
		this.mergefieldsdata = mergefieldsdata;
		this.keyModified.set("mergeFieldsData", 1);

	}

	/**
	 * The method to get the defaultFrom
	 * @returns An instance of DefaultForm
	 */
	public getDefaultFrom(): DefaultForm	{
		return this.defaultFrom;

	}

	/**
	 * The method to set the value to defaultFrom
	 * @param defaultFrom An instance of DefaultForm
	 */
	public setDefaultFrom(defaultFrom: DefaultForm): void	{
		this.defaultFrom = defaultFrom;
		this.keyModified.set("default_from", 1);

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
	DataMap as MasterModel,
	DataMap as DataMap
}
