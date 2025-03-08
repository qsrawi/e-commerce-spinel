import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Item from '../../Models/Item';
import { QuickviewitemService } from '../../services/quickviewitem.service';
import { ItemComponent } from '../item/item.component';
import { NgIf } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ClickDirective } from '../../directives/click.directive';
@Component({
    selector: 'app-quickview-item',
    templateUrl: './quickview-item.component.html',
    styleUrls: ['./quickview-item.component.scss'],
    standalone: true,
    imports: [ClickDirective, IconComponent, NgIf, ItemComponent]
})
export class QuickviewItemComponent implements  AfterViewInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();

  @ViewChild('modal', { read: TemplateRef }) template!: TemplateRef<any>;

  modalRef?: BsModalRef;
  item?: Item;

  constructor(
      private quickview: QuickviewitemService,
      private modalService: BsModalService
  ) { }

  ngAfterViewInit(): void {
      this.quickview.show$.pipe(takeUntil(this.destroy$)).subscribe(item => {
          if (this.modalRef) {
              this.modalRef.hide();
          }

          this.item = item;
          this.modalRef = this.modalService.show(this.template, {class: 'modal-dialog-centered modal-xl'});
      });
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
