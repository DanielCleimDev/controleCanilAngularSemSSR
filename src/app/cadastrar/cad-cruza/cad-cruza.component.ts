import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CruzasService } from '../../service/cruzas.service';
import { MachosService } from '../../service/machos.service';
import { CadelasService } from '../../service/cadelas.service';
import { Machos } from '../../interface/machos';
import { Cadelas } from '../../interface/cadelas';
import { Cruzas } from '../../interface/cruzas';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-cad-cruza',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cad-cruza.component.html',
  styleUrl: './cad-cruza.component.css'
})
export class CadCruzaComponent implements OnInit {
  formCruza;
  machos: string[] = [];
  cadelas: string[] = [];

  constructor(
    private fb: FormBuilder,
    private sCruzas: CruzasService,
    private sMachos: MachosService,
    private sCadelas: CadelasService
  ) {
      this.formCruza = this.fb.group({
        macho:["",[Validators.minLength(2),Validators.required]],
        femea:["",[Validators.minLength(2),Validators.required]],
        data:["",[Validators.minLength(2),Validators.required]]
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
    const cruza: Cruzas = { 
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      macho: this.formCruza.get('macho')?.value ?? '',
      femea: this.formCruza.get('femea')?.value ?? '',
      data: this.formCruza.get('data')?.value ?? ''
    };
    this.sCruzas.salvar(cruza).pipe(
      catchError((error) => {
        console.error("Erro ao salvar cruza:", error); 
        alert(`Erro ao salvar cruza: ${error.message}`); 
        return of(null);
      })
      ).subscribe((response) => { 
        if (response) {
          alert(`cruza de ${cruza.femea} com ${cruza.macho} salvo com sucesso!`);
          this.formCruza.reset();
        }
    });
  }
}
