import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

//Interface returned from the API, in pieces
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

//Companies component - main component
@Component({
  selector: 'app-partner-companies',
  templateUrl: './partner-companies.component.html',
  styleUrls: ['./partner-companies.component.scss'],
  providers: [MatDialog],
})
export class PartnerCompaniesComponent implements OnInit {
  //Properties defined and inizialized
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
  sliceOfFilteredCompanies: CompanyDetails[] = [];
  startIndex: number = 0;
  endIndex: number = 0;
  pageNumber: number = 1;
  pageLength: number = 10;
  maxPages: number = 10;

  callParams = new HttpParams();

  //Constructors for companies page - private and public
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  //Function that populate a companiesList array and a countriesList aray with data from API usin a get call on intializing
  ngOnInit(): void {
    const url = 'https://fakerapi.it/api/v1/companies';
    this.callParams = this.callParams.append('_quantity', 100);
    this.http
      .get<Response>(url, { params: this.callParams })
      .subscribe((data) => {
        this.companiesList = data.data;
        this.filteredCompanies = this.companiesList;
        this.filteredCompanies.forEach((company) => {
          this.countriesList.push(company.country);
          this.countriesList.sort();
        });
        this.countriesSortedList = [...new Set(this.countriesList)];
        this.filteredCompaniesArraySlicer();
      });
  }

  //Function that filter all data by the inputs tiped by user
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
    this.pageNumber = 1;
    this.filteredCompaniesArraySlicer();
  }

  //Function that reset all filters value to ''
  resetCompaniesFilters() {
    this.searchName = '';
    this.searchEmail = '';
    this.searchVat = '';
    this.searchPhone = '';
    this.searchCountry = '';
    this.companiesFilters();
  }

  //Function that make user navigate forward in table pages
  pageChangerForward() {
    this.pageNumber++;
    this.filteredCompaniesArraySlicer();
  }

  //Function that make user navigate back in table pages
  pageChangerBack() {
    this.pageNumber--;
    this.filteredCompaniesArraySlicer();
  }

  pageLengthChanging() {
    this.pageNumber = 1;
    this.filteredCompaniesArraySlicer();
  }

  //Function
  filteredCompaniesArraySlicer() {
    this.startIndex = (this.pageNumber - 1) * this.pageLength;
    this.endIndex = this.startIndex + this.pageLength;
    this.sliceOfFilteredCompanies = this.filteredCompanies.slice(
      this.startIndex,
      this.endIndex
    );
    this.maxPages = Math.ceil(this.filteredCompanies.length / this.pageLength);
    this.dataSource = this.sliceOfFilteredCompanies;
  }

  //Dialog component trigger
  openDialog(row: CompanyDetails): void {
    const dialogRef = this.dialog.open(DialogCompany, {
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}

//Dialog component - secondary
@Component({
  selector: 'dialog-company',
  templateUrl: 'dialog-company.html',
  styleUrls: ['./partner-companies.component.scss'],
})
export class DialogCompany {
  //Properties defined and inizialized
  apiUrl: string = '';
  newName: string = '';
  newEmail: string = '';
  newVat: string = '';
  newPhone: string = '';
  newWebsite: string = '';
  showElementNameInput: boolean = false;
  showElementEmailInput: boolean = false;
  showElementVatInput: boolean = false;
  showElementPhoneInput: boolean = false;
  showElementWebsiteInput: boolean = false;

  //Dialog component constructors
  constructor(
    public dialogRef: MatDialogRef<DialogCompany>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyDetails,
    private http: HttpClient
  ) {}

  //Dialog closing trigger
  onNoClick(): void {
    this.dialogRef.close();
  }

  //Edit property triggers
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

  //Patch call from API (for name)
  patchFunction() {
    const apiUrl = 'https://fakerapi.it/api/v1/companies';

    const payload = {
      name: this.newName,
      email: this.newEmail,
      vat: this.newVat,
      phone: this.newPhone,
      website: this.newWebsite,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.patch(apiUrl, payload, { headers }).subscribe(
      (response) => {
        console.log('Patch success: ', response);
      },
      (error) => {
        console.error('Patch error occurred: ', error);
      }
    );
  }

  // patchCompanyName (newName: string): Observable<{}> {
  // const url = 'https://fakerapi.it/api/v1/companies';
  //  return this.httpClient.patch(url, {name: newName}, httpOptions)
  //    .pipe(catchError(this.handleError('patchError')));
  // }
}
