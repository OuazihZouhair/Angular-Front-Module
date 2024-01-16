import {Acheteur} from "./acheteur.model";
import {Produit} from "./produit.model";

export interface Vente{
  idv : number,
  ida : number,
  idp : number,
  quantite : number,
  mois : number,
  annee : number,
  achteur : Acheteur,
  produit : Produit
}
