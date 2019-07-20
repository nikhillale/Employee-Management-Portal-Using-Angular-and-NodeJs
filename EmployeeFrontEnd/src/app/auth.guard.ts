import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate ,Route, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './shared/http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private autService : HttpService , private route : Router){}

  canActivate():boolean{
    if (this.autService.logedIn()){
      return true;
    } else {
      this.route.navigate(['authentication/login']);
      return false;
    }
  }

}


