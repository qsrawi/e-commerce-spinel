import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../../../shared/api/shop.service';
import { Observable } from 'rxjs';
import Item from 'src/app/shared/Models/Item';
import { BlockItemsComponent } from '../../../blocks/block-items/block-items.component';
import { ItemTabsComponent } from '../../components/item-tabs/item-tabs.component';
import { ItemComponent } from '../../../../shared/components/item/item.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
@Component({
    selector: 'app-page-item',
    templateUrl: './page-item.component.html',
    styleUrls: ['./page-item.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent, NgIf, ItemComponent, ItemTabsComponent, BlockItemsComponent, AsyncPipe]
})
export class PageItemComponent implements OnInit {
  relatedItems$!: Observable<Item[]>;
  item!: Item;
  layout: 'standard' | 'columnar' | 'sidebar' = 'standard';
  sidebarPosition: 'start' | 'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"
  constructor(
    private shop: ShopService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      //Console.log(data);

      this.layout = data.layout || this.layout;
      this.sidebarPosition = data.sidebarPosition || this.sidebarPosition;
      this.item = data.item;
      this.relatedItems$ = this.shop.getRelatedItems(data.item);
    });
  }

}
