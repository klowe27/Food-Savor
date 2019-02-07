import { Component, OnInit, Input } from '@angular/core';
import { RecipeApiService } from '../recipe-api.service';
import { AuthService } from '../auth.service';
import { Recipe } from '../recipe.model';
import * as firebase from "firebase";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [ RecipeApiService, AuthService ]
})

export class RecipeListComponent implements OnInit {
  @Input() recipes: any[];
  private responseApi: Object;
  private user;
  constructor(private recipeApiService: RecipeApiService, private authService: AuthService) {
    // this.authService.user.subscribe(user => {
    //   if (user === null)
    // })
   }

  ngOnInit() {

  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  
  }

  // loginCheck(){
  //    this.authService.addFavorite();
  //    return this.authService.checkLoginStatus();
  // }

  favorite(favoriteName: string, favoriteUrl: string, favoriteCal){
    // let login: boolean = this.loginCheck();
    // console.log(login);
    if(this.user === null){
      this.authService.login();
      console.log(this.user);
    } else {
      let currentUserId = this.user.uid
      let favoriteRecipe: Recipe = new Recipe(favoriteName, favoriteUrl)
      this.authService.pushFavorite(favoriteRecipe, currentUserId);
      const heart:any = document.getElementById(favoriteCal);
      heart.style.fill = 'red';

    }
  }


}
