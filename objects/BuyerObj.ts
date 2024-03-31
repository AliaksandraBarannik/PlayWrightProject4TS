export class BuyerObj{

    constructor(private firstName: string, private lastName: string, private postalCode: string){ }

    async getFirstName(){
        return this.firstName;
    }

    async getLastName(){
        return this.lastName;
    }

    async getPostalCode(){
        return this.postalCode;
    }
}