import { Component } from '@angular/core';
import { AppService } from './services/app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'db-contacts';


  constructor(public appService:AppService) {

   }

  openUsers() {
    var x: any = document.getElementById("dropdownMenuButton1");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

setCurrenUser(item:any){
  localStorage.setItem('currentUser',JSON.stringify(item));
  this.appService.currentUser=item;
  this.appService.toUserId=''
  this.openUsers()
}

}
