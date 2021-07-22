export interface PagedResponse<T>{    
    total: number;
    limit: number;
    offset: number;
    items: T[];    
}