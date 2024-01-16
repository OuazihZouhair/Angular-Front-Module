import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Produit} from "../model/produit.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  Products: any;

  pr!:Produit;

  test ={
    marque :"",
    description:"",
    prix:"",
    quantite:""
  }
  constructor(private http:HttpClient) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.http.get("http://localhost:8888/PRODUIT-SERVICE/pro/produits")
      .subscribe({
        next : data => {
          this.Products = data
        },
        error : err => {
          console.log(err);
        }
      })
  }

  SupprimerProduit(produit : Produit) {
    this.http.delete(`http://localhost:8888/PRODUIT-SERVICE/pro/produits/${produit.idp}`)
      .subscribe({
        next : value => {
          this.getProducts();
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }

  confirmerSuppression(produit: Produit): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.SupprimerProduit(produit);
    } else {
      console.log('Suppression annulée.');
    }
  }

  postProduit(add:NgForm){
    let valeur= add.value;
    let data = {marque :valeur.marque, description:valeur.description, prix:valeur.prix, quantite:valeur.quantite}
    this.http.post("http://localhost:8888/PRODUIT-SERVICE/pro/produits", data)
      .subscribe({
        next:value => { this.getProducts() },
        error:err => {
          console.log(err)
        }
      })
  }

  UpdateProduit(upd:NgForm){
    alert("Product updated successfuly");
    let valeur = upd.value;
    if(valeur.marque==""){
      valeur.marque = this.pr.marque;
    }
    if(valeur.prix==""){
      valeur.prix = this.pr.prix;
    }
    if(valeur.description==""){
      valeur.description = this.pr.description;
    }
    if(valeur.quantite==""){
      valeur.quantite = this.pr.quantite;
    }

    let prUp = {
      marque:valeur.marque,
      description:valeur.description,
      prix:valeur.prix,
      quantite:valeur.quantite
    };

    this.http.put(`http://localhost:8888/PRODUIT-SERVICE/pro/produits/${this.pr.idp}`, prUp)
      .subscribe({
        next:value => {
          this.getProducts();
        },
        error:err => {
          console.log(err)
        }
      })
  }

  getProduit(produit:Produit){
    this.pr = produit;
  }
}
