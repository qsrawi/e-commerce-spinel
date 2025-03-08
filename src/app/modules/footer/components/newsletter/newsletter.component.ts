import { Component } from '@angular/core';
import { SocialLinksComponent } from '../../../../shared/components/social-links/social-links.component';

@Component({
    selector: 'app-footer-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.scss'],
    standalone: true,
    imports: [SocialLinksComponent]
})
export class NewsletterComponent {
    constructor() { }
}
