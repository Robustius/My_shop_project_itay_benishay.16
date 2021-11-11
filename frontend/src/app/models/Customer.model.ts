export enum Cities {
    telvaviv,
    jerisalem,
    haifa,
    beersheva,
    rishon,
    petahtikva,
    Ashdod,
    Netanya,
    bneyBrak,
    Holon

}

export class Customer {

    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public id: number,
        public password: string,
        public confirmpassword: string,
        public city: Cities,
        public street: string
    ) {


    }

    public getCity() {


    }

}