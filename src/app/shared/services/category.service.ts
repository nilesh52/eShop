import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryRef: AngularFireList<any>;
  categorys: Observable<any[]>;
  constructor(private db: AngularFireDatabase) { }

  getAll() {
    // return this.db.list('/categories').snapshotChanges().pipe(map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // }));

    this.categoryRef = this.db.list('/categories');
    this.categorys = this.categoryRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.categorys;

    // return this.db.list('/categories', ref => (ref.orderByChild('name')))
    // .snapshotChanges().pipe(
    //   map(actions => 
    //     actions.map(a => ({ key: a.key, ...a.payload.val() }))
    //     // actions.map(a => ({ key: a.key, ...a.payload.val() }))
    //   )
    // );
  }
}
