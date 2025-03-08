import { Component, Input, OnInit } from '@angular/core';
import { ProductFeaturesSection } from '../../../../shared/interfaces/product';
import { specification } from '../../../../../data/shop-product-spec';
import { reviews } from '../../../../../data/shop-product-reviews';
import { Review } from '../../../../shared/interfaces/review';
import Item from 'src/app/shared/Models/Item';
import CustomerReview, { initCustomerReviewModal } from 'src/app/shared/Models/CustomerReview';
import { ShopService } from 'src/app/shared/api/shop.service';
import { ToastrService } from 'ngx-toastr';
import { ThisReceiver } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from '../../../../shared/components/rating/rating.component';
import { NgClass, NgIf, NgFor } from '@angular/common';
@Component({
    selector: 'app-item-tabs',
    templateUrl: './item-tabs.component.html',
    styleUrls: ['./item-tabs.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf, NgFor, RatingComponent, FormsModule]
})
export class ItemTabsComponent implements OnInit {

  @Input() withSidebar = false;
  @Input() tab: 'description' | 'specification' | 'reviews' = 'description';
  @Input() item!: Item;
  loading:boolean=true;
  specification: ProductFeaturesSection[] = specification;
  reviews: Review[] = reviews;
  custReviewList: CustomerReview[] = [];
  NewCustomerReview: CustomerReview = initCustomerReviewModal;
  constructor(private shopeService: ShopService, private toastr: ToastrService,) {
  }
ngOnInit() {
  
  this.getCustomReview();

}
  AddnewCustomerReview() {
    if (localStorage.getItem('accessTokenEcommerce') != null) {
      this.NewCustomerReview.ItemId = +this.item.ItemID;
      this.shopeService.postReview(this.NewCustomerReview).subscribe(
        (res: CustomerReview[]) => {
          initCustomerReviewModal.FullName='';
          initCustomerReviewModal.ID=0;
          initCustomerReviewModal.ItemId=0;
          initCustomerReviewModal.Review='';
          initCustomerReviewModal.Stars=5;
          // console.log(res);
          this.NewCustomerReview=initCustomerReviewModal;
          this.custReviewList = res;
          this.toastr.success(`Your Review Added Successfully`);

        }
      );
    } else {
      this.toastr.error(`You Must Login First`);


    }

  }


  getCustomReview() {
      this.NewCustomerReview.ItemId = +this.item.ItemID;
      this.shopeService.getItemReviews(+this.item.ItemID).subscribe(
        (res: CustomerReview[]) => {
          this.custReviewList = res;
          this.loading=false;
        }
      );
  }
}
