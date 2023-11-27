import {ModuleMapping} from "./module_mapping";
import {Model} from "../../../../../../utils/util/model";

class ConvertMapping implements Model{

	private contacts: ModuleMapping;
	private deals: ModuleMapping;
	private accounts: ModuleMapping;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the contacts
	 * @returns An instance of ModuleMapping
	 */
	public getContacts(): ModuleMapping	{
		return this.contacts;

	}

	/**
	 * The method to set the value to contacts
	 * @param contacts An instance of ModuleMapping
	 */
	public setContacts(contacts: ModuleMapping): void	{
		this.contacts = contacts;
		this.keyModified.set("Contacts", 1);

	}

	/**
	 * The method to get the deals
	 * @returns An instance of ModuleMapping
	 */
	public getDeals(): ModuleMapping	{
		return this.deals;

	}

	/**
	 * The method to set the value to deals
	 * @param deals An instance of ModuleMapping
	 */
	public setDeals(deals: ModuleMapping): void	{
		this.deals = deals;
		this.keyModified.set("Deals", 1);

	}

	/**
	 * The method to get the accounts
	 * @returns An instance of ModuleMapping
	 */
	public getAccounts(): ModuleMapping	{
		return this.accounts;

	}

	/**
	 * The method to set the value to accounts
	 * @param accounts An instance of ModuleMapping
	 */
	public setAccounts(accounts: ModuleMapping): void	{
		this.accounts = accounts;
		this.keyModified.set("Accounts", 1);

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
	ConvertMapping as MasterModel,
	ConvertMapping as ConvertMapping
}
