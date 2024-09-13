import { Component, EventEmitter, Inject, Output, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { menu } from '../../constant/menu/menu';
import { DOCUMENT } from '@angular/common';
import { smoothlyMenu } from '../../services/app.helpers';
import { filter, take } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { RefreshPageService } from '../../services/refresh-page.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { LoginServiceService } from '../../services/login-service.service';
import { TokenService } from '../../services/token.service';
import { MenuService } from '../../services/menu.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menu :any;
  selectedDropdownId: any;
  isDropdownOpen: boolean = false;
  isChildMenuOpen: boolean = false;
  expanded: boolean = false;
  isSideOpen: boolean = true;
  userDetails:any

  @Output() childNavList = new EventEmitter();
  @Output() onSidebarOpen = new EventEmitter();
  sidebarData: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private localStorageService: LocalStorageService,
    private eRef: ElementRef,
    private loginService: LoginServiceService,
    private storageService: StorageService
  ) {
 
  }

  ngOnInit() {
    this.storageService.getItem('menus').pipe(
      take(1)
    ).subscribe((res) => {
      this.menu = res; 
    });
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.localStorageService.setItem('currentUrl',(event.url));
    });
  }


  ngAfterViewInit() {   
    // this.checkCurrentUrl();
  }

  //**check url for open left side sidebar */
  checkCurrentUrl() {
    let path: any = this.localStorageService.getItem('currentUrl');
    if (path) {
      let newPath: any = path.split('/');
      if (newPath[2] === 'reports' || newPath[2] === 'manage') {
        this.sidebarData = this.menu.find((item:any) => item.name === 'Reports' || item.name === 'Manage')?.subNav;
        this.onSidebarOpen.emit({data: this.sidebarData, isSideBarOpen: true})  
      }
    }
  }

  //**toggle submenu method */
  ontoggleSubmenu(id: any) {    
    if (this.selectedDropdownId === id) {
      this.isDropdownOpen = !this.isDropdownOpen;
    } else {
      this.isDropdownOpen = true;
    }
    this.selectedDropdownId = id;

  }

  //**toggle child menu here */
  toggleChild() {
    this.isChildMenuOpen = !this.isChildMenuOpen;
  }

  /**if dropdown is open so when i click on other id  false here */
  onToggle(childsubNav?: any, path?: any) {
    this.isDropdownOpen = false;

  }

  
  expandSidebar() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.document.body.classList.remove('hideSidebar');
      this.document.body.classList.add('showSidebar');
    } else {
      this.document.body.classList.remove('showSidebar');
      this.document.body.classList.add('hideSidebar');
    }
    smoothlyMenu();
    this.childNavList.emit({ sidebar: null, isSideBarOpen: true });
  }

  //**outside click dropdown false */
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  //**logout method here */
  logout() {
    this.localStorageService.clear();
    this.storageService.clear();
    this.router.navigateByUrl('')
  }
}
