import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
})
export class AdminViewComponent implements OnInit {
  isAdmin: boolean;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getToken();
    this.isAdmin = this.auth.user.includes('admin');  
    
  }
}
