import { catchError, of } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cadelas } from '../../interface/cadelas';
import { CadelasService } from '../../service/cadelas.service';

declare var $: any; // Para usar jQuery

@Component({
  selector: 'app-cadelas',
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './cadelas.component.html',
  styleUrl: './cadelas.component.css'
})
export class CadelasComponent implements OnInit {

  cadelaSelecao = "";
  cadelas: Cadelas[] = [];
  cadelasFilhote: Cadelas[] = [];
  cadelasAguardandoCio: Cadelas[] = [];
  cadelasCruzando: Cadelas[] = [];
  cadelasGravida: Cadelas[] = [];
  cadelasComFilhote: Cadelas[]= [];
  cadelasSelecionada: Cadelas[]= [];

  mostrarBotoes: boolean = true;
  hoje: Date = new Date();
  formCadela;

  constructor(private fb: FormBuilder,private sCadelas: CadelasService){ 
    this.formCadela = this.fb.group({
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

  ngOnInit(){
    this.get();
  }

  voltar(): void {
    this.mostrarBotoes = true;
    
  }

  selecionarCadelas(cadelasSelecao: any) {
    this.cadelaSelecao = cadelasSelecao;
    this.cadelasSelecionada = [];
    this.mostrarBotoes = false;
  
    switch (cadelasSelecao) {
      case 'Filhote':
        this.cadelasSelecionada = [...this.cadelasFilhote];
        break;
      case 'Aguardando Cio':
        this.cadelasSelecionada = [...this.cadelasAguardandoCio];
        break;
      case 'Cruzando':
        this.cadelasSelecionada = [...this.cadelasCruzando];
        break;
      case 'Gravida':
        this.cadelasSelecionada = [...this.cadelasGravida];
        break;
      case 'Com Filhote':
        this.cadelasSelecionada = [...this.cadelasComFilhote];
        break;
      default:
        console.log('Status não corresponde.');
    }
  }

  deletar(id:any){
    if(confirm("Confirma a exclusão?")){
        this.sCadelas.deletar(id).pipe(
        catchError((error) => {
          console.error("Erro ao deletar cadela:", error); 
          alert(`Erro ao deletar cadela: ${error.message}`); 
          return of(null);
        })
      ).subscribe((response) => { 
        if (response) {
          alert(`Cadela deletada com sucesso!`);
          this.cadelasSelecionada.splice(this.cadelasSelecionada.findIndex(objeto => objeto.id === id), 1);
          this.get();
        }
      });
    }
  }

  calcularIdade(obj:Cadelas) {
    const dataNascimento = new Date(obj.dataNascimento);
    const dataAtual = new Date();

    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
    let meses = dataAtual.getMonth() - dataNascimento.getMonth();

    if (meses < 0 || (meses === 0 && dataAtual.getDate() < dataNascimento.getDate())) {
      idade--;
      meses += 12;
    }

    if(idade == 0){
      if(meses > 1){
        return `${meses} meses`;
      }else{
        return `${meses} mês`;
      }
    } else if (idade == 1){
      if (meses == 1) {
        return `${idade} ano e ${meses} mês`;
      }else if (meses >1){
        return `${idade} ano e ${meses} meses`;
      }else{
        return `${idade} ano`;
      }
    }else{
      if (meses > 1) {
        return `${idade} anos e ${meses} meses`;
      }else if (meses == 1){
        return `${idade} anos ${meses} mês`;
      }else{
        return `${idade} anos`;
      }
    }
  }

  get() {
    this.sCadelas.get().subscribe({
      next: (data: Cadelas[]) => { 
        this.cadelasFilhote = [];
        this.cadelasAguardandoCio = [];
        this.cadelasCruzando = [];
        this.cadelasGravida = [];
        this.cadelasComFilhote = [];
        this.cadelas = data.sort((a, b) => {
          return new Date(b.dataNascimento).getTime() - new Date(a.dataNascimento).getTime();
        });
        this.cadelas.forEach((cadela)=>{
          switch (cadela.status) {
            case 'Filhote':
              this.cadelasFilhote.push(cadela);
              break;
            case 'Aguardando Cio':
              this.cadelasAguardandoCio.push(cadela);
              break;
            case 'Cruzando':
              this.cadelasCruzando.push(cadela);
              break;
            case 'Gravida':
              this.cadelasGravida.push(cadela);
              break;
            case 'Com Filhote':
              this.cadelasComFilhote.push(cadela);
              break;
            default:
              console.log('Status não corresponde.');
          }
        });
      },
      error: (error) => {
        console.error('Erro ao buscar dados:', error);
      }
    });
  }

  editar(cadela: Cadelas) {

    let cadelaEditada: Cadelas= { 
      id: cadela.id,
      nome: this.formCadela.get('nome')?.value ?? '',
      pai: this.formCadela.get('pai')?.value ?? '',
      mae: this.formCadela.get('mae')?.value ?? '',
      canilOrigem: this.formCadela.get('canilOrigem')?.value ?? '',
      dataNascimento: this.formCadela.get('dataNascimento')?.value ?? '',
      cor: this.formCadela.get('cor')?.value ?? '',
      raca: this.formCadela.get('raca')?.value ?? ' ',
      status: this.formCadela.get('status')?.value ?? ' ',
      ativo: cadela.ativo
    };

    this.sCadelas.salvar(cadelaEditada).pipe(
      catchError((error) => {
        console.error("Erro ao Edtar cadela:", error); 
        alert(`Erro ao Editar cadela: ${error.message}`); 
        return of(null);
      })
    ).subscribe((response) => { 
      if (response) {
        alert(`Cadela ${cadelaEditada.nome} Editada com sucesso!`);
        $(`#EditarCadela${cadela.id}`).modal('hide');
        this.get();
      }
    });
  }

  abrirModalEditar(cadela:Cadelas) {
    this.formCadela.patchValue({
      nome: cadela.nome,
      mae: cadela.mae,
      pai: cadela.pai,
      canilOrigem: cadela.canilOrigem,
      cor: cadela.cor,
      raca: cadela.raca,
      status: cadela.status,
      dataNascimento: cadela.dataNascimento
    });
    $(`#EditarCadela${cadela.id}`).modal('show');
  }

  abrirModalAlterarStatus(cadela:Cadelas) {
    this.formCadela.patchValue({
      status: cadela.status
    });
    $(`#alterarStatus${cadela.id}`).modal('show');
  }

  alterarStatus(cadela:Cadelas){
    cadela.status = this.formCadela.get('status')?.value ?? cadela.status;

    if(confirm(`Confirma a alteração de Status para ${cadela.status} ?`)){
      this.sCadelas.salvar(cadela).pipe(
        catchError((error) => {
          console.error("Erro ao alterar Status:", error); 
          alert(`Erro ao alterar Status: ${error.message}`); 
          return of(null);
        })
      ).subscribe((response) => { 
        if (response) {
          alert(`Status Alterado para ${cadela.status} com sucesso!`);
          $(`#alterarStatus${cadela.id}`).modal('hide')
          this.get();
        }
      });
    }
  }
}
