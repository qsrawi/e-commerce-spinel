import { Component, Input } from '@angular/core';
import { Link } from '../../../../shared/interfaces/link';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-footer-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.scss'],
    standalone: true,
    imports: [NgFor, RouterLink]
})
export class LinksComponent {
    @Input() header = '';
    @Input() links: Link[] = [];

    constructor() { }
}
