import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { findIndex } from 'rxjs';

export interface Response {
  status: string;
  code: number;
  total: number;
  data: CompanyDetails[];
}

export interface CompanyDetails {
  id: number;
  name: string;
  email: string;
  vat: number;
  phone: number;
  country: string;
  addresses: CompanyAddresses[];
  website: string;
  image: string;
  contact: CompanyContact;
}

export interface CompanyAddresses {
  id: number;
  street: string;
  streetName: string;
  buildingNumber: number;
  city: string;
  zipcode: number;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
}

export interface CompanyContact {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  birthday: number;
  gender: string;
  address: ContactAddress;
  website: string;
  image: string;
}

export interface ContactAddress {
  id: number;
  street: string;
  streetName: string;
  buildingNumber: number;
  city: string;
  zipcode: number;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-partner-companies',
  templateUrl: './partner-companies.component.html',
  styleUrls: ['./partner-companies.component.scss'],
  providers: [MatDialog],
})
export class PartnerCompaniesComponent implements OnInit {
  extendedDetails: CompanyDetails[] = [];
  companiesList: CompanyDetails[] = [];
  filteredCompanies: CompanyDetails[] = [];
  dataSource: CompanyDetails[] = [];
  countriesList: string[] = [];
  countriesSortedList: string[] = [];
  displayedColumns: string[] = [
    'name',
    'email',
    'vat',
    'phone',
    'country',
    'addresses',
  ];
  searchName: string = '';
  searchEmail: string = '';
  searchVat: string = '';
  searchPhone: string = '';
  searchCountry: string = '';
  selectedCountry = '';

  callParams = new HttpParams();

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    const url = 'https://fakerapi.it/api/v1/companies';
    this.callParams = this.callParams.append('_quantity', 100);
    this.http
      .get<Response>(url, { params: this.callParams })
      .subscribe((data) => {
        this.companiesList = data.data;
        this.filteredCompanies = this.companiesList;
        this.dataSource = this.filteredCompanies;
        this.filteredCompanies.forEach((company) => {
          this.countriesList.push(company.country);
          this.countriesList.sort();
        });
        this.countriesSortedList = [...new Set(this.countriesList)];
      });
  }

  companiesFilters(): void {
    if (
      this.searchName ||
      this.searchEmail ||
      this.searchVat ||
      this.searchPhone ||
      this.searchCountry
    ) {
      this.filteredCompanies = this.companiesList.filter(
        (item) =>
          item.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
          item.email.toLowerCase().includes(this.searchEmail.toLowerCase()) &&
          item.vat
            .toString()
            .toLowerCase()
            .includes(this.searchVat.toString().toLowerCase()) &&
          item.phone
            .toString()
            .toLowerCase()
            .includes(this.searchPhone.toString().toLowerCase()) &&
          item.country.includes(this.searchCountry)
      );
    } else {
      this.filteredCompanies = this.companiesList;
    }
    this.dataSource = this.filteredCompanies;
  }

  resetCompaniesFilters() {
    this.searchName = '';
    this.searchEmail = '';
    this.searchVat = '';
    this.searchPhone = '';
    this.searchCountry = '';
    this.companiesFilters();
  }

  openDialog(row: CompanyDetails): void {
    const dialogRef = this.dialog.open(DialogCompany, {
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed');
    });
  }
}

@Component({
  selector: 'dialog-company',
  templateUrl: 'dialog-company.html',
  styleUrls: ['./partner-companies.component.scss'],
})
export class DialogCompany {
  apiUrl: string = '';
  newName: string = '';
  showElementNameInput: boolean = false;
  showElementEmailInput: boolean = false;
  showElementVatInput: boolean = false;
  showElementPhoneInput: boolean = false;
  showElementWebsiteInput: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogCompany>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyDetails,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const json = JSON.stringify(this.data);
    const urlEncodedString = encodeURIComponent(json);
    console.log(urlEncodedString);
    const apiUrl = urlEncodedString;
    console.log('--------------------------------');
    console.log(apiUrl);
    console.log(json);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickModify(newName: string) {
    const payload = {
      [this.data.name]: newName,
    };

    this.http.patch(this.apiUrl, payload).subscribe(
      () => {
        console.log('Update successful');
      },
      (error) => {
        console.log('Update failed:', error);
      }
    );
  }

  toggleElementNameInput() {
    this.showElementNameInput = !this.showElementNameInput;
  }
  toggleElementEmailInput() {
    this.showElementEmailInput = !this.showElementEmailInput;
  }
  toggleElementVatInput() {
    this.showElementVatInput = !this.showElementVatInput;
  }
  toggleElementPhoneInput() {
    this.showElementPhoneInput = !this.showElementPhoneInput;
  }
  toggleElementWebsiteInput() {
    this.showElementWebsiteInput = !this.showElementWebsiteInput;
  }
}
