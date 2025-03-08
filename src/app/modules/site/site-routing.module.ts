import { NgModule } from '@angular/core';
import { PageAboutUsComponent } from './pages/page-about-us/page-about-us.component';
import { PageContactUsComponent } from './pages/page-contact-us/page-contact-us.component';
import { PageContactUsAltComponent } from './pages/page-contact-us-alt/page-contact-us-alt.component';
import { PageTermsComponent } from './pages/page-terms/page-terms.component';
import { PageFaqComponent } from './pages/page-faq/page-faq.component';
import { PageComponentsComponent } from './pages/page-components/page-components.component';
import { PageTypographyComponent } from './pages/page-typography/page-typography.component';
import { PageServicesComponent } from './pages/page-services/page-services.component';
import { PageShippingAndReturnsComponent } from './pages/page-shipping-and-returns/page-shipping-and-returns.component';
import { PageImportantAdvicesComponent } from './pages/page-important-advices/page-important-advices.component';
import { PageSecureShoppingComponent } from './pages/page-secure-shopping/page-secure-shopping.component';
import { PageBuyerProtectionComponent } from './pages/page-buyer-protection/page-buyer-protection.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { PageOurScienceComponent } from './pages/page-OurScience/page-OurScience.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'about-us'
    },
    {
        path: 'about-us',
        component: PageAboutUsComponent
    },
    {
        path: 'contact-us',
        component: PageContactUsComponent
    },
    {
        path: 'OurScience/:id',
        component: PageOurScienceComponent
    },  
    {
        path: 'BrandStory',
        component: PageOurScienceComponent
    },
    {
        path: 'contact-us-alt',
        component: PageContactUsAltComponent
    },
    {
        path: 'terms',
        component: PageTermsComponent
    },
    {
        path: 'PrivacyPolicy',
        component: PrivacyPolicyComponent
    },
    {
        path: 'faq',
        component: PageFaqComponent
    },
    {
        path: 'Services',
        component: PageServicesComponent
    }, {
        path: 'ShippingandReturns',
        component: PageShippingAndReturnsComponent
    }, {
        path: 'ImportantAdvices',
        component: PageImportantAdvicesComponent
    }, {
        path: 'SecureShopping',
        component: PageSecureShoppingComponent
    },
    {
        path: 'components',
        component: PageComponentsComponent
    },
    {
        path: 'typography',
        component: PageTypographyComponent
    },
    {
        path: 'BuyerProtection',
        component: PageBuyerProtectionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteRoutingModule { }
