import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CruzasService } from '../../service/cruzas.service';
import { MachosService } from '../../service/machos.service';
import { CadelasService } from '../../service/cadelas.service';
import { Machos } from '../../interface/machos';
import { Cruzas } from '../../interface/cruzas';
import { catchError, of } from 'rxjs';
import { Cadelas } from '../../interface/cadelas';

declare var $: any; // Para usar jQuery

@Component({
  selector: 'app-cruzas',
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './cruzas.component.html',
  styleUrl: './cruzas.component.css'
})
export class CruzasComponent implements OnInit{
  formCruza;
  machos: string[] = [];
  cadelas: string[] = [];

  cruzas: Cruzas[] = [];
    constructor(private fb: FormBuilder,private sCruzas: CruzasService,private sMachos: MachosService, private sCadelas: CadelasService){ 
      this.formCruza = this.fb.group({
        id:["",[Validators.minLength(1)]],
        macho:["",[Validators.minLength(2),Validators.required]],
        femea:["",[Validators.minLength(2),Validators.required]],
        data:["",[Validators.minLength(2),Validators.required]]
      })
    }
  
    ngOnInit(){
      this.get();
      this.getNomes();
    }
  
    get() {
      this.sCruzas.get().subscribe({
        next: (data: Cruzas[]) => { 
          this.cruzas = data.sort((a, b) => {
            return new Date(b.data).getTime() - new Date(a.data).getTime();
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

  deletar(id:any){
        if(confirm("Confirma a exclusão?")){
          this.sCruzas.deletar(id).pipe(
            catchError((error) => {
            console.error("Erro ao deletar:", error); 
            alert(`Erro ao deletar: ${error.message}`); 
            return of(null);
          })
          ).subscribe((response) => { 
            if (response) {
              alert(`Cruza deletada com sucesso!`);
              this.cruzas.splice(this.cruzas.findIndex(objeto => objeto.id === id), 1);
              this.cruzas = [...this.cruzas];
            }
          });
        }
      }

  editar() {
    let cruzaEditada: Cruzas= { 
      id: this.formCruza.get('id')?.value ?? '',
      macho: this.formCruza.get('macho')?.value ?? '',
      femea: this.formCruza.get("femea")?.value ?? '',
      data: this.formCruza.get('data')?.value ?? ''
    };
    this.sCruzas.salvar(cruzaEditada).pipe(
      catchError((error) => {
        console.error("Erro ao Editar Cruza:", error); 
        alert(`Erro ao Editar Cruza: ${error.message}`); 
        return of(null);
      })).subscribe((response) => { 
        if (response) {
          this.cruzas = this.cruzas.map(cruza => {
            if (cruza.id === cruzaEditada.id) {
              return cruzaEditada;
            } else {
              return cruza;
            }
          });
        }
        alert(`Cruza de ${cruzaEditada.femea} com ${cruzaEditada.macho} Editada com sucesso!`);
        $("#modalEditar").modal('hide');
      });
  }

  abrirModalEditar(cruza:Cruzas) {
    this.formCruza.patchValue({
      id: cruza.id,
      femea: cruza.femea,
      macho: cruza.macho,
      data: cruza.data,
    });
    $("#modalEditar").modal('show');
  }
} 