import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// modules
import { SharedModule } from '../../shared/shared.module';

// components
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { MobileLinksComponent } from './components/mobile-links/mobile-links.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        // modules (angular)
        CommonModule,
        RouterModule,
        // modules
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        // components
        MobileHeaderComponent,
        MobileLinksComponent,
        MobileMenuComponent,
    ],
    exports: [
        // components
        MobileHeaderComponent,
        MobileMenuComponent
    ]
})
export class MobileModule { }
