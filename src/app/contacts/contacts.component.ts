import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../services/app/app.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public contactFormObject!: FormGroup;
  public isErrForm!: boolean;
  // public contactList: Array<any> = [];
  @ViewChild('contactModal') contactModal!: ElementRef;
  public isViewContact: boolean = false;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,public appService:AppService) {

    this.contactFormObject = this.formBuilder.group({
      fName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      pNumber: [null, [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]*$"),]],
      code: [''],

    });

  }

  ngOnInit(): void {
  }


  open() {
    this.modalService.open(this.contactModal, { ariaLabelledBy: 'modal-basic-title' })
  }


  public submitContactForm() {

    if (this.contactFormObject.valid) {
      this.isErrForm = false;
    
      if (!this.contactFormObject.value.code) {
        this.contactFormObject.value.email
        let contactIndex = this.appService.contactList.findIndex(({ email }) => email.toLowerCase() === this?.contactFormObject?.value?.email.toLowerCase())
        if(contactIndex === -1){
          let obj = {
            ...this.contactFormObject?.value,
            code: Math.floor(100000 + Math.random() * 900000),
          }
          this.appService.contactList.push(obj);
        }else{
          alert(`An account with Email ${this?.contactFormObject?.value?.email} alredy exist`)
        }
    
      } else {
        let contactIndex = this.appService.contactList.findIndex(({ code }) => code === this?.contactFormObject?.value?.code)
        if (contactIndex !== -1) {
          this.appService.contactList[contactIndex] = this.contactFormObject?.value;
        }
      }


      this.contactFormObject.reset();
      this.modalService.dismissAll()
      this.isViewContact=false;

    } else {
      this.isErrForm = true;
    }

  }


  public onCloseModal() {
    this.modalService.dismissAll();
    this.isViewContact=false;
    this.contactFormObject.reset();
  }

  public editContact(contact: any) {
    // let item = this.contactList.find(({ code }) => contact?.code);
    this.open();
    this.contactFormObject.patchValue({
      ...contact
    })


  }

  public deleteContact(contact: any) {
    let contactIndex = this.appService.contactList.findIndex(({ code }) => code === contact?.code)
    if (contactIndex !== -1) {
      this.appService.contactList.splice(contactIndex, 1)
    }
  }

  public viewContact(contact: any) {
    // let item = this.contactList.find(({ code }) => contact?.code);
    this.open();
    this.contactFormObject.patchValue({
      ...contact
    });
    this.isViewContact=true;


  }
}
