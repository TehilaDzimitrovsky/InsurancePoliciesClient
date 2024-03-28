import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InsurancePolicies } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancePoliciesService {

  serviceBase: string = "https://localhost:7229/InsurancePoliciesController/";

  //subject for passing the chosen policy to it's editor
  private currentPolicySubject: BehaviorSubject<InsurancePolicies | null> = new BehaviorSubject<InsurancePolicies | null>(null);
  currentPolicy$: Observable<InsurancePolicies | null> = this.currentPolicySubject.asObservable();

  constructor(private http: HttpClient) {
  }

  
  setPolicy(policy: InsurancePolicies): void {
    this.currentPolicySubject.next(policy);
  }

  getPolicy(): InsurancePolicies | null{
    return this.currentPolicySubject.getValue();
  }


  getUserPolicies(userId?: number): Observable<InsurancePolicies[]> {
    return this.http.get<InsurancePolicies[]>(`${this.serviceBase}GetUserPolicies/${userId}`);
  }

  addInsurancePolicy(newPolicy: InsurancePolicies): Observable<InsurancePolicies> {
    return this.http.post<InsurancePolicies>(this.serviceBase + 'AddInsurancePolicy', newPolicy);
  }

  updateInsurancePolicy(policy: InsurancePolicies): Observable<InsurancePolicies> {
    return this.http.put<InsurancePolicies>(`${this.serviceBase}UpdateInsurancePolicy`, policy);
  }

  deleteInsurancePolicy(policyId: number): Observable<InsurancePolicies> {
    const url = `${this.serviceBase}DeleteInsurancePolicy/${policyId}`;
    return this.http.delete<InsurancePolicies>(url);
  }

  getPolicyById(policyId: number): Observable<InsurancePolicies> {
    return this.http.get<InsurancePolicies>(`${this.serviceBase}GetPolicyById/${policyId}`);
  }
}
