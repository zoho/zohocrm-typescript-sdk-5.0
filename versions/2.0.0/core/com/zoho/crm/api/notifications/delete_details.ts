import {Model} from "../../../../../../utils/util/model";

class DeleteDetails implements Model{

	protected resourceId: bigint;
	protected resourceUri: string;
	protected channelId: string;
	protected keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the resourceId
	 * @returns A BigInt representing the resourceId
	 */
	public getResourceId(): bigint	{
		return this.resourceId;

	}

	/**
	 * The method to set the value to resourceId
	 * @param resourceId A BigInt representing the resourceId
	 */
	public setResourceId(resourceId: bigint): void	{
		this.resourceId = resourceId;
		this.keyModified.set("resource_id", 1);

	}

	/**
	 * The method to get the resourceUri
	 * @returns A String representing the resourceUri
	 */
	public getResourceUri(): string	{
		return this.resourceUri;

	}

	/**
	 * The method to set the value to resourceUri
	 * @param resourceUri A String representing the resourceUri
	 */
	public setResourceUri(resourceUri: string): void	{
		this.resourceUri = resourceUri;
		this.keyModified.set("resource_uri", 1);

	}

	/**
	 * The method to get the channelId
	 * @returns A String representing the channelId
	 */
	public getChannelId(): string	{
		return this.channelId;

	}

	/**
	 * The method to set the value to channelId
	 * @param channelId A String representing the channelId
	 */
	public setChannelId(channelId: string): void	{
		this.channelId = channelId;
		this.keyModified.set("channel_id", 1);

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
	DeleteDetails as MasterModel,
	DeleteDetails as DeleteDetails
}
