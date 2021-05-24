import { Component, OnInit } from '@angular/core';
import { Produto } from '../Produto';
import { WebService } from '../web.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  listaProdutos: Produto[];
  deleteConfirmation: boolean;
  editConfirmation: boolean;
  selectedProduct: Produto;

  constructor(private web : WebService) { }

  getAll() : void {
    this.web.getProdutos().subscribe(res => {
      this.listaProdutos = res;
    });
  }

  openDeleteConfirmation(product:Produto) {
    this.deleteConfirmation = true;
    this.selectedProduct = product;
  }

  closeDeleteConfirmation(): void {
    this.deleteConfirmation = false;
    this.selectedProduct = null;
  }

  openEditConfirmation(product: Produto) {
    this.editConfirmation = true;
    this.selectedProduct = product;
  }

  closeEditConfirmation(): void {
    this.editConfirmation = false;
    this.selectedProduct = null;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
