import { client } from "src/app/client";
import { Property } from "src/app/properties";

export class RDV{
    id!:number;
    description!: string;
    dateHeure!: string;
    statusRDV!:string;
    property!:Property;
    userClient!: client;
    constructor(){
            this.description;
            this.dateHeure;
            this.statusRDV;
            this.property;
            this.userClient
        }
}