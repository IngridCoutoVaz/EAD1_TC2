import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Produto } from '../Produto';
import { WebService } from '../web.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css'],
})
export class AtualizarComponent implements OnInit {
  constructor(private api: WebService) {}

  @Input() selectedProduct: Produto;
  @Output() close = new EventEmitter<string>();

  updateForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  updateFormMessage: string;
  product = { title: '', price: 0.0, description: '', _id: '' };

  closeUpdateConfirmation(): void {
    this.close.emit(null);
  }

  onSubmit() {
    if (!this.updateForm.invalid) {
      this.product.title = this.updateForm.value.title;
      this.product.description = this.updateForm.value.description;
      this.product.price = Number(this.updateForm.value.price);
      this.product._id = this.selectedProduct._id;

      this.api.updateProduct(this.product).subscribe((response) => {
        if (response.ok === true) {
          this.updateForm.reset();
          this.updateFormMessage = 'Atualização realizada com sucesso!';
          setTimeout(() => {
            this.updateFormMessage = '';
            this.closeUpdateConfirmation();
          }, 1500);
        } else {
          this.updateFormMessage = 'Atualização NÃO realizada.';
        }
      });
    } else {
      this.updateFormMessage = 'Campos preenchidos incorretamente!';
    }
  }

  ngOnInit() {
    this.updateForm.setValue({
      title: this.selectedProduct.title,
      price: this.selectedProduct.price,
      description: this.selectedProduct.description,
    });
  }
}