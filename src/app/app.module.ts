import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { ZoomCarouselComponent } from "./zoom-carousel/zoom-carousel.component";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent, ZoomCarouselComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
