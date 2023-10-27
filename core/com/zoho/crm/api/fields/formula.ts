import {Choice} from "../../../../../../utils/util/choice";
import {Model} from "../../../../../../utils/util/model";

class Formula implements Model{

	private returnType: Choice<string>;
	private expression: Choice<string>;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the returnType
	 * @returns An instance of Choice<string>
	 */
	public getReturnType(): Choice<string>	{
		return this.returnType;

	}

	/**
	 * The method to set the value to returnType
	 * @param returnType An instance of Choice<string>
	 */
	public setReturnType(returnType: Choice<string>): void	{
		this.returnType = returnType;
		this.keyModified.set("return_type", 1);

	}

	/**
	 * The method to get the expression
	 * @returns An instance of Choice<string>
	 */
	public getExpression(): Choice<string>	{
		return this.expression;

	}

	/**
	 * The method to set the value to expression
	 * @param expression An instance of Choice<string>
	 */
	public setExpression(expression: Choice<string>): void	{
		this.expression = expression;
		this.keyModified.set("expression", 1);

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
	Formula as MasterModel,
	Formula as Formula
}
