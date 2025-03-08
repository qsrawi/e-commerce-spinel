import { Component, Input } from '@angular/core';
import { RootService } from '../../../shared/services/root.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CollapseDirective, CollapseItemDirective, CollapseContentDirective } from '../../../shared/directives/collapse.directive';

@Component({
    selector: 'app-widget-categories',
    templateUrl: './widget-categories.component.html',
    styleUrls: ['./widget-categories.component.scss'],
    standalone: true,
    imports: [CollapseDirective, NgFor, CollapseItemDirective, RouterLink, IconComponent, NgIf, CollapseContentDirective]
})
export class WidgetCategoriesComponent {
    @Input() location: 'blog'|'shop' = 'blog';
    @Input() categories: any[] = [];

    constructor(
        public root: RootService,
    ) { }

}
