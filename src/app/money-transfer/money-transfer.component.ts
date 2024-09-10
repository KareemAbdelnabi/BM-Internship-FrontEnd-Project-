import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MobileappsharedComponent } from '../mobileappshared/mobileappshared.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-money-transfer',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, MobileappsharedComponent, FooterComponent],
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.scss'],
})
export class MoneyTransferComponent {
  step: number = 1;
  amount: number = 1000;
  recipientName: string = '';
  recipientAccount: string = '';
  senderName: string = 'Jonathan Smith';
  senderAccount: string = 'xxxx7890';

  showFavorites: boolean = false;

  favorites = [
    { name: 'Asmaa Dosuky', account: '123456789456' },
    { name: 'Asmaa Dosuky', account: '123456789456' },
  ];

  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  reset() {
    this.step = 1;
    this.amount = 1000;
    this.recipientName = '';
    this.recipientAccount = '';
  }

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
  }

  // Select a favorite recipient and populate the form
  selectFavorite(favorite: any) {
    this.recipientName = favorite.name;
    this.recipientAccount = favorite.account;
    this.showFavorites = false; // Close the favorite list
  }

  // Mock function to add the recipient to favourites
  addToFavourites() {
    console.log('Added to favourites:', this.recipientName);
  }
}
