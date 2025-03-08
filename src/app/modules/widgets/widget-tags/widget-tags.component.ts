import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-widget-tags',
    templateUrl: './widget-tags.component.html',
    styleUrls: ['./widget-tags.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class WidgetTagsComponent {
    constructor() { }
}
