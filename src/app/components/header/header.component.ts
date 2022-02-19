import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
  }
  logout() {
    this.authservice.logout().subscribe((res) => {
      localStorage.clear();
      this.router.navigate(['/login']);
    })
  }

}
