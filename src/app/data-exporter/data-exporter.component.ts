import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface Data {
  name: string;
  items: User[];
}

@Component({
  selector: 'app-data-exporter',
  templateUrl: './data-exporter.component.html',
  styleUrls: ['./data-exporter.component.css']
})
export class DataExporterComponent implements OnInit {
  data: Data = {
    name: "Example",
    items: []
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<{ users: User[] }>('https://dummyjson.com/users')
    .subscribe(response => {
      this.data.items = response.users.map(user => ({
        id: user.id,
        firstName: user.firstName,  
        lastName: user.lastName     
      }));
    });
  }

  downloadJson(): void {
    const fileName = "data.json";
    const json = JSON.stringify(this.data);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
}
