import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from "@abacritt/angularx-social-login";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { BsModalService } from "ngx-bootstrap/modal";
import { CarouselModule } from "ngx-owl-carousel-o";
import { ToastrModule } from "ngx-toastr";
import { routes } from "./app-routes";

export const appConfig: ApplicationConfig =  {
    providers: [
        importProvidersFrom(
        // modules (angular)
        BrowserModule.withServerTransition({ appId: 'serverApp' }), ReactiveFormsModule, FormsModule, 
        // modules (third-party)
        CarouselModule, ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true
        })),
        provideHttpClient(withFetch()),
        BsModalService, // ✅ Provide BsModalService explicitly
        // modules
        { provide: LOCALE_ID, useValue: 'it' },
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider('166133418738517')
                    },
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('751769800156-f6cdh1rekb54j4ipakdngjr06sg7q2lt.apps.googleusercontent.com')
                    }
                ]
            } as SocialAuthServiceConfig,
        },
        provideAnimations(),
        provideRouter(routes)
    ]
};