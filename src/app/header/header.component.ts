import {AfterViewChecked, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {Item} from '../shared/models/item';
import {Observable} from 'rxjs';
import {ShoppingCartService} from '../shared/services/shopping-cart.service';
import {map} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  itemsCount$: Observable<number>;
  constructor(public authService: AuthService,
              private router: Router,
              private translate: TranslateService,
              private shoppingCartService: ShoppingCartService,
              private store: Store<{items: Item[]}>) {
    this.itemsCount$ = store.pipe(
      select('items'),
      map((items: Item[]) => {
        return items.length ? items.map(item => item.qty).reduce((a, b) => a + b) : 0;
      })
    );
  }

  ngOnInit() {

  }
  changeLang(language: string) {
    this.translate.use(language);
  }

  logout() {
    this.authService.logout()
      .subscribe((res: {success: true}) => {
        if (res.success) {
          this.router.navigate(['/home']);
          this.authService.userSubject.next(null);
        }
      });
  }
}
