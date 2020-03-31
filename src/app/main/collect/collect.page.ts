import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-collect',
  templateUrl: 'collect.page.html',
  styleUrls: ['collect.page.scss']
})
export class CollectPage implements OnInit {

  constructor(
    private authService: AuthService,
    ) { }


  async ngOnInit() {

    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          console.log('user ready');
        }
      },
    });
  }

}
