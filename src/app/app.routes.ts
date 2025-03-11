import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadelasComponent } from './listar/cadelas/cadelas.component';
import { MachosComponent } from './listar/machos/machos.component';
import { CruzasComponent } from './listar/cruzas/cruzas.component';
import { NinhadasComponent } from './listar/ninhadas/ninhadas.component';
import { CadCadelaComponent } from './cadastrar/cad-cadela/cad-cadela.component';
import { CadMachoComponent } from './cadastrar/cad-macho/cad-macho.component';
import { CadCruzaComponent } from './cadastrar/cad-cruza/cad-cruza.component';
import { CadNinhadaComponent } from './cadastrar/cad-ninhada/cad-ninhada.component';
import { CadFilhoteComponent } from './cadastrar/cad-filhote/cad-filhote.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: "listarCadelas", component: CadelasComponent },
  { path: "listarMachos", component: MachosComponent },
  { path: "listarCruzas", component: CruzasComponent },
  { path: "listarNinhadas", component: NinhadasComponent },
  { path: "cadastrarCadela", component: CadCadelaComponent },
  { path: "cadastrarMacho", component: CadMachoComponent },
  { path: "cadastrarCruza", component: CadCruzaComponent },
  { path: "cadastrarNinhada", component: CadNinhadaComponent },
  { path: "cadastrarFilhote", component: CadFilhoteComponent}
];
