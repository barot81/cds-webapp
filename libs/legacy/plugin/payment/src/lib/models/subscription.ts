export class Subscription {
    subscriptionId: string;
    duration: number;
    durationUnit: string;
    price: string;
    resourceId: string;
}

export class ActiveSubscription {
    resourceId:string;
    resourceName: string;
    resourceDescription: string;
    expiry: number;
    price: string;
}