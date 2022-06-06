import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Category } from './entities/category.entity';

@EventSubscriber()
export class CategorySubscriber implements EntitySubscriberInterface<Category> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Category;
  }

  beforeInsert(event: InsertEvent<Category>) {
    console.log('BEFORE Category INSERTED: ', event.entity);
  }

  beforeUpdate(event: UpdateEvent<Category>) {
    console.log('BEFORE Category UPDATED: ', event.entity);
  }

  afterUpdate(event: UpdateEvent<Category>) {
    console.log(`AFTER Category UPDATED: `, event.entity);
  }

  beforeRemove(event: RemoveEvent<Category>) {
    console.log(
      `BEFORE Category WITH ID ${event.entityId} REMOVED: `,
      event.entity,
    );
  }

  afterRemove(event: RemoveEvent<Category>) {
    console.log(
      `AFTER Category WITH ID ${event.entityId} REMOVED: `,
      event.entity,
    );
  }
}
