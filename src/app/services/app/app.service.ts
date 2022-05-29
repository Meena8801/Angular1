import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public contactList: Array<any> = [{
    fName: 'John Doe',
    email: 'JohnDoe@gmial.com',
    pNumber: 1472536892,
    code: 111000,
    lastMessage:"",
    lastMessageDate:new Date()


  }, {
    fName: 'Danny Smith',
    email: 'DannySmith@gmial.com',
    pNumber: 8523697413,
    code: 111001,
    lastMessage:"",
    lastMessageDate:new Date()

  }, {
    fName: 'Alex Steward',
    email: 'AlexSteward@gmial.com',
    pNumber: 6395284172,
    code: 1110002,
    lastMessage:"",
    lastMessageDate:new Date()

  }, {
    fName: 'Kate Moss',
    email: 'KateMoss@gmial.com',
    pNumber: 6395284172,
    code: 111003,
    lastMessage:"",
    lastMessageDate:new Date()

  }];
  public currentUser: any = '';

  public chatList: Array<any> = [
  
  ]

  public toUserId = '';
  constructor() {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser)
    } else {
      this.currentUser = {
        fName: 'John Doe',
        email: 'JohnDoe@gmial.com',
        pNumber: 1472536892,
        code: Math.floor(100000 + Math.random() * 900000),

      }
    }


  }
}
