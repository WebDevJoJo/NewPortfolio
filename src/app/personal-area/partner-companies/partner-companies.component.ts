import { Component, OnInit } from '@angular/core';

interface Response {
  status: string;
  code: number;
  total: number;
  data: CompanyDetails[];
}

interface CompanyDetails {
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

interface CompanyAddresses {
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

interface CompanyContact {
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

interface ContactAddress {
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
  companiesList: CompanyDetails[] = [];
  dataSource = this.companiesList;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'vat',
    'phone',
    'country',
    'addresses',
  ];

  ngOnInit(): void {
    this.populateCompaniesListArray();
  }

  async fetchData(): Promise<CompanyDetails[]> {
    const response = await fetch('https://fakerapi.it/api/v1/companies?');
    const data = await response.json();
    return data.data as CompanyDetails[];
  }

  async populateCompaniesListArray(): Promise<void> {
    const companiesList = await this.fetchData();
    this.companiesList.push(...companiesList);
    console.log(this.companiesList);
  }
}
