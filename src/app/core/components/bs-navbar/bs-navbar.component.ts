import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$ : Observable<ShoppingCart>;
  shoppingCartItemCount: number;
  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {      
  }  

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser); 
    this.cart$ = await this.shoppingCartService.getCart();    
  }

  logout() { 
    this.auth.logout();
  }

}
