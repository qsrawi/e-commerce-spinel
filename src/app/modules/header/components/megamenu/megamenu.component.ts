import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Megamenu } from '../../../../shared/interfaces/megamenu';
import { NestedLink } from '../../../../shared/interfaces/nested-link';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-header-megamenu',
    templateUrl: './megamenu.component.html',
    styleUrls: ['./megamenu.component.scss'],
    standalone: true,
    imports: [NgFor, NgClass, NgIf, RouterLink, IconComponent]
})
export class MegamenuComponent {
    @Input() menu!: Megamenu;
    @Output() itemClick: EventEmitter<NestedLink> = new EventEmitter<NestedLink>();
    Showitem: any;
    constructor() {
    }

    changetshowindex(item: any) {

        this.Showitem = item;
    }
}
