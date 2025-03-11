import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cadelas } from '../interface/cadelas';
import { Machos } from '../interface/machos';

@Injectable({
  providedIn: 'root'
})
export class FilhoteService {
  private apiUrl = "https://2ih8obvwec.execute-api.us-east-1.amazonaws.com/items";
  
    constructor(private http: HttpClient) { }
  
    salvarCadela( obj: Cadelas) {
      let tabela = "cadelas";
      let item: Cadelas = {
        id: obj.id,
        nome: obj.nome,
        pai: obj.pai,
        mae: obj.mae,
        canilOrigem: obj.canilOrigem,
        dataNascimento: obj.dataNascimento,
        cor: obj.cor,
        raca: obj.raca,
        status: obj.status || "",
        ativo: "1"
      };
      let body = {tabela, item};
      console.log(body);
      return this.http.put(this.apiUrl, body);
    }
  
    salvarMacho(obj: Machos){
      let item: Machos = {
        id: obj.id,
        nome: obj.nome,
        pai: obj.pai,
        mae: obj.mae,
        canilOrigem: obj.canilOrigem,
        dataNascimento: obj.dataNascimento,
        cor: obj.cor,
        raca: obj.raca,
        ativo: "1"
      }
      return this.http.put(this.apiUrl, { tabela: "macho", item: item });
      
    }
  }
  