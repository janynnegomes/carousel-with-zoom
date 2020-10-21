import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  VERSION,
  ViewChild
} from "@angular/core";

@Component({
  selector: "zoom-carousel",
  templateUrl: "./zoom-carousel.component.html",
  styleUrls: ["./zoom-carousel.component.css"]
})
export class ZoomCarouselComponent
  implements OnInit, AfterViewInit, AfterContentInit {
  @Input()
  title: string = "Carousel";

  activeThumbnail: string = "";

  @ViewChild("imageViewer") imageViewer: ElementRef;
  imgViewerWidth: number = 0;
  imgViewerHeight: number = 0;

  @ViewChild("imageViewerContainer") imageViewerContainer: ElementRef;
  imgViewerContainerWidth: number = 0;
  imgViewerContainerHeight: number = 0;

  @ViewChild("zoom") zoom: ElementRef;

  @ViewChild("carousel") carousel: ElementRef;

  @ViewChild("magnifier") magnifier: ElementRef;
  magnifierWidth: number = 0;
  magnifierHeight: number = 0;

  cursorX = 0;
  cursorY = 0;

  @Input()
  images = [];

  @Input()
  zoomLevel = 2;

  viewImage(imageSrc) {
    if (this.imageViewerContainer && this.zoom) {
      // update image src
      this.imageViewerContainer.nativeElement.style.backgroundImage =
        "url(" + imageSrc + ")";
      this.activeThumbnail = imageSrc;
      this.zoom.nativeElement.style.background = "url(" + imageSrc + ")";
    }
  }

  magnifierMove(event) {
    if (this.isMobile) {
      return;
    }
    this.showZoom();
    this.showMagnifier();
    //get mouse cursor coordinator
    this.cursorX = event.offsetX;
    this.cursorY = event.offsetY;

    const zoomX = this.cursorX * this.zoomLevel;
    const zoomY = this.cursorY * this.zoomLevel;

    if (this.magnifier && this.imageViewerContainer) {
      // get magnifier dimensions
      this.magnifierWidth = this.magnifier.nativeElement.offsetWidth;
      this.magnifierHeight = this.magnifier.nativeElement.offsetHeight;

      // get image viewer container dimensions
      this.imgViewerContainerHeight = this.imageViewerContainer.nativeElement.offsetHeight;
      this.imgViewerContainerWidth = this.imageViewerContainer.nativeElement.offsetWidth;

      // define size of zoom image element content
      this.zoom.nativeElement.style.backgroundSize =
        this.magnifierWidth * this.zoomLevel + "px ";

      //define
      this.zoom.nativeElement.style.width =
        this.magnifierWidth * this.zoomLevel + "px";
      this.zoom.nativeElement.style.height =
        this.magnifierHeight * this.zoomLevel + "px";

      let wM = this.magnifierWidth / 2;
      let hM = this.magnifierHeight / 2;

      // avoid magnifier out of left from image viewer container
      if (this.cursorX < wM) {
        this.cursorX = wM;
      }

      // avoid magnifier out of right from image viewer container
      if (this.cursorX > this.imgViewerContainerWidth - wM) {
        this.cursorX = this.imgViewerContainerWidth - wM;
      }

      // avoid magnifier out of top
      if (this.cursorY < hM) {
        this.cursorY = hM;
      }

      // avoid magnifier out of bottom
      if (this.cursorY > this.imgViewerContainerHeight - hM) {
        this.cursorY = this.imgViewerContainerHeight - hM;
      }

      // apply mouse cursor coordinates to magnifier position
      this.magnifier.nativeElement.style.left = this.cursorX + "px";
      this.magnifier.nativeElement.style.top = this.cursorY + "px";

      // change image zoom position
      this.zoom.nativeElement.style.backgroundPosition =
        zoomX + "px " + zoomY + "px";
      this.zoom.nativeElement.style.left =
        this.carousel.nativeElement.offsetWidth + 32 + "px";
    }
  }

  ngOnInit() {
    window.addEventListener("resize", () => {
      setTimeout(() => {
        console.log("mobile:", this.isMobile);
      }, 0);
    });
  }

  get isMobile() {
    const orientation = window.screen.orientation.type;
    let isMobile = false;
    if (
      orientation === "landscape-primary" ||
      orientation === "landscape-secondary"
    ) {
      isMobile = window.screen.height < 576;
    } else if (
      orientation === "portrait-primary" ||
      orientation === "portrait-secondary"
    ) {
      isMobile = window.screen.width < 576;
    }
    return isMobile;
  }

  ngAfterViewInit() {
    this.viewImage(this.images[0]);

    //save image viewer container dimensions
    this.imgViewerContainerHeight = this.imageViewerContainer.nativeElement.offsetHeight;
    this.imgViewerContainerWidth = this.imageViewerContainer.nativeElement.offsetWidth;

    console.log(this.imgViewerContainerWidth, this.imgViewerContainerHeight);
  }

  ngAfterContentInit() {}

  hideZoom() {
    this.zoom.nativeElement.style.display = "none";
  }

  hideMagnifier() {
    this.magnifier.nativeElement.style.display = "none";
  }

  showZoom() {
    this.zoom.nativeElement.style.display = "block";
  }

  showMagnifier() {
    this.magnifier.nativeElement.style.display = "block";
  }
}
