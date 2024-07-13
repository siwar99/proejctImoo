
export class Contrat {
  id!: number;
  // idAgent!: number;
  // idClient!: number;
  // idProprietaire!: number;
  // idProperty!: Property;
  dateDebut!: Date;
  dateFin!: Date;
  typeContrat!: TypeContrat;
  montant!: number ;
  createdBy! :String  ;
  createdDate!: Date;
  /*Ajouter */
  proprietaire!: string;
  client!: string;
  adresse!: string;
  compose!: string;
  but!: string;
  //description!: string;
  // hasEquipment!: boolean;
  // equipements!: string;

  constructor() {
    /*this.idAgent = 0;
    this.idClient = 0;
    this.idProprietaire = 0;
    this.idProperty = new Property();*/
    this.dateDebut =  new Date();
    this.dateFin  =  new Date();
    this.createdDate =  new Date();
    this.typeContrat = TypeContrat.Default;
    this.montant = 0;
    this.proprietaire="Douaa ZAOUI";
    this.client="Aziz NAFFETI";
    this.adresse="Tunis Arianna";
    this.compose="2 Chambres";
    this.but="Inconnu";

    /*this.hasEquipment = false;
    this.equipements = "";
    this.description = "";*/
  }
}

enum TypeContrat{
  Default,
  Appartement,
  House,
  Terrain
}
