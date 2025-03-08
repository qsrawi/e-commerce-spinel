import { Component, Input } from '@angular/core';
import { Post } from '../../../../shared/interfaces/post';
import { PostCommentsList } from '../../../../shared/interfaces/post-comments-list';
import { posts } from '../../../../../data/blog-posts';
import { postComments } from '../../../../../data/blog-post-comments';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { ShareButtonsComponent } from '../../../../shared/components/share-buttons/share-buttons.component';
import { NgClass, NgFor, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-post-details',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    standalone: true,
    imports: [RouterLink, NgClass, ShareButtonsComponent, NgFor, CommentsListComponent, SlicePipe]
})
export class PostComponent {
    @Input() layout: 'classic'|'full' = 'classic';

    posts: Post[] = posts;
    comments: PostCommentsList = postComments;

    constructor() { }
}
