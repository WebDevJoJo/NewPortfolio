import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

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
  dataSource: CompanyDetails[] = [];
  searchName: string = '';
  searchEmail: string = '';
  searchVat: string = '';
  searchPhone: string = '';
  searchCountry: string = '';
  selectedCountry = '';
  filteredCompanies = this.companiesList;

  ngOnInit(): void {
    this.populateCompaniesListCountriesList();
  }

  async fetchData(): Promise<CompanyDetails[]> {
    const response = await fetch(
      'https://fakerapi.it/api/v1/companies?_quantity=100'
    );
    const data = await response.json();
    return data.data as CompanyDetails[];
  }

  async populateCompaniesListCountriesList(): Promise<void> {
    const companiesList = await this.fetchData();
    this.companiesList.push(...companiesList);
    this.countriesList = companiesList.map((company) => company.country);
    this.dataSource = companiesList;
    this.sortedCountriesFilterConstructor();
  }

  sortedCountriesFilterConstructor() {
    this.countriesList.sort();
    this.countriesSortedList = [...new Set(this.countriesList)];
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

  constructor(public dialog: MatDialog) {}

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
})
export class DialogCompany {
  constructor(
    public dialogRef: MatDialogRef<DialogCompany>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyDetails
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
