import { Subscription } from './subscription';

export class Resource {
    resourceId: string;
    resourceName: string;
    resourceDescription: string;
    subscriptions: Subscription[];
}