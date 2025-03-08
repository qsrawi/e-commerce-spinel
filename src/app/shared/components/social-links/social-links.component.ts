import { Component, HostBinding, Input } from '@angular/core';
import { theme } from '../../../../data/theme';
import { StoreService } from '../../services/store.service';
import { NgFor, NgIf, NgClass } from '@angular/common';

export interface SocialLinksItem {
    type: string;
    url: string;
    icon: string;
}

export type SocialLinksShape = 'circle' | 'rounded';

@Component({
    selector: 'app-social-links',
    templateUrl: './social-links.component.html',
    styleUrls: ['./social-links.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, NgClass]
})
export class SocialLinksComponent {
    // theme = theme;

    items: SocialLinksItem[] = [
        {type: 'facebook', url: this.store.getWebSiteInfo().Facebook, icon: 'fab fa-facebook-f'},
        {type: 'twitter', url:  this.store.getWebSiteInfo().Twitter, icon: 'fab fa-twitter'},
        {type: 'youtube', url:  this.store.getWebSiteInfo().Youtube, icon: 'fab fa-youtube'},
        {type: 'instagram', url:  this.store.getWebSiteInfo().Instagram, icon: 'fab fa-instagram'},
        {type: 'linkedin', url: this.store.getWebSiteInfo().Linkedin, icon: 'fab fa-linkedin'},
        {type: 'pinterest', url: this.store.getWebSiteInfo().Pinterest, icon: 'fab fa-pinterest'},
        {type: 'snapchat', url: this.store.getWebSiteInfo().Snapchat, icon: 'fab fa-snapchat'},
        {type: 'tiktok', url: this.store.getWebSiteInfo().Tiktok, icon: 'fab fa-tiktok'},

    ];

    @Input() shape: SocialLinksShape = 'circle';

    @HostBinding('class.social-links') classSocialLinks = true;

    @HostBinding('class.social-links--shape--circle') get classSocialLinksShapeCircle(): boolean { return this.shape === 'circle'; }

    @HostBinding('class.social-links--shape--rounded') get classSocialLinksShapeRounded(): boolean { return this.shape === 'rounded'; }

    constructor(public store: StoreService) {

        //Console.log("____________________");
        //Console.log(this.store.web);
        
        
     }
}
