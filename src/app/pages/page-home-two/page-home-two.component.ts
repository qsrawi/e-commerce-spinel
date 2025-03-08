import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { posts } from '../../../data/blog-posts';
import { ShopService } from '../../shared/api/shop.service';
import { takeUntil, tap } from 'rxjs/operators';
import { merge, Observable, Subject } from 'rxjs';
import { Brand } from '../../shared/interfaces/brand';
import { Product } from '../../shared/interfaces/product';
import { Category } from '../../shared/interfaces/category';
import { BlockHeaderGroup } from '../../shared/interfaces/block-header-group';
import Item from 'src/app/shared/Models/Item';
import { Layout } from 'src/app/modules/shop/components/products-view/products-view.component';
import { RecentlyViewedService } from 'src/app/shared/services/recently-viewed.service';
import Campaign from 'src/app/shared/Models/campaign';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SliderService } from 'src/app/shared/api/slider.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ItemCardComponent } from '../../shared/components/item-card/item-card.component';
import { NgIf, NgFor } from '@angular/common';
import { BlockSlideshowComponent } from '../../modules/blocks/block-slideshow/block-slideshow.component';

interface ProductsCarouselGroup extends BlockHeaderGroup {
    products$: Observable<Product[]>;
}
interface ProductsCarouselData {
    abort$: Subject<void>;
    loading: boolean;
    products: Product[];
    groups: ProductsCarouselGroup[];
}

interface ItemsCarouselGroup extends BlockHeaderGroup {
    items$: Observable<Item[]>;
}
interface ItemsCarouselData {
    abort$: Subject<void>;
    loading: boolean;
    items: Item[];
    groups: ItemsCarouselGroup[];
}
@Component({
    selector: 'app-page-home-two',
    templateUrl: './page-home-two.component.html',
    styleUrls: ['./page-home-two.component.scss'],
    standalone: true,
    imports: [BlockSlideshowComponent, NgIf, NgFor, ItemCardComponent, IconComponent]
})
export class PageHomeTwoComponent implements OnInit, OnDestroy {
    layout: Layout = 'grid';
    grid: 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full' = 'grid-3-sidebar';
    offcanvas: 'always' | 'mobile' = 'mobile';
    LoaddingMoreTolove = true;
    showSpinner = false;

    destroy$: Subject<void> = new Subject<void>();
    bestsellers$!: Observable<Product[]>;
    brands$!: Observable<Brand[]>;
    popularCategories$!: Observable<Category[]>;

    columnTopRated$!: Observable<Product[]>;
    columnSpecialOffers$!: Observable<Product[]>;
    columnBestsellers$!: Observable<Product[]>;

    posts = posts;

    featuredProducts!: ProductsCarouselData;
    latestProducts!: ProductsCarouselData;

    // latestItems!: ItemsCarouselData;
    MoreToLoveItems!: ItemsCarouselData;
    whytoChooselst: any[] = [];
    youtubelst: any[] = [];
    // SellingFastItems!: ItemsCarouselData;
    // recentlyViewditems!: ItemsCarouselData;
    MiddleImages: String[] = [];
    // CampaignList: Campaign[] = [];

    constructor(
        private shop: ShopService,
        public recentlyviewd: RecentlyViewedService,
        private router: Router,
        private _sanitizer: DomSanitizer,
        private sliderservice: SliderService


    ) {
        // if (localStorage.getItem('accessTokenEcommerce') == null) {
        //     this.openModaldisplayship();

        // }

    }

    async ngOnInit(): Promise<void> {
        this.getwhytoChooselst();
        this.getyoutubelst();

        // this.bestsellers$ = this.shop.getBestsellers(7);
        // this.brands$ = this.shop.getPopularBrands();
        // this.popularCategories$ = this.shop.getCategoriesBySlug([
        //     'power-tools',
        //     'hand-tools',
        //     'machine-tools',
        //     'power-machinery',
        //     'measurement',
        //     'clothes-and-ppe',
        // ], 1);
        // this.columnTopRated$ = this.shop.getTopRated(3);
        // this.columnSpecialOffers$ = this.shop.getSpecialOffers(3);
        // this.columnBestsellers$ = this.shop.getBestsellers(3);

        this.MoreToLoveItems = {
            abort$: new Subject<void>(),
            loading: false,
            items: [],
            groups: [
                {
                    name: 'All',
                    current: true,
                    items$: this.shop.geRecomendedItems(0),
                }
            ],
        };
        //Console.log(this.latestItems);

        this.groupChangeItem(this.MoreToLoveItems, this.MoreToLoveItems.groups[0]);

        // this.latestItems = {
        //     abort$: new Subject<void>(),
        //     loading: false,
        //     items: [],
        //     groups: [
        //         {
        //             name: 'All',
        //             current: true,
        //             items$: this.shop.getLatestItems(),
        //         }
        //         // {
        //         //     name: 'Power Tools',
        //         //     current: false,
        //         //     products$: this.shop.getLatestProducts('power-tools', 8),
        //         // },
        //         // {
        //         //     name: 'Hand Tools',
        //         //     current: false,
        //         //     products$: this.shop.getLatestProducts('hand-tools', 8),
        //         // },
        //         // {
        //         //     name: 'Plumbing',
        //         //     current: false,
        //         //     products$: this.shop.getLatestProducts('plumbing', 8),
        //         // },
        //     ],
        // };
        //Console.log(this.latestItems);

        // this.groupChangeItem(this.latestItems, this.latestItems.groups[0]);

        // this.SellingFastItems = {
        //     abort$: new Subject<void>(),
        //     loading: false,
        //     items: [],
        //     groups: [
        //         {
        //             name: 'All',
        //             current: true,
        //             items$: this.shop.geSellingfastitems(),
        //         }
        //         // {
        //         //     name: 'Power Tools',
        //         //     current: false,
        //         //     products$: this.shop.getLatestProducts('power-tools', 8),
        //         // },
        //         // {
        //         //     name: 'Hand Tools',
        //         //     current: false,
        //         //     products$: this.shop.getLatestProducts('hand-tools', 8),
        //         // },
        //         // {
        //         //     name: 'Plumbing',
        //         //     current: false,
        //         //     products$: this.shop.getLatestProducts('plumbing', 8),
        //         // },
        //     ],
        // };
        // //Console.log(this.SellingFastItems);

        // this.groupChangeItem(this.SellingFastItems, this.SellingFastItems.groups[0]);

        // this.recentlyViewditems = {
        //     abort$: new Subject<void>(),
        //     loading: false,
        //     items: [],
        //     groups: [
        //         {
        //             name: 'All',
        //             current: true,
        //             items$: this.recentlyviewd.items$,
        //         }
        //         // {
        //         //     name: 'Power Tools',
        //         //     current: false,
        //         //     products$: this.shop.getLatestProducts('power-tools', 8),
        //         // },
        //         // {
        //         //     name: 'Hand Tools',
        //         //     current: false,
        //         //     products$: this.shop.getLatestProducts('hand-tools', 8),
        //         // },
        //         // {
        //         //     name: 'Plumbing',
        //         //     current: false,
        //         //     products$: this.shop.getLatestProducts('plumbing', 8),
        //         // },
        //     ],
        // };
        //Console.log(this.recentlyViewditems);

        // this.groupChangeItem(this.recentlyViewditems, this.recentlyViewditems.groups[0]);


        this.shop.getMiddleImages().subscribe((res: string[]) => {
            this.MiddleImages = res;
            console.log(this.MiddleImages);
        });
        this.getnavs();
        // this.shop.getallCampaigns().subscribe((res: Campaign[]) => {
        //     console.log(res);

        //     this.CampaignList = res;
        // });
    }
    openCampaignsandOffers(camp: Campaign) {
        // this.router.navigate(['./shop/catalog/CampaignsandOffers']);
        console.log(camp);

        this.router.navigate(['./shop/catalog/' + 'CampaignsandOffers/' + camp.campaignID]);

    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    displayship = "none";

    openModaldisplayship() {
        this.displayship = "block";
    }
    onCloseHandleddisplayship() {
        this.displayship = "none";
    }
    groupChange(carousel: ProductsCarouselData, group: BlockHeaderGroup): void {
        carousel.loading = true;
        carousel.abort$.next();

        (group as ProductsCarouselGroup).products$.pipe(
            tap(() => carousel.loading = false),
            takeUntil(merge(this.destroy$, carousel.abort$)),
        ).subscribe(x => carousel.products = x);
    }

    groupChangeItem(carousel: ItemsCarouselData, group: BlockHeaderGroup): void {
        carousel.loading = true;
        carousel.abort$.next();

        (group as ItemsCarouselGroup).items$.pipe(
            tap(() => carousel.loading = false),
            takeUntil(merge(this.destroy$, carousel.abort$)),
        ).subscribe(x => carousel.items = x);
    }


    elements = [1];
    count = 1;

    @HostListener("window:scroll", ["$event"])
    onScroll(): void {
        //In chrome and some browser scroll is given to body tag
        let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight - 150;
        let max = document.documentElement.scrollHeight - 150;

        if (Math.floor(pos / 1024) == Math.floor(max / 1024)) {
            //Console.log("you are in the bottom");
            if (this.LoaddingMoreTolove == true && this.showSpinner == false && this.MoreToLoveItems.items.length > 0)
                this.getMoreForMoreToLove();
        }
    }

    bottomReached(): boolean {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // you're at the bottom of the page
            //Console.log("you are in the bottom");

        }
        return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    }
    getMoreForMoreToLove() {
        this.showSpinner = true;
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhh" + this.MoreToLoveItems.items.length);
        // print
        this.shop.geRecomendedItems(this.MoreToLoveItems.items.length).subscribe(
            (res: Item[]) => {
                if (res.length == 0) {
                    this.LoaddingMoreTolove = false
                } else {
                    //Console.log(res);
                    res.forEach(element => {
                        this.MoreToLoveItems.items.push(element);
                    });
                }
                this.showSpinner = false;
            }
        );
    }

    getwhytoChooselst() {
        // print
        this.shop.getallwhytoChooseecommerce('why').subscribe(
            (res: any[]) => {

                this.whytoChooselst = res;
            }
        );
    }
    navs:any[]=[];
    navsView:any[]=[];
     isEven(n:number) {
        return n % 2 == 0;
     }
    getnavs() {
        this.sliderservice.getnavs().subscribe(
            (res) => {
                this.navs=res['nav'];
                console.log("navs navs navs navs");
                for(let i= 0;i<this.navs.length;i++){
                    for(let x= 0;x<this.navs[i].category.length;x++){
                        this.navsView.push(this.navs[i].category[x]);
                    
                    }

                }
                console.log(this.navs);
                

            }
        );
    }
    safeURL: any = '';
    getyoutubelst() {
        // print
        this.shop.getallwhytoChooseecommerce('youtube').subscribe(
            (res: any[]) => {

                this.youtubelst = res;
                if (this.youtubelst.length > 0) {
                    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.youtubelst[0].attachment + '?autoplay=1&mute=1');
                    console.log(this.safeURL);

                    this.youtubelst.forEach(element => {
                        element.attachment = this._sanitizer.bypassSecurityTrustResourceUrl(element.attachment + '?autoplay=1&mute=1');
                    });
                    // this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(videoURL);

                }
            }
        );
    }

    clickyoutube(item: any) {
        this.safeURL = item.attachment;

        console.log(item);

    }


    nav(res:any){
        console.log(res);
        
        this.router.navigate([`./shop/catalog/${btoa(res['LKP_Type'])}/${btoa(res['LKP_ID'])}/${btoa(res['RelatedID'])}`]);

    }
}
