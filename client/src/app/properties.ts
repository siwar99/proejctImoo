export class Property {
  id!: number;
  createdDate?: Date;
  lastModifiedDate?: Date;
  createdBy?: Date;
  lastModifiedBy?:string;
  adresse!: string;
  type!: string;
  price!: number;
  bedrooms!: number;
  bathrooms!: number;
  area!: number;
  description!: string;
  propertyStatus! : string;

// constructor() {
//   this.adresse = "";
//   this.type = "";
//   this.price = 0;
//   this.bedrooms = 0;
//   this.bathrooms = 0;
//   this.area = 0;
//   this.description = "";
// }
}