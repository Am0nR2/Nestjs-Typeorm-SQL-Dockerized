import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ItemsModule } from './items/items.module';


@Module({
  imports: [DatabaseModule, ConfigModule, ItemsModule],

})
export class AppModule {}
