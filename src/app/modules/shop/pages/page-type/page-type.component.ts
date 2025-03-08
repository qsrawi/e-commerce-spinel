import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageCategoryService } from '../../services/page-category.service';
import { Link } from '../../../../shared/interfaces/link';
import { RootService } from '../../../../shared/services/root.service';
import { of, Subject, timer } from 'rxjs';
import { debounce, mergeMap, takeUntil } from 'rxjs/operators';
import { Location, NgIf } from '@angular/common';
import { parseProductsListParams } from '../../resolvers/products-list-resolver.service';
import { ShopService } from '../../../../shared/api/shop.service';
import { parseFilterValue } from '../../../../shared/helpers/filter';
import { Category } from '../../../../shared/interfaces/category';
import { PageTypeService } from '../../services/page-type.service';
import { SEOService } from 'src/app/shared/services/seo.service';
import { Meta, Title } from '@angular/platform-browser';
import { ProductsViewComponent } from '../../components/products-view/products-view.component';
import { ItemsViewComponent } from '../../components/items-view/items-view.component';
import { ShopSidebarComponent } from '../../components/shop-sidebar/shop-sidebar.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
@Component({
    selector: 'app-page-type',
    templateUrl: './page-type.component.html',
    styleUrls: ['./page-type.component.scss'],
    providers: [
        { provide: PageCategoryService, useClass: PageCategoryService },
        { provide: ShopSidebarService, useClass: ShopSidebarService },
    ],
    standalone: true,
    imports: [NgIf, PageHeaderComponent, ShopSidebarComponent, ItemsViewComponent, ProductsViewComponent]
})
export class PageTypeComponent implements OnDestroy {
    isCamp:boolean=false;
    destroy$: Subject<void> = new Subject<void>();
    currentcategory: any = null;
    currentName: any = '';
    columns: 3 | 4 | 5 = 3;
    viewMode: 'grid' | 'grid-with-features' | 'list' = 'grid';
    sidebarPosition: 'start' | 'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"
    breadcrumbs: Link[] = [];
    pageHeader = '';
    StoreLogo: any = '';
    searchWord = null;
    constructor(
        private root: RootService,
        private router: Router,
        private route: ActivatedRoute,
        private pageService: PageTypeService,
        private shop: ShopService,
        private location: Location,
        private SEO: SEOService,
        private meta: Meta
    ) {
        this.route.data.subscribe(data => {
            this.breadcrumbs = [
                { label: 'Home', url: this.root.home() },
                { label: 'Shop', url: this.root.shop() },
            ];
            //Console.log(data);

            // If categorySlug is undefined then this is a root catalog page.
            if (!this.getCategorySlug()) {
                if(route.snapshot.params.campID){
                    this.isCamp=true;
                }
                if (route.snapshot.params.typestring) {

                    if (atob(route.snapshot.params.typestring) == "ItemCategory2") {
                        console.log(data);

                        // let cat: any = data.category.catestores.category.find((aaa: any) => aaa['LKP_ID'] == +atob(route.snapshot.params.type));
                        // this.currentcategory =cat['subcategory'].find((aaa: any) => aaa['LKP_ID'] == +atob(route.snapshot.params.id));
                        // console.log(data.category.catestores.category);
                        // let cat: any = data.category.catestores.category.find((aaa: any) => aaa['LKP_ID'] == +atob(route.snapshot.params.type));
                        // console.log(cat);
                        // this.currentcategory =cat['subcategory'].find((aaa: any) => aaa['LKP_ID'] == +atob(route.snapshot.params.type));


                        this.pageHeader = data.category.catestores.StoreEnName;
                        this.StoreLogo = data.category.catestores.StoreLogo;
                        if (this.currentcategory != null) {
                            this.meta.updateTag({ name: 'description', content: this.currentcategory.MetaDescription });
                            this.meta.addTag({ name: this.currentcategory.MetaTitle, content: this.currentcategory.MetaDescription });

                        }
                    }
                }

                else if (route.snapshot.params.type) {
                    if (atob(route.snapshot.params.type) == "ItemCategory") {
                        this.currentcategory = data.category.catestores.category.find((aaa: any) => aaa['LKP_ID'] == +atob(route.snapshot.params.id));
                    } else if (atob(route.snapshot.params.type) == "store") {
                        this.currentcategory = null;

                    } else {
                        // this.currentcategory = 
                        //Console.log(data.category.catestores);

                        let cat: any = data.category.catestores.category.find((aaa: any) => aaa['LKP_ID'] == +atob(route.snapshot.params.type));
                        this.currentcategory = cat['subcategory'].find((aaa: any) => aaa['LKP_ID'] == +atob(route.snapshot.params.id));

                    }
                    // if (this.route.snapshot.params.type == 'store') {
                    this.pageHeader = data.category.catestores.StoreEnName;
                    this.StoreLogo = data.category.catestores.StoreLogo;
                    if (this.currentcategory != null) {
                        this.meta.updateTag({ name: 'description', content: this.currentcategory.MetaDescription });
                        this.meta.addTag({ name: this.currentcategory.MetaTitle, content: this.currentcategory.MetaDescription });
                        this.currentName=this.currentcategory.ArName;

                    }else{
                        this.currentName=data.category.catestores.StoreEnName;

                    }

                } else {
                    this.currentcategory = null;
                    this.pageHeader = 'search';
                    this.StoreLogo = null;
                    this.searchWord = route.snapshot.params.word;
                }


                //Console.log(this.StoreLogo);

                //  }else if(this.route.snapshot.params.type == 'ItemCategory'){
                //      this.pageHeader=data.category.categories.category.find(c=>c.)

                //  }
                // this.pageHeader = 'Shop';
            } else {
                //Console.log("elseeeeeeeeeeeeeee");

                this.pageHeader = data.category.name;

                this.breadcrumbs = this.breadcrumbs.concat([
                    ...data.category.parents.map(
                        (parent: Category) => ({ label: parent.name, url: this.root.category(parent) })
                    ),
                    { label: data.category.name, url: this.root.category(data.category) },
                ]);
            }

            this.pageService.setList(data.items);

            this.columns = 'columns' in data ? data.columns : this.columns;
            this.viewMode = 'viewMode' in data ? data.viewMode : this.viewMode;
            this.sidebarPosition = 'sidebarPosition' in data ? data.sidebarPosition : this.sidebarPosition;
        });
        this.route.queryParams.subscribe(queryParams => {
            this.pageService.setOptions(parseProductsListParams(queryParams), false);
        });

        this.pageService.optionsChange$.pipe(
            debounce(changedOptions => {
                console.log(changedOptions);

                return changedOptions.filterValues ? timer(250) : of(changedOptions);
            }),
            mergeMap(() => {
                this.updateUrl();
                this.pageService.setIsLoading(true);

                console.log(this.pageService.options);
                if (this.route.snapshot.params.typestring) {
                    return this.shop.getItemListItemCategory2(
                        atob(this.route.snapshot.params.type),
                        +atob(this.route.snapshot.params.id),
                        +atob(this.route.snapshot.params.storeid),
                        atob(this.route.snapshot.params.typestring),
                        this.pageService.options,
                    ).pipe(
                        takeUntil(this.pageService.optionsChange$)
                    )
                } else if (this.route.snapshot.params.type) {
                    return this.shop.getItemList(
                        atob(this.route.snapshot.params.type),
                        +atob(this.route.snapshot.params.id),
                        +atob(this.route.snapshot.params.storeid),
                        this.pageService.options,
                    ).pipe(
                        takeUntil(this.pageService.optionsChange$)
                    )
                } else {
                    return this.shop.getItemListsearch(
                        this.route.snapshot.params.word,
                        this.pageService.options,
                    ).pipe(
                        takeUntil(this.pageService.optionsChange$)
                    )
                }

            }),
            takeUntil(this.destroy$),
        ).subscribe(list => {

            this.pageService.setList(list);
            this.pageService.setIsLoading(false);
        });
    }
    makeCampOrder(){
        console.log(this.route.snapshot.params.campID);
        this.router.navigate(['./shop/cart/camp/'+this.route.snapshot.params.campID]);
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    updateUrl(): void {
        const tree = this.router.parseUrl(this.router.url);
        tree.queryParams = this.getQueryParams();
        this.location.replaceState(tree.toString());
    }
    getQueryParams(): Params {
        const params: Params = {};
        const options = this.pageService.options;
        const filterValues = options.filterValues;

        if ('page' in options && options.page !== 1) {
            params.page = options.page;
        }
        if ('limit' in options && options.limit !== 15) {
            params.limit = options.limit;
        }
        if ('sort' in options && options.sort !== 'default') {
            params.sort = options.sort;
        }
        if ('filterValues' in options) {
            this.pageService.filters.forEach(filter => {
                if (!filterValues || !filterValues[filter.slug]) {
                    return;
                }

                const filterValue: any = parseFilterValue(filter.type as any, filterValues[filter.slug]);

                switch (filter.type) {
                    case 'range':
                        if (filter.min !== filterValue[0] || filter.max !== filterValue[1]) {
                            params[`filter_${filter.slug}`] = `${filterValue[0]}-${filterValue[1]}`;
                        }
                        break;
                    case 'check':
                    case 'color':
                        if (filterValue.length > 0) {
                            params[`filter_${filter.slug}`] = filterValues[filter.slug];
                        }
                        break;
                    case 'radio':
                        if (filterValue !== filter.items[0].slug) {
                            params[`filter_${filter.slug}`] = filterValue;
                        }
                        break;
                }
            });
        }

        return params;
    }

    getCategorySlug(): string | null {
        return this.route.snapshot.params.categorySlug || this.route.snapshot.data.categorySlug || null;
    }

    getProductsViewLayout(): 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full' {
        return 'grid-' + this.columns + '-full' as 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full';
    }
}
