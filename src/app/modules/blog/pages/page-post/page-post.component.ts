import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PostComponent } from '../../components/post/post.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NgIf } from '@angular/common';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-post',
    templateUrl: './page-post.component.html',
    styleUrls: ['./page-post.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent, NgIf, SidebarComponent, PostComponent]
})
export class PagePostComponent implements OnDestroy {
    private destroy$: Subject<void> = new Subject();

    sidebarPosition: 'start'|'end' = 'end'; // For LTR scripts "start" is "left" and "end" is "right"
    layout: 'classic'|'full' = 'classic';

    constructor(private route: ActivatedRoute) {
        this.route.data.pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.sidebarPosition = data.sidebarPosition;
            this.layout = data.layout;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
