import { Component, Input } from '@angular/core';
import { PostComment } from '../../../../shared/interfaces/post-comment';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-comments-list',
    templateUrl: './comments-list.component.html',
    styleUrls: ['./comments-list.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf]
})
export class CommentsListComponent {
    @Input() comments: PostComment[] = [];
    @Input() level = 0;

    constructor() { }
}
