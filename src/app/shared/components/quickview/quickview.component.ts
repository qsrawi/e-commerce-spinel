import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { QuickviewService } from '../../services/quickview.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from '../../interfaces/product';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductComponent } from '../product/product.component';
import { NgIf } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ClickDirective } from '../../directives/click.directive';

@Component({
    selector: 'app-quickview',
    templateUrl: './quickview.component.html',
    styleUrls: ['./quickview.component.scss'],
    standalone: true,
    imports: [ClickDirective, IconComponent, NgIf, ProductComponent]
})
export class QuickviewComponent implements AfterViewInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();

    @ViewChild('modal', { read: TemplateRef }) template!: TemplateRef<any>;

    modalRef?: BsModalRef;
    product?: Product;

    constructor(
        private quickview: QuickviewService,
        private modalService: BsModalService
    ) { }

    ngAfterViewInit(): void {
        this.quickview.show$.pipe(takeUntil(this.destroy$)).subscribe(product => {
            if (this.modalRef) {
                this.modalRef.hide();
            }

            this.product = product;
            this.modalRef = this.modalService.show(this.template, {class: 'modal-dialog-centered modal-xl'});
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
