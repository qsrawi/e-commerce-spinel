import { Component } from '@angular/core';
import { theme } from '../../../../data/theme';
import { SocialLinksComponent } from '../../../shared/components/social-links/social-links.component';

@Component({
    selector: 'app-widget-aboutus',
    templateUrl: './widget-aboutus.component.html',
    styleUrls: ['./widget-aboutus.component.scss'],
    standalone: true,
    imports: [SocialLinksComponent]
})
export class WidgetAboutusComponent {
    theme = theme;

    constructor() { }
}
