import { Component } from '@angular/core';
import { CardListComponent } from './card/card-list/card-list.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CardListComponent, HeaderComponent, FooterComponent, RouterOutlet],
})
export class AppComponent {}
