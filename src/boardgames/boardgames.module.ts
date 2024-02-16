import { Module } from '@nestjs/common';
import { BoardgamesController } from './boardgames.controller';
import { BoardgamesService } from './boardgames.service';

@Module({
  controllers: [BoardgamesController],
  providers: [BoardgamesService]
})
export class BoardgamesModule {}
