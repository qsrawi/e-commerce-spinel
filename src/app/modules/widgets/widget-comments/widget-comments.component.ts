import { Component, Input } from '@angular/core';
import { PostComment } from '../../../shared/interfaces/post-comment';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-widget-comments',
    templateUrl: './widget-comments.component.html',
    styleUrls: ['./widget-comments.component.scss'],
    standalone: true,
    imports: [NgFor, RouterLink]
})
export class WidgetCommentsComponent {
    @Input() comments: PostComment[] = [];

    constructor() { }
}
