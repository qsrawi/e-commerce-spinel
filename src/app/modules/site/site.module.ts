import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';

// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';

// modules
import { BlocksModule } from '../blocks/blocks.module';
import { SharedModule } from '../../shared/shared.module';
import { SiteRoutingModule } from './site-routing.module';

// pages
import { PageAboutUsComponent } from './pages/page-about-us/page-about-us.component';
import { PageComponentsComponent } from './pages/page-components/page-components.component';
import { PageContactUsAltComponent } from './pages/page-contact-us-alt/page-contact-us-alt.component';
import { PageContactUsComponent } from './pages/page-contact-us/page-contact-us.component';
import { PageFaqComponent } from './pages/page-faq/page-faq.component';
import { PageTermsComponent } from './pages/page-terms/page-terms.component';
import { PageTypographyComponent } from './pages/page-typography/page-typography.component';
import { FormsModule } from '@angular/forms';
import { PageServicesComponent } from './pages/page-services/page-services.component';
import { PageShippingAndReturnsComponent } from './pages/page-shipping-and-returns/page-shipping-and-returns.component';
import { PageImportantAdvicesComponent } from './pages/page-important-advices/page-important-advices.component';
import { PageSecureShoppingComponent } from './pages/page-secure-shopping/page-secure-shopping.component';
import { PageBuyerProtectionComponent } from './pages/page-buyer-protection/page-buyer-protection.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { PageOurScienceComponent } from './pages/page-OurScience/page-OurScience.component';

@NgModule({
    imports: [
        // modules (angular)
        CommonModule,
        // modules (third-party)
        CarouselModule,
        // modules
        FormsModule,
        BlocksModule,
        SharedModule,
        SiteRoutingModule,
        // pages
        PageAboutUsComponent,
        PageComponentsComponent,
        PageContactUsAltComponent,
        PageContactUsComponent,
        PageOurScienceComponent,
        PageFaqComponent,
        PageTermsComponent,
        PageTypographyComponent,
        PageServicesComponent,
        PageShippingAndReturnsComponent,
        PageImportantAdvicesComponent,
        PageSecureShoppingComponent,
        PageBuyerProtectionComponent,
        PrivacyPolicyComponent
    ]
})
export class SiteModule { }
