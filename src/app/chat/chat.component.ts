import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app/app.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public message: string = '';

  public chatCurrentList: Array<any> = [];
  public selectedUserName: string = ''

  constructor(public appService: AppService) { }

  ngOnInit(): void {


  }

  sendMessange() {
    this.appService.currentUser.code
    let data = {
      senderId: this.appService?.currentUser?.code,
      resiverId: this.appService?.toUserId,
      messange: this.message,
      date: new Date(),
      creatBy: this.appService?.currentUser?.fName,
      msgIds:[this.appService?.currentUser?.code,this.appService?.toUserId]
    }
    let cureeentUser=this.appService.contactList.findIndex(({code})=>code === this.appService?.currentUser?.code)
    let sendUser=this.appService.contactList.findIndex(({code})=>code === this.appService?.toUserId)
    if(cureeentUser !== -1){
      this.appService.contactList[cureeentUser]={...this.appService.contactList[cureeentUser],lastMessage:this.message,  lastMessageDate: new Date()}
    }
    if(sendUser !== -1){
      this.appService.contactList[sendUser]={...this.appService.contactList[sendUser],lastMessage:this.message,lastMessageDate: new Date()}
    }
    this.appService.chatList.push({...data});
    this.message=''
    this.chatCurrentList = this.appService.chatList.filter(({ senderId, resiverId,msgIds }) =>msgIds.includes(this.appService?.toUserId)   && msgIds.includes(this.appService?.currentUser?.code )  )
    console.log({...data})
  }
  selectUser(data: any) {

    this.appService.toUserId = data?.code;
    this.selectedUserName = data.fName;
    this.chatCurrentList = this.appService.chatList.filter(({ senderId, resiverId,msgIds }) =>msgIds.includes(this.appService?.toUserId)   && msgIds.includes(this.appService?.currentUser?.code )  )
    // if( this.chatCurrentList.length === 0){
    //   this.chatCurrentList = this.appService.chatList.filter(({ senderId, resiverId }) => senderId === this.appService?.currentUser?.code && resiverId === this.appService?.toUserId)
    // }
 
    console.log( this.chatCurrentList ,this.appService.chatList)
  }

}
