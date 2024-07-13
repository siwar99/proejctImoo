

import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { KeycloakService } from 'src/app/services/keycloak/keycloak.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
	imports: [NgbCarouselModule]
})
export class HomeComponent {

  constructor(
    private keycloakService: KeycloakService,
    private router: Router) {

    }
    onLogout() {
      this.keycloakService.logout();
    }
  goToEmployeeList(){
    this.router.navigate(['/show-all-properties']);
    this.router.navigate(['/show-all-contrats']);
  }
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/2000/600`);

}
