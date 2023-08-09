import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormbuilderService } from '../shared/formbuilder.service';
import { CommandColumnComponent } from '@progress/kendo-angular-grid';


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
        title: 'User Management',
        type: 'sub',
        icontype: 'person',
        role: [],
        collapse: 'usermanager',
        children: [
            {path: 'appusers',title: 'Users', ab:'U'},
            {path: 'role',title: 'Roles', ab:'R'},
            {path: 'location', title: 'location management', ab:'LM' , TreeCategoryID : 2},
            {path: 'indicatorrole',title: 'Indicator Role Management', ab:'F'},
            {path: 'facilitymanager',title: 'Facility Types', ab:'FT'}
            //{path: 'level', title: 'level management', ab:'LM' , TreeCategoryID : 3},
            //{path: 'formroles',title: 'Forms', ab:'F'},
        ]
    }
    ,{
        path: '/administration',
        title: 'Administration',
        type: 'sub',
        icontype: 'manage_accounts',
        role: [],
        collapse: 'administration',
        children: [
            {path: 'holiday',title: 'Holidays', ab:'U'},
            {path: 'scheduler',title: 'Scheduler', ab:'R'},
            {path: 'reassign-user-taskAd',title: 'Re-Assign User Task', ab:'RT'},
            {path: 'reassign-task',title: 'Re-Assign Task', ab:'T'}    
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
        title: 'hierarchy management',
        type: 'sub',
        icontype: 'account_tree',
        role: [],
        collapse: 'hierarchy-management',
        children: [
            {path: 'HierarchyManagement', title: 'hierarchy management', ab:'HM', TreeCategoryID : 1},
            {path: 'indicator-management', title: 'indicator management', ab:'IM' }
        ]
    },
    // ,{
    //     path: '/indicator-management',
    //     title: 'indicator management',
    //     type: 'sub',
    //     icontype: 'account_tree',
    //     role: [],
    //     collapse: 'indicator-management',
    //     children: [
    //         {path: 'IndicatorManagement', title: 'indicator management', ab:'IM'}
    //     ]
    // },
    // {
    //     path: '/weather',
    //     title: 'Weather',
    //     type: 'link',
    //     icontype: 'cloud',
    //     role: []
    // },
    {
        path: '/process',
        title: 'Workflow',
        type: 'link',
        icontype: 'schema',
        role: []
    },{
        //path: '/indicator-report',
        path: '/indicatorapproval',
        title: 'Indicator Approval-hide',
        type: 'link',
        icontype: 'fact_check',
        role: []
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
            { path: 'formInbox', title: 'Form Inbox', ab: 'FI' },
            { path: 'formExport', title: 'Form Templates', ab: 'FT' },
        ]
    },
    {
        path: '',
        title: 'Data Management',
        type: 'sub',
        icontype: 'dns',
        role: [],
        collapse: 'DataMangementList',
        children: [

            {path: 'externalDI',title: 'External Data Import',ab: 'EDI'},
            {path: 'internalDI',title: 'Internal Data Import',ab: 'IDI'}

        ]
    },{
        path: '/reports',
        title: 'Reports',
        type: 'sub',
        icontype: 'query_stats',
        role: [],
        collapse: 'reports',
        children: [
            {path: 'sqlreports',title: 'SQL Reports', ab:'S'},
            {path: 'powerBireports',title: 'PowerBi Reports', ab:'P'}
        ]
    },
    ,{
        path: '/usermanager',
        title: 'help',
        type: 'sub',
        icontype: 'help',
        role: [],
        collapse: 'help',
        children: [
            {path: 'help',title: 'help', ab:'H'}
               
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
    public userDetail: any;
    menus: any[];
    location: any;

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
        let userRole= this.service.getRole();
        this.service.getUserProfile().subscribe(
            res => {
              this.userDetail = res['formData'];
              this.location = this.userDetail.location;
              console.log(this.userDetail);

              //sessionStorage.setItem("wfUser",this.userDetail.userID);
            // },
            // err => {
            //   console.log(err);
            // }, 
            
            // );       

                
                let locType = this.userDetail['locationType'];
                let uRole = this.userDetail['role'];
                console.log(locType);
                console.log(uRole);
                
                this.menus = [];
                this.service.getRoleMenus(userRole).subscribe(
                    res => {
                    
                    ROUTES.forEach(
                        (el) => {
                            let a = res.find(menu => (menu.name).toLowerCase() === el.title.toLowerCase());
                            if (typeof a !== 'undefined') {
                                el.role=[userRole];
                                let cs = el.children;
                                console.log(el.children);
                                if (typeof cs !== 'undefined') {
                                    // let c = cs.find(menu => (menu.title).toLowerCase() === 'form category');
                                    // const index = cs.indexOf(c, 0);
                                    // if (index > -1) {
                                    //     //el.children.splice(index, 1);
                                    //     el.children.push(c);
                                    // }
                                    let subMenus = [];
                                    cs.forEach((subMenu)=>{
                                        let sub = res.find(menu => (menu.name).toLowerCase() === subMenu.title.toLowerCase());
                                        if (typeof sub !== 'undefined') {
                                            if(el.title == 'Administration')
                                            {
                                                if(locType != 4260 && uRole == '3'){
                                                    if(subMenu.title.toLowerCase() == 're-assign task'){
                                                        subMenus.push(subMenu);
                                                    }
                                                    // else
                                                    // {
                                                    //     subMenus.push(subMenu);
                                                    // }
                                                }
                                                else
                                                {
                                                    subMenus.push(subMenu);
                                                }
                                            }
                                            else{
                                            subMenus.push(subMenu); 
                                            }
                                        }
                                    }
                                    )
                                    console.log(el.title);
                                    console.log(subMenus);
                                    if(subMenus.length>0){
                                        el.children = subMenus;
                                    }
                                }
                            }
                        }
                    );

                    if(uRole == '3' && locType != 4260){
                        this.menuItems = ROUTES.filter(menuItem => menuItem.title == 'Dashboard' || menuItem.title == 'Administration' );
                    }
                    else
                        this.menuItems = ROUTES.filter(menuItem => menuItem.role.indexOf(userRole) > -1 );
                    console.log(this.menuItems);
                    },
                    err => {
                        console.log(err); 
                    },
                );

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

          const active_color = 'green';

          if ($sidebar.length !== 0) {
              $sidebar.attr('data-color', active_color);
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