import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cadelas } from '../interface/cadelas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadelasService {
  private apiUrl = "https://2ih8obvwec.execute-api.us-east-1.amazonaws.com/items";
  
    constructor(private http: HttpClient) { }
  
    salvar( obj: Cadelas) {
      let tabela = "cadelas";
      let item = obj;
      let body = {tabela, item};
      console.log(body);
      return this.http.put(this.apiUrl, body);
    }
  
    deletar(id: string) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          tabela: "cadelas",
          id: id
        }
      };
      return this.http.delete(this.apiUrl, options);
    }
  
    get(): Observable<Cadelas[]> {
      const url = `${this.apiUrl}/cadelas`;
      return this.http.get<Cadelas[]>(url);
    }
  }
  