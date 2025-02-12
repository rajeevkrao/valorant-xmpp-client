export interface ItemObject {
    id: IdObject;
    platforms: any;
    jid: string;
    subscription: subscriptionTypes;
    platform?: string;
    puuid: string;
}
export interface IdObject {
    name: string;
    tagline: string;
}
/**
 * pending_in: Incoming friend request
 * both: Friends
 * remove: Unfriended
 */
export type subscriptionTypes = "pending_in" | 'both' | 'remove';
