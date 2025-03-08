import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SliderService } from 'src/app/shared/api/slider.service';
import { DirectionService } from '../../../shared/services/direction.service';
import { ClickDirective } from '../../../shared/directives/click.directive';
import { OwlPreventClickDirective } from '../../../shared/directives/owl-prevent-click.directive';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DepartmentsAreaDirective } from '../../../shared/directives/departments-area.directive';
import { NgClass, NgIf, NgFor, NgStyle } from '@angular/common';

@Component({
    selector: 'app-block-slideshow',
    templateUrl: './block-slideshow.component.html',
    styleUrls: ['./block-slideshow.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf, DepartmentsAreaDirective, CarouselModule, OwlPreventClickDirective, NgFor, ClickDirective, NgStyle]
})

export class BlockSlideshowComponent {
    @Input() withDepartments = false;
    loadding = true;
    server = 'http://192.119.110.192:5001/sliderimage/';
    options = {
        nav: false,
        dots: true,
        loop: true,
        margin: 10,         // Set the space between items
        items: 1,           // Show 1 image at a time
        center: true,       // Center the active item
        stagePadding: 50,  
        responsive: {
            0: { items: 1 },

        },
        rtl: this.direction.isRTL(),
        autoplay:true,
        autoplayTimeout:3500,
        autoplayHoverPause:true,


    };
    images = [];
    slides: any = [];
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
        private sliderService: SliderService
    ) {
        this.getsliderimage();
    }

    getsliderimage() {
        this.sliderService.getallslides().subscribe(
            (res) => {
                for (let i = 0; i < res['images'].length; i++) {
                    
                    let obj: any = {
                        title: res['images'][i]['header'],
                        text: res['images'][i]['description'],
                        image_full: this.server + res['images'][i]['RecordNote'],
                        url:res['images'][i]['url'],
                    };
                    this.slides.push(obj);
                }
                
                this.loadding = false;
            }
        );

    }
}
