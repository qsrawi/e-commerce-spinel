import { Component, ElementRef } from '@angular/core';
import { initweb, WebSiteInfo } from 'src/app/shared/Models/WebSiteInfo';
import { StoreService } from '../../../../shared/services/store.service';
import { SocialLinksComponent } from '../../../../shared/components/social-links/social-links.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-footer-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    standalone: true,
    imports: [NgIf, SocialLinksComponent]
})
export class ContactsComponent {
    loading:boolean=true;
    
    web:WebSiteInfo=initweb;
    constructor(public store: StoreService,private elementRef: ElementRef) {

        this.store.getallinfo().subscribe((res: WebSiteInfo) => {
            this.web=res;
            this.store.setWebSiteInfo(this.web);
            
            document.documentElement.style.setProperty("--nav-panel-bg", this.web.color1);
            document.documentElement.style.setProperty("--accent-color", this.web.color2);
           
            this.loading=false;
        });
    }
}
