import { Component, Input } from '@angular/core';
import { StoreService } from '../../shared/services/store.service';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [TopbarComponent, NgIf, RouterLink, SearchComponent, NavComponent]
})
export class HeaderComponent {
    @Input() layout: 'classic'|'compact' = 'classic';

    constructor(public store: StoreService) { }
}
