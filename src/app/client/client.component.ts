import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Acheteur} from "../model/acheteur.model";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  Clients: any;

  ach!:Acheteur;

  testAch ={
    nom:"",
    ville:""
  }

  constructor(private http:HttpClient) {
  }

  ngOnInit() {
    this.getClients();
  }

  getClients(){
    this.http.get("http://localhost:8888/ACHTEUR-SERVICE/ach/achteurs")
      .subscribe({
        next : data => {
          this.Clients = data
        },
        error : err => {
          console.log(err);
        }
      })
  }

  postAcheteur(add:NgForm){
    let valeur = add.value;
    let dataAch = {nom:valeur.nom, ville:valeur.ville};
    this.http.post("http://localhost:8888/ACHTEUR-SERVICE/ach/achteurs", dataAch)
      .subscribe({
        next:value => { this.getClients() },
        error:err => {
          console.log(err)
        }
      })
  }

  SupprimerAchteur(achteur:Acheteur){
    this.http.delete(`http://localhost:8888/ACHTEUR-SERVICE/ach/achteurs/${achteur.ida}`)
      .subscribe({
        next : value => {
          this.getClients();
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }

  confirmerSuppression(achteur:Acheteur){
    if(confirm('Êtes-vous sûr de vouloir supprimer ce acheteur ?')){
      this.SupprimerAchteur(achteur);
    }else {
      console.log('Suppression annulée.');
    }
  }

  updateAchteur(updAch:NgForm){
    alert("Client updated successfuly");
    let valeur = updAch.value;
    if(valeur.nom==""){
      valeur.nom = this.ach.nom;
    }
    if(valeur.ville==""){
      valeur.ville = this.ach.ville;
    }

    let achUp = {
      nom:valeur.nom,
      ville:valeur.ville
    }
    this.http.put(`http://localhost:8888/ACHTEUR-SERVICE/ach/achteurs/${this.ach.ida}`, achUp)
      .subscribe({
        next:value => { this.getClients() },
        error:err => {
          console.log(err)
        }
      });
  }

  getAchteur(achteur:Acheteur){
    this.ach = achteur;
  }
}
