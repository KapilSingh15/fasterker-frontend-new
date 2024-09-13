import { ChangeDetectorRef, Component, HostListener, Inject } from '@angular/core';
import { menu } from '../../constant/menu/menu';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  isSideBarOpen: boolean = false;
  sidenav: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cdr : ChangeDetectorRef

  ) {}

  ngOnInit() {

  }

  onChildListData(event:any) {
    this.sidenav = event?.sidebar?.subNav
    this.isSideBarOpen = event?.isSideBarOpen;
    if(!this.isSideBarOpen) {
      this.document.body.classList.remove('hideSidebar');
      this.document.body.classList.remove('showSidebar');
    }
  }

  sabNavData(event:any) {
    this.sidenav = event?.data;
    this.isSideBarOpen = event?.isSideBarOpen;
    if(!this.isSideBarOpen) {
      this.document.body.classList.remove('hideSidebar');
      this.document.body.classList.remove('showSidebar');
    }
    this.cdr.detectChanges();


  }

}
