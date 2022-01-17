import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/shared/user.service';

export interface Role {
  id: number;
  name: string;
}


@Component({
  selector: 'app-addformroles',
  templateUrl: './addformroles.component.html',
  styleUrls: []
})
export class AddformrolesComponent implements OnInit {

  constructor( private service: UserService) { }

  public displayedColumns = ['role', 'select'];
  public roleList = new MatTableDataSource<any>();
  selection = new SelectionModel<Role>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.roleList.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getRoles();    
  }

  
  getRoles() {    
    this.service.getRoles().subscribe(data => {
      this.roleList.data = data;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.roleList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.roleList.data.forEach(row => this.selection.select(row));
  }

}
