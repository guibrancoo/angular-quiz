import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  listRef: AngularFireList<any>;
  list: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.listRef = db.list('users');
    this.list = this.listRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  add(username: string) {
    this.listRef.push(
      {
        user: username
      }
    );
  }

  delete(key: string) {
    this.listRef.remove(key);
  }

  ngOnInit() {
  }

}