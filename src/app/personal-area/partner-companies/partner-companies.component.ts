import { Component, OnInit } from '@angular/core';

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
  contact: CompanyContact[];
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
  address: ContactAddress[];
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
})
export class PartnerCompaniesComponent implements OnInit {
  filtersCategoryNotApplied: string = 'Name, Email, VAT, Phone, Country';
  filtersCategoryApplied: string =
    this.filtersCategoryNotApplied + ' | FILTERS APPLIED!';
  filtersCategory: string = this.filtersCategoryNotApplied;
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
            .includes(this.searchVat.toLowerCase()) &&
          item.phone
            .toString()
            .toLowerCase()
            .includes(this.searchPhone.toLowerCase()) &&
          item.country.includes(this.searchCountry)
      );
    } else {
      this.filteredCompanies = this.companiesList;
    }
    this.dataSource = this.filteredCompanies;
  }

  checkFilters(): void {
    if (
      (this.searchName ||
        this.searchEmail ||
        this.searchVat ||
        this.searchPhone ||
        this.searchCountry) &&
      this.filteredCompanies.length != 100
    ) {
      this.filtersCategory = this.filtersCategoryApplied;
    } else {
      this.companiesFilters();
    }
  }

  resetCompaniesFilters() {
    this.searchName = '';
    this.searchEmail = '';
    this.searchVat = '';
    this.searchPhone = '';
    this.searchCountry = '';
    this.companiesFilters();
  }
}
