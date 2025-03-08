import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../../shared/interfaces/post';
import { posts } from '../../../../../data/blog-posts';
import { latestComments } from '../../../../../data/blog-widget-latest-comments';
import { BlogService } from '../../../../shared/api/blog.service';
import { Category } from '../../../../shared/interfaces/category';
import { SlicePipe } from '@angular/common';
import { WidgetTagsComponent } from '../../../widgets/widget-tags/widget-tags.component';
import { WidgetCommentsComponent } from '../../../widgets/widget-comments/widget-comments.component';
import { WidgetNewsletterComponent } from '../../../widgets/widget-newsletter/widget-newsletter.component';
import { WidgetPostsComponent } from '../../../widgets/widget-posts/widget-posts.component';
import { WidgetCategoriesComponent } from '../../../widgets/widget-categories/widget-categories.component';
import { WidgetAboutusComponent } from '../../../widgets/widget-aboutus/widget-aboutus.component';
import { WidgetSearchComponent } from '../../../widgets/widget-search/widget-search.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [WidgetSearchComponent, WidgetAboutusComponent, WidgetCategoriesComponent, WidgetPostsComponent, WidgetNewsletterComponent, WidgetCommentsComponent, WidgetTagsComponent, SlicePipe]
})
export class SidebarComponent implements OnInit {
    @Input() position: 'start'|'end' = 'start';

    posts: Post[] = posts;
    categories: Category[] = [];
    latestComments = latestComments;

    constructor(
        private blog: BlogService,
    ) { }

    ngOnInit(): void {
        this.blog.getCategories(null, 1).subscribe(x => this.categories = x);
    }
}
