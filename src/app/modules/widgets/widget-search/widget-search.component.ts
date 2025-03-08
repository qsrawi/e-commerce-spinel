import { Component } from '@angular/core';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-widget-search',
    templateUrl: './widget-search.component.html',
    styleUrls: ['./widget-search.component.scss'],
    standalone: true,
    imports: [FormsModule, IconComponent]
})
export class WidgetSearchComponent {
    constructor() { }
}
