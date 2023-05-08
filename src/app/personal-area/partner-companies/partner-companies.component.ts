import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    'name',
    'email',
    'vat',
    'phone',
    'country',
    'addresses',
  ];

  constructor(private http: HttpClient) {}

  //Get the data from API and push them in the companiesList array
  ngOnInit(): void {
    this.http
      .get<Response>('https://fakerapi.it/api/v1/companies?_quantity=100')
      .subscribe((response: Response) => {
        for (let i = 0; i < 100; i++) {
          this.companiesList.push({
            id: response.data[i].id,
            name: response.data[i].name,
            email: response.data[i].email,
            vat: response.data[i].vat,
            phone: response.data[i].phone,
            country: response.data[i].country,
            addresses: response.data[i].addresses,
            website: response.data[i].website,
            image: response.data[i].image,
            contact: response.data[i].contact,
          });
        }
      });
    console.log(this.companiesList);
  }
}
