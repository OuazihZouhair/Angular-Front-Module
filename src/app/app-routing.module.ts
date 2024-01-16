import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from "./product/product.component";
import {AuthGuard} from "./guards/auth.guard";
import {ClientComponent} from "./client/client.component";

const routes: Routes = [
  { path : "products", component : ProductComponent, /*canActivate:[AuthGuard], data : {roles:['ADMIN']} */},
  { path : "clients", component : ClientComponent, /*canActivate:[AuthGuard], data : {roles:['USER']} */}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
