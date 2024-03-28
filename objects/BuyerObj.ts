export class BuyerObj{
    firstName: string;
    lastname: string;
    postalCode: string;

    constructor(firstName: string, lastName: string, postalCode: string){
        this.firstName = firstName;
        this.lastname = lastName;
        this.postalCode = postalCode;
    }

    async getFirstName(){
        return this.firstName;
    }

    async getLastName(){
        return this.lastname;
    }

    async getPostalCode(){
        return this.postalCode;
    }
}