import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};
  id;

  constructor(
    private categoryService: CategoryService
    , private productService: ProductService
    , private router: Router
    , private route: ActivatedRoute) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      // this.product = this.productService.get(this.id).subscribe(data => {
      //   this.product = data
      // });
      this.productService.get(this.id).valueChanges().pipe(take(1))
      .subscribe(p => this.product = p);      
    }
  }
  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    }else {
      this.productService.create(product);
    }    
    this.router.navigate(['/admin/products']);
    //console.log(product)
  }

  delete(){
    if (confirm('Are you sure want to delete this product?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }else {
      return;
    }
  }

  Cancel(){
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
