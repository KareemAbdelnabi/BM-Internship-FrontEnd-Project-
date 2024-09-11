import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser,CommonModule } from '@angular/common';
import { ProfileService } from '../../../services/user-data.service'; // Import the new service
@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  userProfile: any;
  balance: number = 0;

  constructor(
    private profileService: ProfileService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const id = localStorage.getItem('id');
      const token = sessionStorage.getItem('token');

      if (id && token) {
        this.profileService.getUserProfile(id, token).subscribe(
          response => {
            this.userProfile = response;
            console.log('User profile:', this.userProfile);
            this.balance = response.accounts[0]?.balance ?? 0; // Set balance if available
            console.log('Balance:', this.balance);
          },
          error => {
            console.error('Error:', error);
          }
        );
      } else {
        console.error('ID or token not found');
      }
    }
  }
}

