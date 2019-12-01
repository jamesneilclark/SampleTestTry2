import { Component, OnInit, NgModuleFactoryLoader } from '@angular/core';
import { Contact } from './contact.model';
import { Http } from '@angular/http';
import { LocalStorageService } from '../localStorageService';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IContact {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  owed: number;
  phone: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Array<IContact> = [];
  constructor(
    // tslint:disable-next-line: deprecation
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  async ngOnInit() {
    this.contacts = await this.loadContacts(); // this calls the function below onInit
  }
  async loadContacts() { // will load contacts either for the file or local storage from the user
    let contacts = JSON.parse(localStorage.getItem('contacts')); // what does this do //
    if (contacts && contacts.length > 0) { // if user made changed, load their changes from local storage
      // contacts = contacts;
    } else {
      contacts = await this.loadContactsFromJson(); // else load contacts from file
    }
    this.contacts = contacts;
    return contacts;
  }
  async loadContactsFromJson() { // this is just for getting from the file
    const contacts = await this.http.get('assets/contacts.json').toPromise();
    return contacts.json();
  }
  addContact() {
    const contact: IContact = { // null contact
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      owed: null,
      phone: null
    };
    this.contacts.unshift(contact); // adds the above code to the contact array
    localStorage.setItem('contacts', JSON.stringify(this.contacts)); // saves to local storage
    // this.saveToLocalStorage(); // this can be used as well as the above code
  }
  deleteContact(index: number) {
    this.contacts.splice(index, 1); // deletes on item based on index
    localStorage.setItem('contacts', JSON.stringify(this.contacts)); // saves changes to local storage
    // this.saveToLocalStorage(); // this can be used as well as the above code
  }
  saveToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }
  finalize() {
    const data = this.calculate(); // runs the calculate() function to get totals
    this.router.navigate(['home', data]); // routers to home and send data with it

    localStorage.setItem('calculatedData', JSON.stringify(data));
    // another option for sending data by saving it to local storage see home.comp.ts to see how to access
  }
  calculate() {
    let owed = 0;
    for (let i = 0; i < this.contacts.length; i++) { // loops through each item to add up the total owed
      owed += this.contacts[i].owed; // add the running total to owed
    }
    return {
      numberOfContacts: this.contacts.length,
      subTotal: owed,
      taxAmount: owed * 0.10,
      total: owed + (owed * 0.10)
    };
  }
  search(params: string) { // params is what is typed in by the user
    // in the HTML input is binded to params, then passed through search on click
    this.contacts = this.contacts.filter((contact: IContact) => { // this is essentially the search function
      return contact.firstName.toLowerCase() === params.toLowerCase(); // will return only things that match, case doesnt matter
    });
  }
}
