import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// Function to create the TranslateHttpLoader
export function createTranslateLoader(http: HttpClient) {
    // Create a new instance of TranslateHttpLoader and return it
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
