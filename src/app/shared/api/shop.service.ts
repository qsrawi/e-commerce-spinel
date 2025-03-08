import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Brand } from '../interfaces/brand';
import { Product } from '../interfaces/product';
import { ItemsList, ProductsList } from '../interfaces/list';
import { SerializedFilterValues } from '../interfaces/filter';
import {
    getBestsellers,
    getFeatured,
    getLatestProducts,
    getProduct,
    getRelatedProducts,
    getSpecialOffers,
    getTopRated,
    getShopCategoriesBySlugs,
    getShopCategoriesTree,
    getShopCategory,
    getBrands,
    getProductsList,
} from '../../../fake-server';
import { getSuggestions } from 'src/fake-server/database/products';
import Item from '../Models/Item';
import { getItemsList } from 'src/fake-server/items-list';
import CustomerReview from '../Models/CustomerReview';
import Campaign from '../Models/campaign';

export interface ListOptions {
    page?: number;
    limit?: number;
    sort?: string;
    filterValues?: SerializedFilterValues;
}

@Injectable({
    providedIn: 'root'
})
export class ShopService {
    // noinspection JSUnusedLocalSymbols
    server: string = "http://192.119.110.192:5001/api/";

    token = localStorage.getItem('accessTokenEcommerce');
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
    });
    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Returns category object by slug.
     *
     * @param slug - Unique human-readable category identifier.
     */
    getCategory(slug: string): Observable<Category> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/categories/power-tools.json
         *
         * where:
         * - power-tools = slug
         */
        // return this.http.get<Category>(`https://example.com/api/shop/categories/${slug}.json`);

        // This is for demonstration purposes only. Remove it and use the code above.
        return getShopCategory(slug);
    }
    getCategoryitem(StoreID: number): Observable<JSON> {
        return this.http.get<JSON>(this.server + `items/getcatByStoreID/${StoreID}`, { headers: this.headers });
    }
    /**
     * Returns a category tree.
     *
     * @param parent - If a parent is specified then its descendants will be returned.
     * @param depth  - Maximum depth of category tree.
     */
    getCategories(parent: Partial<Category> | null = null, depth: number = 0): Observable<Category[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/categories.json?parent=latest-news&depth=1
         *
         * where:
         * - parent = parent.slug
         * - depth  = depth
         */
        // const params: {[param: string]: string} = {
        //     parent: parent.slug,
        //     depth: depth.toString(),
        // };
        //
        // return this.http.get<Category[]>('https://example.com/api/shop/categories.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getShopCategoriesTree(parent ? parent.slug : null, depth);
    }

    /**
     * Returns an array of the specified categories.
     *
     * @param slugs - Array of slugs.
     * @param depth - Maximum depth of category tree.
     */
    getCategoriesBySlug(slugs: string[], depth: number = 0): Observable<Category[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/categories.json?slugs=power-tools,measurement&depth=1
         *
         * where:
         * - slugs = slugs.join(',')
         * - depth = depth
         */
        // const params: {[param: string]: string} = {
        //     slugs: slugs.join(','),
        //     depth: depth.toString(),
        // };
        //
        // return this.http.get<Category[]>('https://example.com/api/shop/categories.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getShopCategoriesBySlugs(slugs, depth);
    }

    /**
     * Returns paginated products list.
     * If categorySlug is null then a list of all products should be returned.
     *
     * @param categorySlug         - Unique human-readable category identifier.
     * @param options              - Options.
     * @param options.page         - Page number (optional).
     * @param options.limit        - Maximum number of items returned at one time (optional).
     * @param options.sort         - The algorithm by which the list should be sorted (optional).
     * @param options.filterValues - An object whose keys are filter slugs and values ​​are filter values (optional).
     */
    getProductsList(categorySlug: string | null, options: ListOptions): Observable<ProductsList> {
        //Console.log(options);
        return getProductsList(categorySlug, options);
    }
    getItemList(type: string, id: number, StoreID: number, options: ListOptions): Observable<ItemsList> {
        console.log(options);
        console.log(type);
        console.log(id);
        console.log(StoreID);



        let items: Item[] = [];
        if (options.limit == undefined) {
            options.limit = 20;
            options.page = 1;
        }
        return this.http.post<ItemsList>(this.server + `items/geitems/${type}/${id}/${StoreID}`, options, { headers: this.headers });
    }
    getItemListItemCategory2(type: string, id: number, StoreID: number, typestring: string, options: ListOptions): Observable<ItemsList> {
        console.log(options);
        console.log(type);
        console.log(id);
        console.log(StoreID);
        console.log(typestring);



        let items: Item[] = [];
        if (options.limit == undefined) {
            options.limit = 20;
            options.page = 1;
        }
        return this.http.post<ItemsList>(this.server + `items/geitemsItemCategory2/${type}/${id}/${StoreID}/${typestring}`, options, { headers: this.headers });
    }

    getItemListsearch(word: string, options: ListOptions): Observable<ItemsList> {
        console.log(options);

        let items: Item[] = [];
        if (options.limit == undefined) {
            options.limit = 20;
            options.page = 1;
        }
        return this.http.post<ItemsList>(this.server + `items/geitemssearch/${word}`, options, { headers: this.headers });
    }
    getItemListsearchCamp(word: string,campaignID:Number, options: ListOptions): Observable<ItemsList> {
        console.log(options);

        let items: Item[] = [];
        if (options.limit == undefined) {
            options.limit = 20;
            options.page = 1;
        }
        return this.http.post<ItemsList>(this.server + `items/geitemssearchcamp/${word}/${campaignID}`, options, { headers: this.headers });
    }
    getItemListsearchCampForCart(campaignID:Number): Observable<Item[]> {
        
        return this.http.get<Item[]>(this.server + `items/geitemssearchcampcart/${campaignID}`, { headers: this.headers });
    }
    checkIfItemHasAQuantity(ItemID: Number, RelatedID?: String, ColorID?: Number, SizeID?: Number): Observable<any> {
        return this.http.get<any>(this.server + `items/checkIfItemHasAQuantity/${ItemID}/${RelatedID}/${ColorID}/${SizeID}`, { headers: this.headers });
    }
    postReview(Rev: CustomerReview): Observable<CustomerReview[]> {

        return this.http.post<CustomerReview[]>(this.server + `items/New_Item_Customer_Review`, Rev, { headers: this.headers });
    }


    getItemReviews(itemID: number): Observable<CustomerReview[]> {

        return this.http.get<CustomerReview[]>(this.server + `items/getItemReview/${itemID}`, { headers: this.headers });
    }
    getProduct(productSlug: string): Observable<Product> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/products/electric-planer-brandix-kl370090g-300-watts.json
         *
         * where:
         * - electric-planer-brandix-kl370090g-300-watts = productSlug
         */
        // return this.http.get<Product>(`https://example.com/api/products/${productSlug}.json`);

        // This is for demonstration purposes only. Remove it and use the code above.
        return getProduct(productSlug);
    }

    /**
     * Returns popular brands.
     */
    getPopularBrands(): Observable<Brand[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/brands/popular.json
         */
        // return this.http.get<Brand[]>('https://example.com/api/shop/brands/popular.json');

        // This is for demonstration purposes only. Remove it and use the code above.
        return getBrands();
    }

    getBestsellers(limit: number | null = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/bestsellers.json?limit=3
         *
         * where:
         * - limit = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/bestsellers.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getBestsellers(limit);
    }
    getlastitems(type: string, id: number, StoreID: number): Observable<Item[]> {
        return this.http.get<Item[]>(this.server + `items/geitemslastesBycategory/${type}/${id}/${StoreID}`, { headers: this.headers });
    }
    getTopRated(limit: number | null = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/top-rated.json?limit=3
         *
         * where:
         * - limit = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/top-rated.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getTopRated(limit);
    }

    getSpecialOffers(limit: number | null = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/special-offers.json?limit=3
         *
         * where:
         * - limit = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/special-offers.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getSpecialOffers(limit);
    }

    getFeaturedProducts(categorySlug: string | null = null, limit: number | null = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/featured.json?category=screwdrivers&limit=3
         *
         * where:
         * - category = categorySlug
         * - limit    = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (category) {
        //     params.category = category;
        // }
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/featured.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getFeatured(categorySlug, limit);
    }

    getLatestProducts(categorySlug: string | null = null, limit: number | null = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/latest.json?category=screwdrivers&limit=3
         *
         * where:
         * - category = categorySlug
         * - limit    = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (category) {
        //     params.category = category;
        // }
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //

        // This is for demonstration purposes only. Remove it and use the code above.
        return getLatestProducts(categorySlug, limit);
    }

    getRelatedProducts(product: Partial<Product>): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/related.json?for=water-tap
         *
         * where:
         * - for = product.slug
         */
        // const params: {[param: string]: string} = {
        //     for: product.slug,
        // };
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/related.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getRelatedProducts(product);
    }
    getSuggestions(query: string, limit: number, categorySlug: string | null = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/search/suggestions.json?query=screwdriver&limit=5&category=power-tools
         *
         * where:
         * - query = query
         * - limit = limit
         * - category = categorySlug
         */
        // const params: {[param: string]: string} = {query, limit: limit.toString()};
        //
        // if (categorySlug) {
        //     params.category = categorySlug;
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/search/suggestions.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getSuggestions(query, limit, categorySlug);
    }
    getItemSuggestions(query: string): Observable<Item[]> {

        return this.http.get<Item[]>(this.server + 'items/getItemSuggestions/' + query, { headers: this.headers });
    }
    getRelatedItems(item: Partial<Item>): Observable<Item[]> {

        return this.http.get<Item[]>(this.server + 'items/getRelatedItems/' + item.ItemID, { headers: this.headers });

    }
    getLatestItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.server + 'items/getLatestItems', { headers: this.headers });
    }
    geRecomendedItems(page: number): Observable<Item[]> {

        return this.http.get<Item[]>(this.server + `items/getallrecomended/${page}`, { headers: this.headers });
    }
    getallwhytoChooseecommerce(type:string): Observable<any[]> {

        return this.http.get<any[]>(this.server + "customerservice/getwhyToChoose/"+type, { headers: this.headers });
    }
    getallwhytoChooseecommercedetails(id:number): Observable<any> {

        return this.http.get<any>(this.server + "customerservice/whytochoosedetails/"+id, { headers: this.headers });
    }
    getMiddleImages(): Observable<string[]> {

        return this.http.get<string[]>(this.server + `middleimages/imagesnameecommerce`, { headers: this.headers });
    }
    getallCampaigns(): Observable<Campaign[]> {
        
        return this.http.get<Campaign[]>(this.server + `Campaigns/getallCampaignsecommerce`);
    }
    geSellingfastitems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.server + `items/getallsellingfastitemsecommerce`, { headers: this.headers });
    }
    getItem(ItemID: String): Observable<Item> {

        return this.http.get<Item>(this.server + `items/getitembyID/${ItemID}`, { headers: this.headers });
    }

}
