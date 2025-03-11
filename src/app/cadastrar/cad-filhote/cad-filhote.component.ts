import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilhoteService } from '../../service/filhote.service';
import { Filhote } from '../../interface/filhote';
import { Cadelas } from '../../interface/cadelas';
import { catchError, of } from 'rxjs';
import { Machos } from '../../interface/machos';

@Component({
  selector: 'app-cad-filhote',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cad-filhote.component.html',
  styleUrl: './cad-filhote.component.css'
})
export class CadFilhoteComponent implements OnInit{

  sexoSelecionado = '';
  ninhada;
  formFilhote;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private sFilhote: FilhoteService) {
    this.ninhada = {} as Filhote;
    this.formFilhote=this.fb.group({
      nome:["",[Validators.minLength(2),Validators.required]],
      pai:["",[Validators.minLength(2),Validators.required]],
      mae:["",[Validators.minLength(2),Validators.required]],
      canilOrigem:["",[Validators.minLength(2),Validators.required]],
      dataNascimento:["",[Validators.minLength(2),Validators.required]],
      cor:["",[Validators.minLength(2),Validators.required]],
      sexo:["",[Validators.minLength(2),Validators.required]],
      raca:["",[Validators.minLength(2),Validators.required]],
      status:["",[Validators.minLength(2),Validators.required]]
    })
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.ninhada = JSON.parse(params['ninhada']);
    });
    this.formFilhote.patchValue({
      mae: this.ninhada.mae,
      pai: this.ninhada.pai,
      dataNascimento: this.ninhada.dataNascimento
    });
  }

  salvar(){
    
    if((this.formFilhote.get('sexo')?.value ?? '') === 'Fêmea'){
      let cadela: Cadelas = { 
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        nome: this.formFilhote.get('nome')?.value ?? '',
        pai: this.formFilhote.get('pai')?.value ?? '',
        mae: this.formFilhote.get('mae')?.value ?? '',
        canilOrigem: this.formFilhote.get('canilOrigem')?.value ?? '',
        dataNascimento: this.formFilhote.get('dataNascimento')?.value ?? '',
        status: this.formFilhote.get('status')?.value ?? ' ',
        cor: this.formFilhote.get('cor')?.value ?? '',
        raca: this.formFilhote.get('raca')?.value ?? ' ',
        ativo: "1"
      }
      this.sFilhote.salvarCadela(cadela).pipe(
        catchError((error) => {
          console.error("Erro ao salvar cadela:", error); 
          alert(`Erro ao salvar cadela: ${error.message}`); 
          return of(null);
        })
      ).subscribe((response) => { 
        if (response) {
          alert(`Cadela ${cadela.nome} salva com sucesso!`);
          this.formFilhote.reset();
        }
      });
    }
    if((this.formFilhote.get('sexo')?.value ?? '') === "Macho"){

      let macho: Machos = { 
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        nome: this.formFilhote.get('nome')?.value ?? '',
        pai: this.formFilhote.get('pai')?.value ?? '',
        mae: this.formFilhote.get('mae')?.value ?? '',
        canilOrigem: this.formFilhote.get('canilOrigem')?.value ?? '',
        dataNascimento: this.formFilhote.get('dataNascimento')?.value ?? '',
        cor: this.formFilhote.get('cor')?.value ?? '',
        raca: this.formFilhote.get('raca')?.value ?? ' ',
        ativo: "1"
      }
      this.sFilhote.salvarMacho(macho).pipe(
        catchError((error) => {
          console.error("Erro ao salvar Macho:", error); 
          alert(`Erro ao salvar Macho: ${error.message}`); 
          return of(null);
        })
      ).subscribe((response) => { 
        if (response) {
          alert(`Macho ${macho.nome} salvo com sucesso!`);
          this.formFilhote.reset();
        }
      });
    }
  }

  onSexoChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.sexoSelecionado = target.value;
    }
  }
}
