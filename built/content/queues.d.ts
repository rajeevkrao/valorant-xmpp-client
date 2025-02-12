export declare class Queues {
    static Competitive: QueueObject;
    static Custom: QueueObject;
    static Deathmatch: QueueObject;
    static Escalation: QueueObject;
    static NewMap: QueueObject;
    static Replication: QueueObject;
    static SnowballFight: QueueObject;
    static SpikeRush: QueueObject;
    static Unrated: QueueObject;
}
export interface QueueObject {
    id: QueueIds;
    name: string;
}
export type QueueIds = ('competitive' | 'custom' | 'deathmatch' | 'ggteam' | 'newmap' | 'onefa' | 'snowball' | 'spikerush' | 'unrated') | (string & {});
