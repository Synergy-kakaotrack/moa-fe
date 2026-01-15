export interface Scrap {
    id: number;
    texts: string[];
    meta:{
        source: string;
        url?: string;
    };
    createdAt: number;
    
}
