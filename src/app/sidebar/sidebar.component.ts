import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormbuilderService } from '../shared/formbuilder.service';


declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    role: string[];
    collapse?: string;
    children?: ChildrenItems[];
    
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
    TreeCategoryID?: number;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard',
        role: [],
    },{
        path: '/usermanager',
        title: 'User Manager',
        type: 'sub',
        icontype: 'person',
        role: [],
        collapse: 'usermanager',
        children: [
            {path: 'appusers',title: 'Users', ab:'U'},
            {path: 'role',title: 'Roles', ab:'R'},
            {path: 'formroles',title: 'Forms', ab:'F'},
        ]
    },{
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        role: [],
        collapse: 'pages',
        children: [
            {path: 'pricing', title: 'Pricing', ab:'P'},
            {path: 'timeline', title: 'Timeline Page', ab:'TP'},
            {path: 'login', title: 'Login Page', ab:'LP'},
            {path: 'register', title: 'Register Page', ab:'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab:'LSP'},
            {path: 'user', title: 'User Page', ab:'UP'}
        ]
    },
    
    ,{
        path: '/hierarchy-management',
        title: 'Management',
        type: 'sub',
        icontype: 'account_tree',
        role: [],
        collapse: 'hierarchy-management',
        children: [
            {path: 'HierarchyManagement', title: 'hierarchy management', ab:'HM', TreeCategoryID : 1},
            {path: 'GeographyManagement', title: 'geography management', ab:'GM' , TreeCategoryID : 2},
            {path: 'LevelManagement', title: 'level management', ab:'LM' , TreeCategoryID : 3}
        ]
    },


    // {
    //     path: '/hierarchy-management',
    //     title: 'hierarchy management',
    //     type: 'link',
    //     icontype: 'account_tree',
    //     role: [],
    //     TreeCategoryID : 1

    // }, 

    // {
    //     path: '/hierarchy-management',
    //     title: 'geography management',
    //     type: 'link',
    //     icontype: 'account_tree',
    //     role: [],
    //     TreeCategoryID : 2

    // }, 

    // {
    //     path: '/hierarchy-management',
    //     title: 'level management',
    //     type: 'link',
    //     icontype: 'account_tree',
    //     role: [],
    //     TreeCategoryID : 3

    // }, 

    {
        path: '/weather',
        title: 'Weather',
        type: 'link',
        icontype: 'cloud',
        role: [],
    },
    {
        path: '/process',
        title: 'process',
        type: 'link',
        icontype: 'image',
        role: [],
    },
    {
        path: '',
        title: 'Form',
        type: 'sub',
        icontype: 'feed',
        role: [],
        collapse: 'formList',
        children: [
            {path: 'formCategory',title: 'Form Category',ab: 'FC'},
            {path: 'formList',title: 'Form Design',ab: 'FD'},   
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
    userDetail: any;
    menus: any[];
    
    public showMenu: boolean = true;

    constructor(private service: UserService, private router: Router,private formService:FormbuilderService) {
        this.service.sm.subscribe(show => this.showMenu = show);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
   
    ngOnInit() {

        this.service.sm.subscribe(show => this.showMenu = show);
       
        this.service.getUserProfile().subscribe(
            res => {
              this.userDetail = res['formData'];
            },
            err => {
              console.log(err);
            },
          );
        
        let userRole= this.service.getRole();

    
        this.menus = [];
        this.service.getRoleMenus(userRole).subscribe(
            res => {
              
            ROUTES.forEach(
                (el) => {
                    let a = res.find(menu => (menu.name).toLowerCase() === el.title.toLowerCase());
                    if (typeof a !== 'undefined') {
                        el.role=[userRole];
                    }
                }
            );

            this.menuItems = ROUTES.filter(menuItem => menuItem.role.indexOf(userRole) > -1 );

            },
            err => {
                console.log(err);
            },
        );

          
        
        //this.menuItems = ROUTES.filter(menuItem => menuItem.role.length ==0 ); //|| menuItem.role.indexOf(userRole) > -1);
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
        this.router.navigate(['/home']);
        let formData= JSON.parse(localStorage.getItem('formDesignInfo') || '{}');
        this.formService.unlockForm(formData.formID,formData);
    }
}