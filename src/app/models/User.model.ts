export class User {
    id!: number;
    name: string | undefined
    email: string | undefined;
}

export class UserAndPolicies {
    user: User | undefined;
    policies:InsurancePolicies[] | undefined
}

export class InsurancePolicies {
    id: number | undefined;
    policyNumber:string | undefined;
    insuranceAmount:number | undefined;
    startDate!: Date;
    endDate!:Date;
    userId:number | undefined;
}

