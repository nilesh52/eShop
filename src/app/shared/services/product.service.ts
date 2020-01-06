import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  coursesRef: AngularFireList<any>;
  courses: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    
   }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {    
    this.coursesRef = this.db.list('/products');
    this.courses = this.coursesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.courses;
    //return this.db.list('/products');
    // return this.db.list('/products').snapshotChanges().pipe(map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // }));
    // return this.db.list('/products').snapshotChanges().pipe(map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // }));
  }

  get(productId) {
    // this.coursesRef = this.db.list('/products');
    return this.db.object('/products/' + productId);
    // return this.db.object('/products/' + productId).snapshotChanges().pipe(
    //   map(
    //     c => ({ key: c.payload.key, ...c.payload.val() })
    //   )
    // );

    // return this.db.object('/products/' + productId).snapshotChanges().pipe(
    //   map(c => ({ key: c.payload.key, ...c.payload.val() }))
    // );
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
