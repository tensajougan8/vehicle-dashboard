import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: MongooseModule.forRoot('mongodb://localhost/nest'),
  },
];
