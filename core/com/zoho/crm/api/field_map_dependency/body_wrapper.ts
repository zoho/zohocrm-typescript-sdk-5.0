import {Info} from "./info";
import {MapDependency} from "./map_dependency";
import {ResponseHandler} from "./response_handler";
import {Model} from "../../../../../../utils/util/model";

class BodyWrapper implements Model, ResponseHandler{

	private mapDependency: Array<MapDependency>;
	private info: Info;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the mapDependency
	 * @returns An Array representing the mapDependency
	 */
	public getMapDependency(): Array<MapDependency>	{
		return this.mapDependency;

	}

	/**
	 * The method to set the value to mapDependency
	 * @param mapDependency An Array representing the mapDependency
	 */
	public setMapDependency(mapDependency: Array<MapDependency>): void	{
		this.mapDependency = mapDependency;
		this.keyModified.set("map_dependency", 1);

	}

	/**
	 * The method to get the info
	 * @returns An instance of Info
	 */
	public getInfo(): Info	{
		return this.info;

	}

	/**
	 * The method to set the value to info
	 * @param info An instance of Info
	 */
	public setInfo(info: Info): void	{
		this.info = info;
		this.keyModified.set("info", 1);

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
	BodyWrapper as MasterModel,
	BodyWrapper as BodyWrapper
}
