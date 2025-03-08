import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SliderService } from 'src/app/shared/api/slider.service';
import { DirectionService } from '../../../shared/services/direction.service';
import { ShopService } from 'src/app/shared/api/shop.service';
import { ClickDirective } from '../../../shared/directives/click.directive';
import { OwlPreventClickDirective } from '../../../shared/directives/owl-prevent-click.directive';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DepartmentsAreaDirective } from '../../../shared/directives/departments-area.directive';
import { NgClass, NgIf, NgFor, NgStyle, SlicePipe } from '@angular/common';

@Component({
    selector: 'app-block-slideshow-articles',
    templateUrl: './block-slideshow-articles.component.html',
    styleUrls: ['./block-slideshow-articles.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf, DepartmentsAreaDirective, CarouselModule, OwlPreventClickDirective, NgFor, ClickDirective, NgStyle, SlicePipe]
})

export class BlockSlideshowArticlesComponent {
    @Input() withDepartments = false;
    loadding = true;
    server = 'http://192.119.110.192:5001/whotoChoose/';
    options = {
        nav: false,
        dots: true,
        loop: true,
        responsive: {
            0: { items: 1 }
        },
        rtl: this.direction.isRTL()
    };
    images = [];
    slides: any = [];
    articlelst: any[] = [];

    // slides = [
    //     {
    //         title: 'Big choice of<br>Plumbing products',
    //         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
    //         image_classic: 'assets/images/slides/slide-1.jpg',
    //         image_full: 'assets/images/slides/slide-1-full.jpg',
    //         image_mobile: 'assets/images/slides/slide-1-mobile.jpg'
    //     },
    //     {
    //         title: 'Screwdrivers<br>Professional Tools',
    //         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
    //         image_classic: 'assets/images/slides/slide-2.jpg',
    //         image_full: 'assets/images/slides/slide-2-full.jpg',
    //         image_mobile: 'assets/images/slides/slide-2-mobile.jpg'
    //     },
    //     {
    //         title: 'One more<br>Unique header',
    //         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
    //         image_classic: 'assets/images/slides/slide-3.jpg',
    //         image_full: 'assets/images/slides/slide-3-full.jpg',
    //         image_mobile: 'assets/images/slides/slide-3-mobile.jpg'
    //     }
    // ];

    constructor(
        public sanitizer: DomSanitizer,
        private direction: DirectionService,
        private sliderService: SliderService,
        private shop: ShopService,
    ) {
        this.getwhytoChooselst();
    }
    getwhytoChooselst() {
        // print
        this.shop.getallwhytoChooseecommerce('article').subscribe(
            (res: any[]) => {

                this.articlelst = res;
                              
                this.articlelst.forEach(element => {
                    let obj: any = {
                        title: 'title',
                        text: 'text',
                        image_full: this.server + element.attachment,
                        url:element.attachment,
                        description:element.description,
                        id:element.id

                    };
                    this.slides.push(obj);
                });
                   
            }
        );
    }
    // getsliderimage() {
    //     this.sliderService.getallslides().subscribe(
    //         (res) => {
    //             for (let i = 0; i < res['images'].length; i++) {
    //                 console.log(res['images']);
                    
    //                 let obj: any = {
    //                     title: res['images'][i]['header'],
    //                     text: res['images'][i]['description'],
    //                     image_full: this.server + res['images'][i]['RecordNote'],
    //                     url:res['images'][i]['url'],
    //                 };
    //                 this.slides.push(obj);
    //             }
    //             console.log(this.slides);
                
    //             this.loadding = false;
    //         }
    //     );

    // }
}
