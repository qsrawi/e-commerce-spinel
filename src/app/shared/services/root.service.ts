import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';
import { Brand } from '../interfaces/brand';
import Item from '../Models/Item';

@Injectable({
    providedIn: 'root'
})
export class RootService {
    constructor() { }

    home(): string {
        
        return '/';
    }

    shop(): string {
        return `/shop/catalog`;
    }
    forgotPassword(): string {
        return `/account/forgotpassword`;
    }

    category(category: Partial<Category>): string {
        if (category.type === 'shop') {
            const basePath = this.shop();

            if ('slug' in category) {
                return `${basePath}/${category.slug}`;
            }
            if ('id' in category) {
                return `${basePath}/${category.id}`;
            }

            throw Error('Provide category with "path", "slug" or "id".');
        }
        if (category.type === 'blog') {
            return this.blog();
        }

        throw Error('Provided category with unknown type.');
    }
    categoryfff(category: any): string {
       const basePath = '/shop/catalog/';
        let url=basePath+`${btoa(category['LKP_Type'])}/${btoa(category['LKP_ID'])}/${btoa(category['RelatedID'])}`;
        return url;
        throw Error('Provided category with unknown type.');
    }
    product(product: Partial<Product>): string {
        const basePath = '/shop/products';

        if ('slug' in product) {
            return `${basePath}/${product.slug}`;
        }
        if ('id' in product) {
            return `${basePath}/${product.id}`;
        }

        throw Error('Provide product with "slug" or "id".');
    }
    item(item: Partial<Item>): string {
        
        const basePath = '/shop/items';

        // if ('slug' in product) {
        //     return `${basePath}/${product.slug}`;
        // }
        // if ('ItemID' in product) {
        return `${basePath}/${btoa(item.ItemID+'')}`;
        //}

        throw Error('Provide product with "slug" or "id".');
    }
    // noinspection JSUnusedLocalSymbols
    brand(brand: Partial<Brand>): string {
        return '/';
    }

    cart(): string {
        return '/shop/cart';
    }

    checkout(): string {
        return '/shop/cart/checkout';
    }

    wishlist(): string {
        return '/shop/wishlist';
    }
    comparelist(): string {
        return '/shop/compare';
    }
    blog(): string {
        return '/blog';
    }

    post(): string {
        return `/blog/post-classic`;
    }

    login(): string {
        return '/account/login';
    }

    terms(): string {
        return '/site/terms';
    }

    notFound(): string {
        return `/site/not-found`;
    }

    filtterchange(item: any, type: string, id: number, storeid: number) {
        const basePath = this.shop();
        if (type == 'store') {
            return `${basePath}/${type}/${id}/${storeid}`;
        }else {

            if(item.category.LKP_Type=="ItemCategory"){
                
                
                return `${basePath}/${btoa(item.category.LKP_Type)}/${btoa(item.category.LKP_ID)}/${storeid.toString()}`
            }else if(item.category.LKP_Type=="ItemCategory2"){
                return `${basePath}/${btoa(item.category.RelatedID)}/${btoa(item.category.LKP_ID)}/${storeid.toString()}/${btoa(item.category.LKP_Type)}`;

            }
            else
            {

                return `${basePath}/${btoa(item.category.RelatedID)}/${btoa(item.category.LKP_ID)}/${storeid.toString()}`;

            }
        }
    }
}

