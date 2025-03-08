import { AfterViewChecked, Component, ElementRef, NgZone, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { navigation } from '../../../../../data/header-navigation';
import { NavigationLink } from '../../../../shared/interfaces/navigation-link';
import { DirectionService } from '../../../../shared/services/direction.service';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HeaderService } from '../../../../shared/services/header.service';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SliderService } from 'src/app/shared/api/slider.service';
import { MegamenuColumn } from 'src/app/shared/interfaces/megamenu-column';
import { NestedLink } from 'src/app/shared/interfaces/nested-link';
import { MegamenuComponent } from '../megamenu/megamenu.component';
import { MenuComponent } from '../menu/menu.component';
import { TouchClickDirective } from '../../../../shared/directives/touch-click.directive';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { OutsideTouchClickDirective } from '../../../../shared/directives/outside-touch-click.directive';
import { NgFor, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-header-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.scss'],
    standalone: true,
    imports: [NgFor, NgClass, OutsideTouchClickDirective, NgIf, IconComponent, RouterLink, TouchClickDirective, NgTemplateOutlet, MenuComponent, MegamenuComponent]
})
export class LinksComponent implements OnInit, OnDestroy, AfterViewChecked {
    @ViewChildren('submenuElement') submenuElements!: QueryList<ElementRef>;
    @ViewChildren('itemElement') itemElements!: QueryList<ElementRef>;

    destroy$: Subject<void> = new Subject<void>();

    // items: NavigationLink[] = navigation;
    items: NavigationLink[] = [];

    hoveredItem: NavigationLink | null = null;

    reCalcSubmenuPosition = false;

    constructor(
        private direction: DirectionService,
        private header: HeaderService,
        private zone: NgZone,
        private sliderservice: SliderService
    ) {
        this.getnavs();
    }
    getnavs() {
        this.sliderservice.getnavs().subscribe(
            (res) => {
                let mega: any[] = [];
                for (let i = 0; i < res['nav'].length; i++) {
                    let items: NestedLink[] = [];
                    let columns: MegamenuColumn[] = [];
                    for (let x = 0; x < res['nav'][i]['category'].length; x++) {
                        // //Console.log(res['nav'][i]['category'][x]['subcategory']);
                        if (res['nav'][i]['category'][x]['subcategory'].length > 0) {
                            for (let y = 0; y < res['nav'][i]['category'][x]['subcategory'].length; y++) {
                                let subitems: NestedLink[] = [];
                                if (res['nav'][i]['category'][x]['subcategory'][y]['ItemCategory2'].length > 0) {
                                    for (let p = 0; p < res['nav'][i]['category'][x]['subcategory'][y]['ItemCategory2'].length; p++) {
                                        subitems.push({ label: res['nav'][i]['category'][x]['subcategory'][y]['ItemCategory2'][p]['ArName'], url: `/shop/catalog/${btoa(res['nav'][i]['category'][x]['subcategory'][y]['LKP_ID'])}/${btoa(res['nav'][i]['category'][x]['subcategory'][y]['ItemCategory2'][p]['LKP_ID'])}/${btoa(res['nav'][i]['StoreID'])}/${btoa(res['nav'][i]['category'][x]['subcategory'][y]['ItemCategory2'][p]['LKP_Type'])}` });
                                    }

                                }

                                items.push({ label: res['nav'][i]['category'][x]['subcategory'][y]['ArName'], url: `/shop/catalog/${btoa(res['nav'][i]['category'][x]['LKP_ID'])}/${btoa(res['nav'][i]['category'][x]['subcategory'][y]['LKP_ID'])}/${btoa(res['nav'][i]['StoreID'])}`, items: subitems });
                            }
                        }
                        columns.push(
                            {
                                size: 3, items: [
                                    { label: res['nav'][i]['category'][x]['ArName'], url: `/shop/catalog/${btoa(res['nav'][i]['category'][x]['LKP_Type'])}/${btoa(res['nav'][i]['category'][x]['LKP_ID'])}/${btoa(res['nav'][i]['StoreID'])}`, items: items }
                                ]
                            }
                        );
                        items = [];
                    }

                    let obj: NavigationLink = {
                        label: res['nav'][i]['StoreEnName'], url: `/shop/catalog/${btoa('store')}/${btoa(res['nav'][i]['StoreID'])}/${btoa(res['nav'][i]['StoreID'])}`, menu: {
                            type: 'megamenu',
                            size: 'xl',
                            columns: columns,
                            image: 'http://192.119.110.192:5001/catimages/' + res['nav'][i]['category'][0]?.ID + '.png',
                            subimages: res['nav'][i]['catimages']
                        }
                    };
                    mega.push(obj);

                    this.items.push(obj);
                }
                // this.items.push({
                //     label: 'Products', url: `/shop/catalog/${btoa('store')}/${btoa(res['nav'][0]['StoreID'])}/${btoa(res['nav'][0]['StoreID'])}`
                //     // , menu: {
                //     //     type: 'megamenu',
                //     //     size: 'xl',
                //     //     columns: mega,
                //     //     // image:'http://192.119.110.192:5001/catimages/'+res['nav'][i]['category'][0]?.ID+'.png',
                //     //     // subimages:res['nav'][i]['catimages']
                //     // }

                // });
                // this.items.push({
                //     label: 'Our Science', url: `/site/OurScience/0`,

                // });
                // this.items.push({
                //     label: 'Brand Story', url: `/site/BrandStory`,

                // });
                // this.items.push({
                //     label: 'Track Your Order', url: `/shop/track-order`,

                // });
                // this.items.push({
                //     label: 'Contact Us', url: `/site/contact-us`,

                // });
                console.log(this.items);

            }
        );
    }
    onItemMouseEnter(item: NavigationLink): void {
        if (this.hoveredItem !== item) {
            this.hoveredItem = item;

            if (item.menu) {
                this.reCalcSubmenuPosition = true;
            }
        }
    }

    onItemMouseLeave(item: NavigationLink): void {
        if (this.hoveredItem === item) {
            this.hoveredItem = null;
        }
    }

    onTouchClick(event: Event, item: NavigationLink): void {
        if (event.cancelable) {
            if (this.hoveredItem && this.hoveredItem === item) {
                return;
            }

            if (item.menu) {
                event.preventDefault();

                this.hoveredItem = item;
                this.reCalcSubmenuPosition = true;
            }
        }
    }

    onOutsideTouchClick(item: NavigationLink): void {
        if (this.hoveredItem === item) {
            this.zone.run(() => this.hoveredItem = null);
        }
    }

    onSubItemClick(): void {
        this.hoveredItem = null;
    }

    ngOnInit(): void {
        merge(
            this.header.navPanelPositionState$,
            this.header.navPanelVisibility$,
        ).pipe(takeUntil(this.destroy$)).subscribe(() => this.hoveredItem = null);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngAfterViewChecked(): void {
        if (!this.reCalcSubmenuPosition) {
            return;
        }

        this.reCalcSubmenuPosition = false;

        const itemElement = this.getCurrentItemElement();
        const submenuElement = this.getCurrentSubmenuElement();

        if (!submenuElement || !itemElement) {
            return;
        }

        const submenuTop = submenuElement.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        const paddingBottom = 20;

        submenuElement.style.maxHeight = `${viewportHeight - submenuTop - paddingBottom}px`;

        // calc megamenu position
        if (this.hoveredItem?.menu?.type !== 'megamenu') {
            return;
        }

        const container = submenuElement.offsetParent;

        if (!container) {
            return;
        }

        const containerWidth = container.getBoundingClientRect().width;
        const megamenuWidth = submenuElement.getBoundingClientRect().width;

        if (this.direction.isRTL()) {
            const itemPosition = containerWidth - (itemElement.offsetLeft + itemElement.offsetWidth);
            const megamenuPosition = Math.round(Math.min(itemPosition, containerWidth - megamenuWidth));

            submenuElement.style.right = megamenuPosition + 'px';
        } else {
            const itemPosition = itemElement.offsetLeft;
            const megamenuPosition = Math.round(Math.min(itemPosition, containerWidth - megamenuWidth));

            submenuElement.style.left = megamenuPosition + 'px';
        }
    }

    getCurrentItemElement(): HTMLDivElement | null {
        if (!this.hoveredItem) {
            return null;
        }

        const index = this.items.indexOf(this.hoveredItem);
        const elements = this.itemElements.toArray();

        if (index === -1 || !elements[index]) {
            return null;
        }

        return elements[index].nativeElement as HTMLDivElement;
    }

    getCurrentSubmenuElement(): HTMLDivElement | null {
        if (!this.hoveredItem) {
            return null;
        }

        const index = this.items.filter(x => x.menu).indexOf(this.hoveredItem);
        const elements = this.submenuElements.toArray();

        if (index === -1 || !elements[index]) {
            return null;
        }

        return elements[index].nativeElement as HTMLDivElement;
    }
}
