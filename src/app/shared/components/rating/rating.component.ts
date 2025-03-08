import { Component, Input } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    standalone: true,
    imports: [NgFor, NgClass]
})
export class RatingComponent {
    @Input() value = 0;

    constructor() { }
}
