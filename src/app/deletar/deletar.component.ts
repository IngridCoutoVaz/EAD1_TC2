import { Produto } from '../Produto';
import { WebService } from '../web.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deletar',
  templateUrl: './deletar.component.html',
  styleUrls: ['./deletar.component.css'],
})
export class DeleteComponent implements OnInit {
  constructor(private api: WebService) {}

  @Input() selectedProduct: Produto;
  @Output() closeDelete = new EventEmitter<string>();

  deleteMessage: string;

  closeDeleteConfirmation(): void {
    this.closeDelete.emit(null);
  }

  deletar(produtoId: string) {
    this.api.deleteProduct(produtoId).subscribe((response) => {
      if (response.ok === true) {
        this.deleteMessage = 'Exclusão concluída com sucesso!';
        setTimeout(() => {
          this.deleteMessage = '';
          this.closeDeleteConfirmation();
        }, 1500);
      } else {
        this.deleteMessage = 'Erro ao deletar produto.';
      }
    });
  }
  ngOnInit(): void {}
}
