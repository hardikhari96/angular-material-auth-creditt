import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {

  }

}
