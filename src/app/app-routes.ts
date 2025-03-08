import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHomeOneComponent } from './pages/page-home-one/page-home-one.component';
import { PageHomeTwoComponent } from './pages/page-home-two/page-home-two.component';
import { RootComponent } from './components/root/root.component';
import { PageOffcanvasCartComponent } from './pages/page-offcanvas-cart/page-offcanvas-cart.component';
import { Routes } from '@angular/router';


export const routes: Routes = [
    // START / ONLY_FOR_DEMO_YOU_CAN_DELETE_IT
    {
        path: 'home-two',
        component: RootComponent,
        data: {
            headerLayout: 'compact',
            dropcartType: 'dropdown'
        },
        children: [
            {
                path: '',
                component: PageHomeTwoComponent
            }
        ],
    },
    {
        path: 'offcanvas-cart',
        component: RootComponent,
        data: {
            headerLayout: 'compact', // change .. from classic
            dropcartType: 'offcanvas'
        },
        children: [
            {
                path: '',
                component: PageOffcanvasCartComponent
            }
        ],
    },
    // END / ONLY_FOR_DEMO_YOU_CAN_DELETE_IT
    {
        path: '',
        component: RootComponent,
        data: {
            // Header layout. Choose one of ['classic', 'compact'].
            headerLayout: 'compact', // change ... from classic
            // Dropcart type. Choose one of ['dropdown', 'offcanvas'].
            dropcartType: 'dropdown'
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                // component: PageHomeOneComponent change..
                component:PageHomeTwoComponent,
            },
            {
                path: 'shop',
                loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)
            },
            {
                path: 'blog',
                loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
            },
            {
                path: 'account',
                loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
            },
            {
                path: 'site',
                loadChildren: () => import('./modules/site/site.module').then(m => m.SiteModule)
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
        ],
    },
];

// { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
// {
//   path: 'auth/login',
//   loadComponent: () =>
//     import('../app/authentication/login/login.component').then((m) => m.LoginComponent),
// },
// { path: '', component: MainLayoutComponent, children: content },
// { path: '', component: AuthenticationLayoutComponent, children: authen },
