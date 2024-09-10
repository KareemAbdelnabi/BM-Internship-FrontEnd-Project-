import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [MatIcon, NavbarComponent, FooterComponent],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {

}
