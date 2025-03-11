import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Machos } from '../interface/machos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachosService {
  private apiUrl = "https://2ih8obvwec.execute-api.us-east-1.amazonaws.com/items";
  
    constructor(private http: HttpClient) { }
  
    salvar( obj: Machos) {
      return this.http.put(this.apiUrl, { tabela: "macho", item: obj });
    }
  
    deletar(id: string) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          tabela: "macho",
          id: id
        }
      };
      return this.http.delete(this.apiUrl, options);
    }
  
    get(): Observable<Machos[]> {
      const url = `${this.apiUrl}/macho`;
      return this.http.get<Machos[]>(url);
    }
  }
  