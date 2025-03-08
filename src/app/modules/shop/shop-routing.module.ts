import { NgModule } from '@angular/core';
import { Routes, RouterModule, Data, ResolveData } from '@angular/router';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PageCartComponent } from './pages/page-cart/page-cart.component';
import { PageWishlistComponent } from './pages/page-wishlist/page-wishlist.component';
import { PageCheckoutComponent } from './pages/page-checkout/page-checkout.component';
import { PageCompareComponent } from './pages/page-compare/page-compare.component';
import { PageTrackOrderComponent } from './pages/page-track-order/page-track-order.component';
import { CheckoutGuard } from './guards/checkout.guard';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { ProductsListResolverService } from './resolvers/products-list-resolver.service';
import { CategoryResolverService } from './resolvers/category-resolver.service';
import { ProductResolverService } from './resolvers/product-resolver.service';
import { PageOrderSuccessComponent } from './pages/page-order-success/page-order-success.component';
import { PageItemComponent } from './pages/page-item/page-item.component';
import { ItemResolverService } from './resolvers/item-resolver.service';
import { ItemsListResolverService } from './resolvers/items-list-resolver.service';
import { TypeResolverService } from './resolvers/type-resolver.service';
import { PageTypeComponent } from './pages/page-type/page-type.component';

const categoryPageData: Data = {
    // Number of products per row. Possible values: 3, 4, 5.
    columns: 3,
    // Shop view mode by default. Possible values: 'grid', 'grid-with-features', 'list'.
    viewMode: 'grid',
    // Sidebar position. Possible values: 'start', 'end'.
    // It does not matter if the value of the 'columns' parameter is not 3.
    // For LTR scripts "start" is "left" and "end" is "right".
    sidebarPosition: 'start'
};

const categoryPageResolvers: ResolveData = {
    category: CategoryResolverService,
    products: ProductsListResolverService
};
const typePageResolvers: ResolveData = {
    category: TypeResolverService,
    items: ItemsListResolverService
};
const routes: Routes = [
    {
        path: 'catalog',
        component: PageCategoryComponent,
        data: categoryPageData,
        resolve: categoryPageResolvers,
    },
    // {
    //     path: 'catalog/:categorySlug',
    //     component: PageCategoryComponent,
    //     data: categoryPageData,
    //     resolve: categoryPageResolvers,
    // },
    // {
    //     // type store or main category or subcategory
    //     path: 'catalog/CampaignsandOffers',
    //     component: PageTypeComponent,
    //     data: categoryPageData,
    //     resolve: typePageResolvers,
    // },
    {
        // type store or main category or subcategory
        path: 'catalog/:word/:campID',
        component: PageTypeComponent,
        data: categoryPageData,
        resolve: typePageResolvers,
    },
    {
        // type store or main category or subcategory
        path: 'catalog/:word',
        component: PageTypeComponent,
        data: categoryPageData,
        resolve: typePageResolvers,
    },
    {
        // type store or main category or subcategory
        path: 'catalog/:type/:id/:storeid',
        component: PageTypeComponent,
        data: categoryPageData,
        resolve: typePageResolvers,
    },
    {
        // type store or main category or subcategory
        path: 'catalog/:type/:id/:storeid/:typestring',
        component: PageTypeComponent,
        data: categoryPageData,
        resolve: typePageResolvers,
    },
    {
        path: 'products/:productSlug',
        component: PageProductComponent,
        data: {
            // Product page layout. Possible values: 'standard', 'columnar', 'sidebar'.
            layout: 'standard',
            // Sidebar position. Possible values: 'start', 'end'.
            // It does not matter if the value of the 'layout' parameter is not 'sidebar'.
            // For LTR scripts "start" is "left" and "end" is "right".
            sidebarPosition: 'start'
        },
        resolve: {
            product: ProductResolverService
        },
    },
    {
        path: 'items/:ItemID',
        component: PageItemComponent,
        data: {
            // Product page layout. Possible values: 'standard', 'columnar', 'sidebar'.
            layout: 'standard',
            // Sidebar position. Possible values: 'start', 'end'.
            // It does not matter if the value of the 'layout' parameter is not 'sidebar'.
            // For LTR scripts "start" is "left" and "end" is "right".
            sidebarPosition: 'start'
        },
        resolve: {
            item: ItemResolverService
        },
    },
    {
        path: 'cart',
        pathMatch: 'full',
        component: PageCartComponent
    }, 
    {
        path: 'cart/camp/:campID',
        pathMatch: 'full',
        component: PageCartComponent
    },
    {
        path: 'cart/checkout/:campID',
        component: PageCheckoutComponent,
        // canActivate: [CheckoutGuard],
    },
    {
        path: 'cart/checkout',
        component: PageCheckoutComponent,
        canActivate: [CheckoutGuard],
    },
    {
        path: 'cart/checkout/success/:done',
        component: PageOrderSuccessComponent,
    },
    {
        path: 'wishlist',
        component: PageWishlistComponent
    },
    {
        path: 'compare',
        component: PageCompareComponent
    },
    {
        path: 'track-order',
        component: PageTrackOrderComponent
    },
    {
        path: 'track-order/:orderid',
        component: PageTrackOrderComponent
    },
    // --- START ---
    // The following routes are only needed to demonstrate possible layouts of some pages. You can delete them.
    {
        path: 'category-grid-4-columns-full',
        component: PageCategoryComponent,
        data: {
            columns: 4,
            viewMode: 'grid',
            categorySlug: 'power-tools',
        },
        resolve: {
            category: CategoryResolverService,
            products: ProductsListResolverService
        },
    },
    {
        path: 'category-grid-5-columns-full',
        component: PageCategoryComponent,
        data: {
            columns: 5,
            viewMode: 'grid',
            categorySlug: 'power-tools',
        },
        resolve: {
            category: CategoryResolverService,
            products: ProductsListResolverService
        },
    },
    {
        path: 'category-list',
        component: PageCategoryComponent,
        data: {
            columns: 3,
            viewMode: 'list',
            sidebarPosition: 'start',
            categorySlug: 'power-tools',
        },
        resolve: {
            category: CategoryResolverService,
            products: ProductsListResolverService
        },
    },
    {
        path: 'category-right-sidebar',
        component: PageCategoryComponent,
        data: {
            columns: 3,
            viewMode: 'grid',
            sidebarPosition: 'end',
            categorySlug: 'power-tools',
        },
        resolve: {
            category: CategoryResolverService,
            products: ProductsListResolverService
        },
    },
    {
        path: 'product-standard',
        component: PageProductComponent,
        data: {
            layout: 'standard',
            sidebarPosition: 'start',
            productSlug: 'brandix-screwdriver-screw1500acc',
        },
        resolve: {
            product: ProductResolverService
        },
    },
    {
        path: 'product-columnar',
        component: PageProductComponent,
        data: {
            layout: 'columnar',
            productSlug: 'brandix-screwdriver-screw1500acc',
        },
        resolve: {
            product: ProductResolverService
        },
    },
    {
        path: 'product-sidebar',
        component: PageProductComponent,
        data: {
            layout: 'sidebar',
            sidebarPosition: 'start',
            productSlug: 'brandix-screwdriver-screw1500acc',
        },
        resolve: {
            product: ProductResolverService
        },
    },
    // --- END ---
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
