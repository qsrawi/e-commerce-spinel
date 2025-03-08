import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DropcartType, DropcartComponent } from '../../modules/header/components/dropcart/dropcart.component';
import { FooterComponent } from '../../modules/footer/footer.component';
import { HeaderComponent } from '../../modules/header/header.component';
import { MobileHeaderComponent } from '../../modules/mobile/components/mobile-header/mobile-header.component';
import { NgIf } from '@angular/common';
import { MobileMenuComponent } from '../../modules/mobile/components/mobile-menu/mobile-menu.component';
import { QuickviewItemComponent } from '../../shared/components/quickview-item/quickview-item.component';
import { QuickviewComponent } from '../../shared/components/quickview/quickview.component';
import { LoadingBarComponent } from '../../shared/components/loading-bar/loading-bar.component';

interface RouterData {
    headerLayout?: 'classic'|'compact';
    dropcartType?: DropcartType;
}

@Component({
    selector: 'app-main',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss'],
    standalone: true,
    imports: [LoadingBarComponent, QuickviewComponent, QuickviewItemComponent, MobileMenuComponent, NgIf, DropcartComponent, MobileHeaderComponent, HeaderComponent, RouterOutlet, FooterComponent]
})
export class RootComponent {
    headerLayout: 'classic'|'compact' = 'classic';
    dropcartType: DropcartType = 'dropdown';

    constructor(
        public route: ActivatedRoute
    ) {
        this.route.data.subscribe((data: RouterData) => {
            this.headerLayout = data.headerLayout || 'classic';
            this.dropcartType = data.dropcartType || 'dropdown';
        });
    }
}
