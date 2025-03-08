import { Component } from '@angular/core';
import { theme } from '../../../data/theme';
import { TotopComponent } from './components/totop/totop.component';
import { RouterLink } from '@angular/router';
import { LinksComponent } from './components/links/links.component';
import { ContactsComponent } from './components/contacts/contacts.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [ContactsComponent, LinksComponent, RouterLink, TotopComponent]
})
export class FooterComponent {
    theme = theme;

    constructor() { }
}
