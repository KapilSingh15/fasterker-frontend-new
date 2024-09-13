import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Router } from "@angular/router";



@Component({
  selector: 'search-component',
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SearchComponentComponent),
    },
  ],
})
export class SearchComponentComponent implements OnInit {
  @ViewChild("searchBoxInput") searchBoxInput!: ElementRef<any>;
  @Input("disabled") disabled: boolean = false;
  @Input("placeholder") placeholder: string = "";
  @Input("value") value: string = "";
  @Input("isGlobalSearchEnabled") isGlobalSearchEnabled: Boolean = true;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  @Output() input: EventEmitter<string> = new EventEmitter<string>();
  @Output() blur: EventEmitter<string> = new EventEmitter<string>();
  @Output() keypress: EventEmitter<string> = new EventEmitter<string>();
  @Output() keydown: EventEmitter<string> = new EventEmitter<string>();
  @Output() keyup: EventEmitter<string> = new EventEmitter<string>();
  @Output() sendValue: EventEmitter<string> = new EventEmitter<string>();
  @Input() searchByIcon = false;
  searchDefaultValue: string = "";
  searchCurrentPage = 0;
  searchResultFields = "FULL";
  searchResultsPageSize = 20;
  suggestionsFields = "DEFAULT";
  suggestionMaxSize = 10;
  filteredProducts: any = [];
  @Input() searchKey: string = "";
  constructor(
    // private skySearchControlService: skySearchControlService,
    private router: Router
    
  ) {}

  onChange = (_: any) => {};
  onTouch = (_: any) => {};

  writeValue(value: string): void {
    this.searchDefaultValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit(): void {
    let _this = this;
    if (this.value) this.searchDefaultValue = this.value;
  }

  onClearInput() {
    this.searchKey = "";
    this.input.emit(this.searchDefaultValue);
    this.searchDefaultValue = "";
    this.searchBoxInput.nativeElement.value = "";
    this.input.emit(this.searchDefaultValue);
    this.sendValue.emit("");
    this.filteredProducts = [];
  }
  
  onchange(event: any){
    this.searchDefaultValue = event.target.value
    this.sendValue.emit(this.searchDefaultValue);
   
  }

  // onInputEvent(event: Event) {
  //   // console.log('Input===');
  //   if (this.isGlobalSearchEnabled) {
  //     if (!this.searchByIcon) {
  //       this.searchDefaultValue =
  //         (event.target as HTMLInputElement).value || "";
  //       this.onChange(this.searchBoxInput);
  //       this.input.emit(this.searchDefaultValue);
  //       this.filteredProducts = [];
  //       if (this.searchDefaultValue.length >= 3) {
  //         if (this.isGlobalSearchEnabled) {
  //           this.skySearchControlService
  //             .searchResults(
  //               this.searchCurrentPage,
  //               this.searchResultFields,
  //               this.searchResultsPageSize,
  //               this.searchKey
  //             )
  //             .subscribe((res: any) => {
  //               // console.log(res);
  //               this.filteredProducts = res.products;
  //             });
  //         }
  //       }
  //     }
  //   }
  // }
  onSuggestionClick(productId: any) {
    let navigateUrl = "";
    if (productId.substring(0, 1) === "R") {
      navigateUrl = "/admin/admin-home/admin-dashboard/products/details/" + productId;
    }
    if (productId.substring(0, 1) === "C") {
      navigateUrl = "/commercial/products/details/" + productId;
    }
    let compInstance = document.getElementsByTagName("app-pdp");

    this.router.navigateByUrl(navigateUrl);
    this.filteredProducts = [];
  }

  onBlurEvent(event: Event) {
    // console.log('Blur===');
    if (!this.searchByIcon) {
      this.searchDefaultValue = (event.target as HTMLInputElement).value || "";
      this.blur.emit(this.searchDefaultValue);
    }
  }

  onKeypress(event: Event) {
    // console.log('onKeypress===');
    if (!this.searchByIcon) {
      this.searchDefaultValue = (event.target as HTMLInputElement).value || "";
      this.keypress.emit(this.searchDefaultValue);
    }
  }

  onKeydown(event: Event) {
    // console.log('onKeydown===');
    if (this.isGlobalSearchEnabled) {
      this.searchDefaultValue = (event.target as HTMLInputElement).value || "";
      if (!this.searchByIcon) {
        this.keypress.emit(this.searchDefaultValue);
      }
    }
  }

  onKeyup(event: any) {    
    if (this.isGlobalSearchEnabled) {
      this.keyup.emit(event.target.value);

      if (!this.searchByIcon) {
        this.searchDefaultValue =
          (event.target as HTMLInputElement).value || "";
      }
    }

  }
  onEnter() {
    // if (this.filteredProducts.length > 0) {
    //   let urlSegments = this.filteredProducts
    //     .find((product: any) => !!product.categoryName)
    //     .categoryName?.substring(
    //       1,
    //       this.filteredProducts.find((product: any) => !!product.categoryName)
    //         .categoryName.length - 1
    //     );
    //   let arr: Array<string> = urlSegments.split(',');
    //   let navigatePLPUrl = '';
    //   if (arr[2].toLowerCase().indexOf('wood') != -1) {
    //     navigatePLPUrl = '/products?name=Wood&page=View%20All%20Wood&type=wood';
    //   }
    //   if (arr[2].toLowerCase().indexOf('cushion') != -1) {
    //     navigatePLPUrl =
    //       '/products?name=Cushion&page=View%20All%20Cushion&type=cushionproduct';
    //   }
    //   if (arr[2].toLowerCase().indexOf('carpet') != -1) {
    //     navigatePLPUrl =
    //       '/products?name=Carpet&page=View%20All%20Carpet&type=carpetproduct';
    //   }
    //   if (arr[2].toLowerCase().indexOf('tile') != -1) {
    //     navigatePLPUrl = '/products?name=Tile&page=View%20All%20Tile&type=tile';
    //   }
    //   if (
    //     arr[2].toLowerCase().indexOf('resilient') != -1 ||
    //     arr[2].toLowerCase().indexOf('vinyl') != -1
    //   ) {
    //     navigatePLPUrl =
    //       '/products?name=Resilient%2FVinyl&page=View%20All%20Resilient%2FVinyl&type=resilient_vinyl';
    //   }
    //   if (arr[2].toLowerCase().indexOf('merchandising') != -1) {
    //     navigatePLPUrl =
    //       '/products?name=Merchandising&page=View%20All%20Merchandising&type=merchandising';
    //   }
    //   if (
    //     arr[2].toLowerCase().indexOf('accessories') != -1 ||
    //     arr[2].toLowerCase().indexOf('installation') != -1
    //   ) {
    //     navigatePLPUrl =
    //       '/products?name=Installation%20Accessoires&page=View%20All%20Installation%20Accessoires&type=accessories';
    //   }
    //   if (urlSegments.toLowerCase().indexOf('residential') != -1) {
    //     navigatePLPUrl = '/admin/admin-home/admin-dashboard' + navigatePLPUrl;
    //   }
    //   if (urlSegments.toLowerCase().indexOf('commercial') != -1) {
    //     navigatePLPUrl = '/commercial' + navigatePLPUrl;
    //   }
    //   // console.log(navigatePLPUrl);
    //   this.router.navigateByUrl(navigatePLPUrl);
    //   this.filteredProducts = [];
    // }
    if (this.isGlobalSearchEnabled) {
      this.navigateToPlp();
    }
  }
  onSearch() {
    // if (this.isGlobalSearchEnabled) {
    //   this.skySearchControlService
    //     .searchResults(
    //       this.searchCurrentPage,
    //       this.searchResultFields,
    //       this.searchResultsPageSize,
    //       this.searchKey
    //     )
    //     .subscribe((res: any) => {
    //       // console.log(res);
    //     });
    // }
    this.sendValue.emit(this.searchKey);
    if (this.isGlobalSearchEnabled) {
      this.navigateToPlp();
    }
  }
  navigateToPlp() {
    let navigatePLPUrl = `/products?search=${this.searchKey}`;
    if (this.router.url?.split("?")[0].includes("residential")) {
      navigatePLPUrl = "/admin/admin-home/admin-dashboard" + navigatePLPUrl;
    } else if (this.router.url?.split("?")[0].includes("commercial")) {
      navigatePLPUrl = "/commercial" + navigatePLPUrl;
    }
    // const navigatePLPUrl = `/products?search=${this.searchKey}`;
    this.filteredProducts = [];
    this.searchKey = "";
    this.router.navigateByUrl(navigatePLPUrl);
  }
}
