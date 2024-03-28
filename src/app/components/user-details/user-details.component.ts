import { Component, Injectable, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InsurancePolicies, User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { InsurancePoliciesService } from '../../services/insurance-policies.service';
import { Table } from 'primeng/table';
import { AppModule } from '../../app.module';

@Injectable({ providedIn: AppModule })

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  @ViewChild('dt1') table: Table | undefined;
  userDetails: User | undefined;
  userPolicies: InsurancePolicies[] = [];
  load =false;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private insurancePoliciesService: InsurancePoliciesService) {
  }

  columns = [
    { field: 'policyNumber', header: 'Policy Number' },
    { field: 'insuranceAmount', header: 'Insurance Amount' },
    { field: 'startDate', header: 'Start Date' },
    { field: 'endDate', header: 'End Date' }
  ];

  async ngOnInit(): Promise<void> {
    let userId;
    this.activatedRoute.queryParams.subscribe(params => {
      userId = params['id'];
    });
    let user = this.userService.getUser();
    //if i was coming from user list
    if (user) {
      this.userDetails = user;
      if (this.userDetails)
      this.getUserPolicies();
      this.load = true;
    } else {
      //go and get user by user id from url
      const userIdToUse = userId ? userId : 0;
      await this.userService.getUserById(userIdToUse).subscribe(res=>{
        user = res;
        if (user) {
          this.userDetails = user;
        } else {
          console.log("User not found for both getUser and getUserById methods.");
          this.userDetails = undefined;
        }
        if (this.userDetails)
        this.getUserPolicies();
        this.load = true;
      });
    }
  }

  getUserPolicies()
  {
    this.insurancePoliciesService.getUserPolicies(this.userDetails?.id).subscribe(res => {
      this.userPolicies = [...res];
    })
  }

  updatePolicy(policy: InsurancePolicies) {
    this.insurancePoliciesService.setPolicy(policy);
    this.router.navigate(['/insurance-policies'], { queryParams: { id: policy.id } });
  }

  addPolicy() {
    this.router.navigate(['/insurance-policies'], { queryParams: { userId: this.userDetails?.id} });
  }

  deletePolicy(i: number) {
    let policy = this.userPolicies[i].id? this.userPolicies[i].id : null;
    if(policy)
    {
        this.insurancePoliciesService.deleteInsurancePolicy(policy).subscribe((res: any) => {
      this.getUserPolicies();
    });
    }
  
  }

  goBack() {
    this.router.navigate([""]);
  }
}
