import { Component } from '@angular/core';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  public listForm: FormGroup;
  users: User[] = [];
  cols: any[] = [];

  columns = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
  ];

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private dialogService: DialogService) {
    this.listForm = fb.group({
      usersList: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: any[]) => {
      this.users = res;
    });
  }

  addNewUser() {
    var model: User = {
      id: 0,
      name: '',
      email: '',
    }
    this.openUserEditorDialog(model)
  }

  updateUser(user: User) {
    this.openUserEditorDialog(user);
  }

  deleteUser(i: number) {
    this.userService.DeleteUser(this.users[i].id).subscribe((res: any) => {
      this.getAllUsers();
    });
  }

  showPolicies(user: User) {
    this.userService.setUser(user);
    this.router.navigate(["user-details"], { queryParams: { id: user.id } });
  }

  openUserEditorDialog(model: User) {
    const dialogRef = this.dialogService.open(AddUserDialogComponent, {
      width: '35%',
      height: 'fit-content',
      rtl: true,
      contentStyle: { 'width': '100%' , 'padding': '0px 30px 0px 30px'},
      style: { 'display': 'flex', 'border-color': '#0b5a8c', 'focusOnShow': false },
      data: model
    });
    dialogRef.onClose.subscribe(() => {
      this.getAllUsers();
    })
  }

  goBack()
  {
    this.router.navigate([""]);
  }
}
