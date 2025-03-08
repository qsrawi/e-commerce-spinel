import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';
import { RootService } from '../../services/root.service';
import { RouterLink } from '@angular/router';
import { ClickDirective } from '../../directives/click.directive';
import { NgClass, NgFor } from '@angular/common';

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.scss'],
    standalone: true,
    imports: [NgClass, ClickDirective, RouterLink, NgFor]
})
export class PostCardComponent {
    @Input() post!: Post;
    @Input() layout: 'grid-nl'|'grid-lg'|'list-nl'|'list-sm'|null = null;

    constructor(public root: RootService) { }
}
