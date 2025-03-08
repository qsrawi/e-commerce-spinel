import { Component, Input } from '@angular/core';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
    selector: 'app-block-features',
    templateUrl: './block-features.component.html',
    styleUrls: ['./block-features.component.scss'],
    standalone: true,
    imports: [IconComponent]
})
export class BlockFeaturesComponent {
    @Input() layout: 'classic'|'boxed' = 'classic';

    constructor() { }
}
