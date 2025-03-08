import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Link } from '../../interfaces/link';
import { IconComponent } from '../icon/icon.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, RouterLink, IconComponent]
})
export class PageHeaderComponent {
    @Input() header = '';
    @Input() breadcrumbs: Link[] = [];
    @Input() StoreLogo:any='';
    @Input() Catalog:boolean=false;

    constructor(private sanitizer:DomSanitizer) {         
    }
    logggg(){
            //Console.log(this.StoreLogo);
            var reader = new FileReader();
            reader.readAsDataURL(this.StoreLogo['data']); 
            reader.onloadend = function() {
                var base64data = reader.result;     
                return   base64data;         
                //Console.log(base64data);
            }
    }

    _arrayBufferToBase64( buffer:any ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
           binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
      }
      sanitize( url:string ) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
      }
    
}
