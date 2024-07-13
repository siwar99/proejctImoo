import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgControl, NgForm} from "@angular/forms";
import {Contrat} from '../contrats'
import {contratService} from '../contrat.service';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent {

  constructor(
    private contratService :contratService,
    private route: ActivatedRoute,
    private router : Router

  ) {

  }


  submitform!: NgForm;
  private baseURL = "http://localhost:8080/api/v1/contrat";
  contrat: Contrat = new Contrat();

  ngOnInit(): void {
    this.contrat.id = this.route.snapshot.params['id'];

    this.contratService.getContratById(this.contrat.id).subscribe(data => {
      this.contrat = data;
    }, error => console.log(error));
  }
  onSubmit() {
    console.log(this.contrat);
    this.saveContrat();
  }
  saveContrat() {
    this.contratService.addContrat(this.contrat).subscribe(data => {
      console.log(data);
      console.log('goToContratList...');
      this.goToContratList();
      this.generatePdf(data); // Pass the saved contract data to generatePdf
    }, error => console.log(error));
  }

  goToContratList() {
    this.router.navigate(['/show-all-contrats']);
    console.log('gIn ContratList...');
   // this.generatePdf(contrat : Contrat);
  }

  generatePdf(contratSave : any): void {

    console.log('Generating PDF...');
    if (window.confirm('Are you sure you want to generate the PDF?')) {
      const doc = new jsPDF();

      // Add title
      doc.setFont('helvetica', 'bolditalic');
      doc.setFontSize(24);
      doc.text(`CONTRACT DE ${this.contrat.typeContrat}`.toUpperCase(), 50, 20);

      /*Date de creation*/
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Tunis le : ', 5, 5);
      const formattedDate = this.contrat.createdDate.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');
      doc.text(` ${formattedDate}`, 20, 5);

      // Add contract details in two columns
      const columnWidth = 90;
      const columnMargin = 10;
      const leftColumnX = 20;
      const rightColumnX = leftColumnX + columnWidth + columnMargin;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Entre les signataires ci-dessous (nom, prénom et numéro d'identification) :` , 20, 40);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`${this.contrat.proprietaire} `, 30, 50);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`${this.contrat.client} `, 30, 60);

      // Section 1 : M.(s)
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text('Section 1 : ', leftColumnX, 70);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`M.(s) ${this.contrat.proprietaire.toUpperCase()}`, 30, 80);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`pour le locataire : M.(s) ${this.contrat.client.toUpperCase()}`, 30, 90);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`situé à ${this.contrat.adresse.toUpperCase()}`, 30, 100);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`composé de ${this.contrat.compose.toUpperCase()}`, 30, 110);

      //Section 2
      let dateDebut = new Date(this.contrat.dateDebut);
      let dateFin = new Date(this.contrat.dateFin);
      let timeDifference = Math.abs(dateDebut.getTime() - dateFin.getTime());
      let dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;


      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 2 : `, leftColumnX, 120);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Cette autorisation a été accordée pour une période de ${dayDifference} jours`, 30, 130);
      doc.text(`Commence à ${this.contrat.dateDebut} et se terminant à ${this.contrat.dateFin}`, 30, 140);
      doc.text(`afin d'utiliser dans le but de ${this.contrat.but.toUpperCase()}`, 30, 150);


      //Section 3
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 3 : `, leftColumnX, 160);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Le montant de ce loyer est de ${this.contrat.montant}.DT pour toute la période mentionnée `, 30, 170);
      doc.text(`Paiement du loyer par ....`, 30, 180);

      //Section 4
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 4 : `, leftColumnX, 190);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Le présent contrat est résilié dès l'expiration de la période imposée, sans préavis`, 30, 200);
       doc.text(`de l'une des parties à l'autre.`, 30, 210);

       //Section 5
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 5 : `, leftColumnX, 220);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Les honoraires des affaires sont à la charge du bénéficiaire, ainsi que toutes les `, 30, 230);
       doc.text(`prestations municipales, à l'exception de la prestation de l'employé sur le montant`, 30, 240);
      doc.text(`de de l'autorisation imposée au propriétaire.`, 30, 250);

      //Section 6
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 6 : `, leftColumnX, 260);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`L'acheteur reconnaît avoir reçu le magasin objet du présent contrat en bon état avec`, 30, 270);
       doc.text(`tous ses accessoires tels que matelas, vitres, clés, etc. Et s'engage à le restituer`, 30, 280);
      doc.text(`à l'expiration de la période de licence tel qu'il l'a reçu de lui.`, 30, 290);

      // Add a second page to the document
      doc.addPage();
      //Section 7
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 7 : `, leftColumnX, 20);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Toutes les réparations et améliorations faites par l'emprunteur dans le magasin pendant`, 30, 30);
      doc.text(`la durée de sa résidence restent la propriété du propriétaire sans aucune indemnité`, 30, 40);
      doc.text(`Toute modification du magasin sans l'accord écrit du propriétaire est interdite.`, 30, 50);

      //Section 8
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 8 : `, leftColumnX, 60);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Le propriétaire n'est pas responsable des dommages et pertes causés par l'eau qui s'écoule`, 30, 70);
      doc.text(`des toits ou de l'étage supérieur du bâtiment. Le plaignant doit informer le plaignant par une`, 30, 80);
      doc.text(`lettre écrite avec garantie de livraison ou un télégramme rédigé par un notaire.`, 30, 90);
      doc.text(`Dans le cas où le remorquage se produit comme indiqué,le propriétaire doit prendre`, 30, 100);
      doc.text(`l'initiative de l'annulation de ce cas dans un délai n'excédant pas trois jours à`, 30, 110);
      doc.text(`compter de la date de notification.`, 30, 120);

      //Section 9
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 9 : `, leftColumnX, 130);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Il est strictement interdit d'introduire dans le magasin des substances inflammables `, 30, 140);
      doc.text(`ou explosives,ainsi que des objets qui créent un danger pour le propriétaire ou les voisins.`, 30, 150);

      //Section 10
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 9 : `, leftColumnX, 160);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Il est interdit pour quelque raison que ce soit de prêter le magasin à autrui ou de le`, 30, 170);
      doc.text(`prêter à autrui, même temporairement et sur la base de la bienveillance.`, 30, 180);

      //Section 11
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 11 : `, leftColumnX, 190);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Le propriétaire a le droit d'inspecter le magasin quand il le désire, soit directement, soit`, 30, 200);
      doc.text(`par l'intermédiaire de son représentant, et il peut aussi envoyer qui il veut pour le faire`, 30, 210);
      doc.text(`visiter Au cas où il voudrait le vendre, le justifier, le réparer ou créer un autre étage, sans`, 30, 220);
      doc.text(`s'opposer au plaignant, qui n'a pas le droit d'exiger. Il n'a pas le droit de demander une amende`, 30, 230);
      doc.text(`ou une diminution du montant du loyer, même si la durée des travaux dépasse le délai légal.`, 30, 240);

      //Section 12
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 12 : `, leftColumnX, 250);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Il n'est pas permis à l'emprunteur de se comporter dans la boutique d'une manière indigne,`, 30, 260);
      doc.text(`et il lui est interdit d'entrer dans la boutique des personnes de mauvaise moralité ou des`, 30, 270);
      doc.text(`personnes suspectes.`, 30, 280);

      doc.addPage();
      //Section 13
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 13 : `, leftColumnX, 20);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`La personne autorisée n'est pas responsable des troubles ou des dommages causés`, 30, 30);
      doc.text(`à la personne autorisée par d'autres personnes.`, 30, 40);

      //Section 14
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 14 : `, leftColumnX, 50);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Il est strictement interdit d'utiliser les toits pour déposer des marchandises ou d'autres`, 30, 60);
      doc.text(`choses, sauf pour étendre des vêtements Le commerçant doit réparer et indemniser de ses`, 30, 70);
      doc.text(`propres deniers les dommages causés par la violation de cette condition.`, 30, 80);

      //Section 15
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 15 : `, leftColumnX, 90);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Le propriétaire mettra à la disposition de l'occupant des compteurs d'eau et d'électricité`, 30, 100);
      doc.text(`et l'occupant paiera la valeur de ce qu'il consomme, et toute coupure d'eau ou d'électricité`, 30, 110);
      doc.text(`Toute coupure d'eau ou d'électricité est à la charge du locataire.`, 30, 120);

      //Section 16
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 16 : `, leftColumnX, 130);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Le bailleur a le droit de résilier obligatoirement le présent contrat si l'acquéreur enfreint`, 30, 140);
      doc.text(`les dispositions des conditions ci-dessus.`, 30, 150);

      //Section 17
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Section 17 : `, leftColumnX, 160);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Les parties susmentionnées sont convenues de ce qui précède et l'ont écrit en trois`, 30, 170);
      doc.text(`exemplaires, et chacune d'elles a reçu un exemplaire, et le troisième reste auprès`, 30, 180);
      doc.text(`de l'officier de l'état civil Le troisième restera auprès du greffier.`, 30, 190);


      //Adresse
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Tunis le ${formattedDate}`, leftColumnX, 210);

      //Signature 1
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Signature de Propriétaire ...`, leftColumnX, 230);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`(Nom ,Prenom et Date)`, 25, 240);

      //Signature 2
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bolditalic');
      doc.text(`Signature de Locataire`, rightColumnX, 230);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`(Nom ,Prenom et Date)`, rightColumnX+5, 240);


      // Generate the PDF blob
      const pdfBlob = doc.output('blob');
      // Create a URL for the PDF blob
      const pdfUrl = URL.createObjectURL(pdfBlob);
      // Create a link to download the PDF file
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `Contract-${contratSave.id}.pdf`;
      link.click();
      // Clean up
      URL.revokeObjectURL(pdfUrl);

    }

  }}
