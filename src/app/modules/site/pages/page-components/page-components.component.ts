import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-components',
    templateUrl: './page-components.component.html',
    styleUrls: ['./page-components.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent, NgIf, AlertComponent, FormsModule, NgFor, IconComponent, TitleCasePipe]
})
export class PageComponentsComponent {
    showAlert = true;

    constructor() { }
}
