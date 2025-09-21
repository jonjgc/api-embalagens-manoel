import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackagingModule } from './packaging/packaging.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PackagingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
