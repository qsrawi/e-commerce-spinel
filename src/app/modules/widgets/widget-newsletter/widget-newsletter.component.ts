import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-widget-newsletter',
    templateUrl: './widget-newsletter.component.html',
    styleUrls: ['./widget-newsletter.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class WidgetNewsletterComponent {
    constructor() { }
}
