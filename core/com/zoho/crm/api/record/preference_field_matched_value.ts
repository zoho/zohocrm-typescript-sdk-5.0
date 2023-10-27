import {Record} from "./record";
import {Model} from "../../../../../../utils/util/model";

class PreferenceFieldMatchedValue implements Model{

	private contacts: Array<Record>;
	private deals: Array<Record>;
	private accounts: Array<Record>;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the contacts
	 * @returns An Array representing the contacts
	 */
	public getContacts(): Array<Record>	{
		return this.contacts;

	}

	/**
	 * The method to set the value to contacts
	 * @param contacts An Array representing the contacts
	 */
	public setContacts(contacts: Array<Record>): void	{
		this.contacts = contacts;
		this.keyModified.set("Contacts", 1);

	}

	/**
	 * The method to get the deals
	 * @returns An Array representing the deals
	 */
	public getDeals(): Array<Record>	{
		return this.deals;

	}

	/**
	 * The method to set the value to deals
	 * @param deals An Array representing the deals
	 */
	public setDeals(deals: Array<Record>): void	{
		this.deals = deals;
		this.keyModified.set("Deals", 1);

	}

	/**
	 * The method to get the accounts
	 * @returns An Array representing the accounts
	 */
	public getAccounts(): Array<Record>	{
		return this.accounts;

	}

	/**
	 * The method to set the value to accounts
	 * @param accounts An Array representing the accounts
	 */
	public setAccounts(accounts: Array<Record>): void	{
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
	PreferenceFieldMatchedValue as MasterModel,
	PreferenceFieldMatchedValue as PreferenceFieldMatchedValue
}
