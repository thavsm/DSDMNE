import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },{
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        collapse: 'pages',
        children: [
            {path: 'pricing', title: 'Pricing', ab:'P'},
            {path: 'timeline', title: 'Timeline Page', ab:'TP'},
            {path: 'login', title: 'Login Page', ab:'LP'},
            {path: 'register', title: 'Register Page', ab:'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab:'LSP'},
            {path: 'user', title: 'User Page', ab:'UP'}
        ]
    },{

        path: '/hierarchy-management',
        title: 'hierarchy management',
        type: 'link',
        icontype: 'account_tree'

    }, 
    {
        path: '/appusers',
        title: 'Users',
        type: 'link',
        icontype: 'person'
    },{
        path: '/weather',
        title: 'Weather',
        type: 'link',
        icontype: 'cloud'
    },
    {
        path: '/process',
        title: 'process',
        type: 'link',
        icontype: 'cloud'
    },
    {
        path: '',
        title: 'Form',
        type: 'sub',
        icontype: 'feed',
        collapse: 'formList',
        children: [
            {path: 'formCategory',title: 'Form Category',ab: 'FC'},
            {path: 'formList',title: 'Form Template',ab: 'FD'},   
            { path: 'formCapture', title: 'Form Capture', ab: 'FC' },
            { path: 'formInbox', title: 'Form Inbox', ab: 'FI' }
        ]
    }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ps: any;
    public userProfile = "/userprofile";
    userDetail: any;
    
    
    constructor(private service: UserService, private router: Router) {
      
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
       
        this.service.getUserProfile().subscribe(
            res => {
              this.userDetail = res;
            },
            err => {
              console.log(err);
            },
          );

        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }

        
      const $sidebar = $('.sidebar');
      

      const new_color = 'black';

          if ($sidebar.length !== 0) {
              $sidebar.attr('data-background-color', new_color);
          }

         
        }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}