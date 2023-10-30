
/**
 * This class represents the Zoho CRM User.
 */
export class UserSignature {
    name: string;

    constructor(name: string){
        this.name = name;
    }

    /**
     * This is a getter method to get user email.
     * @returns {string} A String representing the CRM user email.
     */
    public getName(): string {
        return this.name;
    }
}