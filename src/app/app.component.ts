import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  images = [
    "https://http2.mlstatic.com/D_NQ_NP_2X_612946-MLA43654089811_102020-F.webp",
    "https://http2.mlstatic.com/D_NQ_NP_2X_724968-MLA43654253363_102020-F.webp",
    "https://http2.mlstatic.com/D_NQ_NP_2X_693004-MLA43654089813_102020-F.webp",
    "https://http2.mlstatic.com/D_NQ_NP_2X_983687-MLA43654089814_102020-F.webp",
    "https://http2.mlstatic.com/D_NQ_NP_2X_883221-MLA43654253371_102020-F.webp"
  ];
}
