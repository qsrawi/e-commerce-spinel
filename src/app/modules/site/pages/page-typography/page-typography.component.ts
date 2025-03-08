import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-typography',
    templateUrl: './page-typography.component.html',
    styleUrls: ['./page-typography.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent]
})
export class PageTypographyComponent {
    constructor() { }
}
