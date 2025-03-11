import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { Machos } from '../../interface/machos';
import { MachosService } from '../../service/machos.service';

@Component({
  selector: 'app-cad-macho',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cad-macho.component.html',
  styleUrl: './cad-macho.component.css'
})
export class CadMachoComponent {
  formMacho;

  constructor(private fb: FormBuilder,private sMachos: MachosService
      ) {
        this.formMacho = this.fb.group({
          nome:["",[Validators.minLength(2),Validators.required]],
          pai:["",[Validators.minLength(2),Validators.required]],
          mae:["",[Validators.minLength(2),Validators.required]],
          canilOrigem:["",[Validators.minLength(2),Validators.required]],
          dataNascimento:["",[Validators.minLength(2),Validators.required]],
          cor:["",[Validators.minLength(2),Validators.required]],
          raca:["",[Validators.minLength(2),Validators.required]],
          status:["",[Validators.minLength(2),Validators.required]]
        })
      }

  salvar() {
        const macho: Machos = { 
          id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
          nome: this.formMacho.get('nome')?.value ?? '',
          pai: this.formMacho.get('pai')?.value ?? '',
          mae: this.formMacho.get('mae')?.value ?? '',
          canilOrigem: this.formMacho.get('canilOrigem')?.value ?? '',
          dataNascimento: this.formMacho.get('dataNascimento')?.value ?? '',
          cor: this.formMacho.get('cor')?.value ?? '',
          raca: this.formMacho.get('raca')?.value ?? ' ',
          ativo: "1"
        };
        this.sMachos.salvar(macho).pipe(
          catchError((error) => {
            console.error("Erro ao salvar Macho:", error); 
            alert(`Erro ao salvar Macho: ${error.message}`); 
            return of(null);
          })
        ).subscribe((response) => { 
          if (response) {
            alert(`Macho ${macho.nome} salvo com sucesso!`);
            this.formMacho.reset();
          }
        });
        
      }

}
