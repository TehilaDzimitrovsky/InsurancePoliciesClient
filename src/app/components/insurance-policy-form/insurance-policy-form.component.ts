import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsurancePoliciesService } from '../../services/insurance-policies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InsurancePolicies } from '../../models/User.model';

@Component({
  selector: 'app-insurance-policy-form',
  templateUrl: './insurance-policy-form.component.html',
  styleUrl: './insurance-policy-form.component.scss'
})
export class InsurancePolicyFormComponent {
  policyForm!: FormGroup;
  value!: Date;
  load = false;
  userId : number | undefined;
  policy!: InsurancePolicies;
  constructor(private insurancePoliciesService: InsurancePoliciesService, private router: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    let policyId;
    this.activatedRoute.queryParams.subscribe(params => {
      policyId = params['id'];
      //if there is no Id - so it means that it is a new policy(need the userId for the FK relationship)
      if (!policyId) {
        this.userId = params['userId'];
        this.buildForm(this.policy);
        this.load = true;
      }
    });
    if (policyId != undefined) {
      let policyFromSubject = this.insurancePoliciesService.getPolicy();
      //try to get the policy from subject
      if (policyFromSubject) {
        this.policy = policyFromSubject;
        this.userId = this.policy.userId;
        this.buildForm(this.policy);
        this.load = true;
      }
      else {
        //the component was not loaded by navigating from the policies list
        const policyIdToUse = policyId ? policyId : 0;
        await this.insurancePoliciesService.getPolicyById(policyIdToUse).subscribe(res => {
          this.policy = res;
          this.userId = this.policy.userId;
          this.buildForm(this.policy);
          this.load = true;
        });
      }
    }

  }

  buildForm(policy: InsurancePolicies) {
    this.policyForm = this.fb.group({
      id: [policy ? policy.id : 0],
      policyNumber: [policy ? policy.policyNumber : '', Validators.required],
      insuranceAmount: [policy ? policy.insuranceAmount : undefined, [Validators.required]],
      startDate: [policy ? new Date(policy.startDate) : null, [Validators.required]],
      endDate: [policy ? new Date(policy.endDate) : null, [Validators.required]],
      userId: [this.userId]
    });
  }


  onSubmit(): void {
    var serverModel: InsurancePolicies = {
      id: this.policy?.id ? this.policy.id : 0,
      policyNumber: this.policyForm.controls['policyNumber'].value,
      insuranceAmount: this.policyForm.controls['insuranceAmount'].value,
      startDate: this.policyForm.controls['startDate'].value.toISOString().slice(0, 19),
      endDate: this.policyForm.controls['endDate'].value.toISOString().slice(0, 19),
      userId: this.policy?.userId ? this.userId: 0,
    }
    if (this.policyForm.controls['id'].value == 0) {
      this.insurancePoliciesService.addInsurancePolicy(serverModel).subscribe((res: InsurancePolicies) => {
        this.goBack();
      }, ((error: any) => {
        console.log("error");
      }));
    }
    else {
      this.insurancePoliciesService.updateInsurancePolicy(serverModel).subscribe((res: InsurancePolicies) => {
        this.goBack();
      }, ((error: any) => {
        console.log("error");
      }));;
    }
  }

  clearForm(): void {
    this.policyForm.reset();
  }

  goBack() {
    this.router.navigate(["user-details"], { queryParams: { id: this.userId } });
  }
}
