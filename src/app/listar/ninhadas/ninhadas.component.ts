import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ninhadas } from '../../interface/ninhadas';
import { NinhadasService } from '../../service/ninhadas.service';
import { Router } from '@angular/router';
import { MachosService } from '../../service/machos.service';
import { CadelasService } from '../../service/cadelas.service';
import { Machos } from '../../interface/machos';
import { Cadelas } from '../../interface/cadelas';
import { catchError, of } from 'rxjs';

declare var $: any; // Para usar jQuery

@Component({
  selector: 'app-ninhadas',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './ninhadas.component.html',
  styleUrl: './ninhadas.component.css'
})
export class NinhadasComponent implements OnInit{

  formNinhada;
  hoje:Date =  new Date();
  machos: string[] = [];
  cadelas: string[] = [];

  ninhadas: Ninhadas[] = [];

  constructor(private fb: FormBuilder,private sNinhadas: NinhadasService, private router: Router,private sMachos: MachosService,private sCadelas: CadelasService){ 
    this.formNinhada = this.fb.group({
      id:["",[Validators.minLength(2)]],
      pai:["",[Validators.minLength(2),Validators.required]],
      mae:["",[Validators.minLength(2),Validators.required]],
      qtdMacho:["",[Validators.minLength(2),Validators.required]],
      qtdFemea:["",[Validators.minLength(2),Validators.required]],
      dataNascimento:["",[Validators.minLength(2),Validators.required]],
      raca:["",[Validators.minLength(2),Validators.required]],
    })
  }
  
  ngOnInit(){
    this.get();
    this.getNomes();
  }

  cadastrarFilhote(ninhada: Ninhadas) {
    this.router.navigate(['/cadastrarFilhote'], { queryParams: { ninhada: JSON.stringify(ninhada) } });
  }

  get() {
    this.sNinhadas.get().subscribe({
      next: (data: Ninhadas[]) => { 
        this.ninhadas = data.sort((a, b) => {
          return new Date(b.dataNascimento).getTime() - new Date(a.dataNascimento).getTime();
        });
      },
      error: (error) => {
        console.error('Erro ao buscar dados:', error);
      }
    });
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

  deletar(id:any){
    if(confirm("Confirma a exclusão?")){
      this.sNinhadas.deletar(id).pipe(
        catchError((error) => {
          console.error("Erro ao deletar:", error); 
          alert(`Erro ao deletar: ${error.message}`); 
          return of(null);
        })).subscribe((response) => { 
          if (response) {
            alert(`Ninhada deletada com sucesso!`);
            this.ninhadas.splice(this.ninhadas.findIndex(objeto => objeto.id === id), 1);
            this.ninhadas = [...this.ninhadas];
          }
        }
      );
    }
  }

  editar() {
    let ninhadaEditada: Ninhadas= { 
      id: this.formNinhada.get('id')?.value ?? '',
      pai: this.formNinhada.get('pai')?.value ?? '',
      mae: this.formNinhada.get('mae')?.value ?? '',
      qtdFemea: this.formNinhada.get('qtdFemea')?.value ?? '',
      qtdMacho: this.formNinhada.get('qtdMacho')?.value ?? '',
      dataNascimento: this.formNinhada.get('dataNascimento')?.value ?? '',
      raca: this.formNinhada.get('raca')?.value ?? ' '
    };
    this.sNinhadas.salvar(ninhadaEditada).pipe(
      catchError((error) => {
        console.error("Erro ao Editar Ninhada:", error); 
        alert(`Erro ao Editar Ninhada: ${error.message}`); 
        return of(null);
      })).subscribe((response) => { 
        if (response) {
          this.ninhadas = this.ninhadas.map(ninhada => {
            if (ninhada.id === ninhadaEditada.id) {
              return ninhadaEditada;
            } else {
              return ninhada;
            }
          });
        }
        alert(`Ninhada Editada com sucesso!`);
        $("#modalEditar").modal('hide');
      });
    }
  
  abrirModalEditar(ninhada: Ninhadas) {
    this.formNinhada.patchValue({
      id: ninhada.id,
      pai: ninhada.pai,
      mae: ninhada.mae,
      qtdFemea: ninhada.qtdFemea,
      qtdMacho: ninhada.qtdMacho,
      dataNascimento: ninhada.dataNascimento,
      raca: ninhada.raca
    });
    $("#modalEditar").modal('show');
  }
}