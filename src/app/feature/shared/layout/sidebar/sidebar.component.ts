import { animate, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component,  EventEmitter,  Inject, Input, Output } from '@angular/core';
import { smoothlyMenu } from '../../services/app.helpers';
import { menu } from '../../constant/menu/menu';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('slidein', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(250, style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate(250, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class SidebarComponent {
  expanded: boolean = false;
  menu = menu;
  @Output() isOpenedConfirm = new EventEmitter();
  @Input() sidenav:any;


  constructor(
    @Inject(DOCUMENT) private document: Document,

  ) {}

  ngOnInit() {    
    this.document.body.classList.add('hideSidebar');
  }


  expandSidebar() {
    this.expanded = !this.expanded 
    if(this.expanded)
    {
      this.document.body.classList.remove('hideSidebar');
      this.document.body.classList.add('showSidebar');
    }
    else 
    {
      this.document.body.classList.remove('showSidebar');
      this.document.body.classList.add('hideSidebar');
    }
    smoothlyMenu();
  }
}
