
export enum EntityEventOperation {
    save = 'save'
}
export interface EntityEvent<T> {
    operation: EntityEventOperation,
    timestamp: number,
    entity: T
}
export class EntityService {

}