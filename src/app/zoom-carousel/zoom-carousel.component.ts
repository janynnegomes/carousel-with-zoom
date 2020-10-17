import { Component, Input, VERSION } from "@angular/core";

@Component({
  selector: "zoom-carousel",
  templateUrl: "./zoom-carousel.component.html",
  styleUrls: ["./zoom-carousel.component.css"]
})
export class ZoomCarouselComponent {
  @Input()
  title: string = "Carousel";

  images = [
    "https://th.bing.com/th/id/OIP.e1M032X8au1tt1MTf-M4-wHaE8?pid=Api&rs=1",
    "http://placeimg.com/640/480/tech",
    "http://placeimg.com/640/480/tech",
    "http://placeimg.com/640/480/tech"
  ];
}
