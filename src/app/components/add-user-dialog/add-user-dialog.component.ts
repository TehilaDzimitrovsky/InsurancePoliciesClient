import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent {
  userForm!: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private config: DynamicDialogConfig, private dialogRef: DynamicDialogRef) {
  }

  ngOnInit(): void {
    if(this.config.data != null)
    {
      let userModel = this.config.data;
      this.userForm = this.fb.group({
      id: [userModel.id],
      name: [userModel.name, [Validators.required]],
      email: [userModel.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      }); 
    }
  }


  onSubmit(): void {
    var serverModel: User = {
      id: this.userForm.controls['id'].value,
      name: this.userForm.controls['name'].value,
      email: this.userForm.controls['email'].value,
    }
    if (this.userForm.controls['id'].value == 0) {
      this.userService.addUser(serverModel).subscribe((res: any) => {
        this.dialogRef.close();
      }, ((error: any) => {
        console.log(error);
      }));
    }
    else {
      this.userService.updateUser(serverModel).subscribe((res: User) => {
        this.dialogRef.close();
      }, ((error: any) => {
        console.log(error);
      }));;
    }
  }

  clearForm(): void {
    this.userForm.reset();
  }

  goBack() {
    this.router.navigate([""]);
  }
}
