import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ItemsController } from './items/items.controller';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [BooksModule, BlogModule],
  controllers: [AppController, ItemsController],
  providers: [AppService],
})
export class AppModule {}
