import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cruzas } from '../interface/cruzas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CruzasService {
  private apiUrl = "https://2ih8obvwec.execute-api.us-east-1.amazonaws.com/items";
  
    constructor(private http: HttpClient) { }
  
    salvar( obj: Cruzas) {
      return this.http.put(this.apiUrl, { tabela: "cruza", item: obj });
    }
  
    deletar(id: string) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          tabela: "cruza",
          id: id
        }
      };
      return this.http.delete(this.apiUrl, options);
    }
  
    get(): Observable<Cruzas[]> {
      const url = `${this.apiUrl}/cruza`;
      return this.http.get<Cruzas[]>(url);
    }
  }
  