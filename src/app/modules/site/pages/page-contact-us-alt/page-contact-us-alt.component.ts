import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-page-contact-us-alt',
    templateUrl: './page-contact-us-alt.component.html',
    styleUrls: ['./page-contact-us-alt.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent, FormsModule]
})
export class PageContactUsAltComponent {
    constructor() { }
}
