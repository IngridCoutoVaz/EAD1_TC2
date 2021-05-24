import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from './Produto';
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebService {

  baseURL = "https://banco-dados-teste.glitch.me/api";

  getProdutos() : Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseURL + "/produtos");
  }

  cadastrarProduto(produto) : Observable<any>{
    let body = new HttpParams();
    body = body.set("title", produto.title);
    body = body.set("price", String(produto.price));
    body = body.set("description", produto.description);
    return this.http.post(this.baseURL + "/produtos", body, {observe: "response"});
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/produtos/${productId}`, {
      observe: 'response',
    });
  }

  updateProduct(product): Observable<any> {
    let body = new HttpParams();
    body = body.set('title', product.title);
    body = body.set('price', product.price.toString());
    body = body.set('description', product.description);
    return this.http.put(`${this.baseURL}/produtos/${product._id}`, body, {
      observe: 'response',
    });
  }

  constructor(private http : HttpClient) { }
}
