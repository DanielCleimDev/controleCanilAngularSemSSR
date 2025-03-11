import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { Cadelas } from '../../interface/cadelas';
import { Machos } from '../../interface/machos';
import { Ninhadas } from '../../interface/ninhadas';
import { CadelasService } from '../../service/cadelas.service';
import { MachosService } from '../../service/machos.service';
import { NinhadasService } from '../../service/ninhadas.service';

@Component({
  selector: 'app-cad-ninhada',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cad-ninhada.component.html',
  styleUrl: './cad-ninhada.component.css'
})
export class CadNinhadaComponent implements OnInit{

  formNinhada;  
  hoje:Date =  new Date();
  machos: string[] = [];
  cadelas: string[] = [];


  constructor(private sMachos: MachosService, private fb: FormBuilder,private sNinhadas:NinhadasService, private sCadelas: CadelasService){
    this.formNinhada = this.fb.group({
      pai:["",[Validators.minLength(2),Validators.required]],
      mae:["",[Validators.minLength(2),Validators.required]],
      qtdMacho:["",[Validators.minLength(2),Validators.required]],
      qtdFemea:["",[Validators.minLength(2),Validators.required]],
      dataNascimento:["",[Validators.minLength(2),Validators.required]],
      raca:["",[Validators.minLength(2),Validators.required]],
    })
  }

  ngOnInit(){
    this.getNomes();
  }

  getNomes() {
    this.sMachos.get().subscribe({
            next: (data: Machos[]) => { 
               const dados = data.sort((a, b) => {
                return b.nome.localeCompare(a.nome);
              });
              dados.map(dados=>{this.machos.push(dados.nome);});
            },
            error: (error) => {
              console.error('Erro ao buscar dados:', error);
            }
          });

    this.sCadelas.get().subscribe({
      next: (data: Cadelas[]) => { 
        const dados = data.sort((a, b) => {
          return b.nome.localeCompare(a.nome);
        });
        dados.map(dados=>{this.cadelas.push(dados.nome);});
      },
      error: (error) => {
        console.error('Erro ao buscar dados:', error);
      }
    });
      }

  salvar() {
        const ninhada: Ninhadas = { 
          id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
          pai: this.formNinhada.get('pai')?.value ?? '',
          mae: this.formNinhada.get('mae')?.value ?? '',
          qtdFemea: this.formNinhada.get('qtdFemea')?.value ?? '',
          qtdMacho: this.formNinhada.get('qtdMacho')?.value ?? '',
          dataNascimento: this.formNinhada.get('dataNascimento')?.value ?? '',
          raca: this.formNinhada.get('raca')?.value ?? ' '  
        };
        console.log(JSON.stringify(ninhada));
        this.sNinhadas.salvar(ninhada).pipe(
          catchError((error) => {
            console.error("Erro ao salvar Ninhada:", error); 
            alert(`Erro ao salvar Ninhada: ${error.message}`); 
            return of(null);
          })
        ).subscribe((response) => { 
          if (response) {
            alert(`Ninhada salva com sucesso!`);
            console.log(response);
            this.formNinhada.reset();
          }
        });
        
      }

}
