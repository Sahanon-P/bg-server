import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { BoardgamesService } from './boardgames.service';
import { ApiKeyGuard, JwtGuard } from 'src/auth/guard';

@Controller('boardgames')
export class BoardgamesController {
  constructor(private boardgamesService: BoardgamesService) {}

  @UseGuards(ApiKeyGuard)
  @Get('id/:id')
  getById(@Param() params) {
    return this.boardgamesService.getById(params.id);
  }

  @UseGuards(ApiKeyGuard)
  @Post('create')
  create(@Body() dto) {
    return this.boardgamesService.create(dto);
  }

  @UseGuards(ApiKeyGuard)
  @Get('all')
  getAll() {
    return this.boardgamesService.getAll();
  }

  @UseGuards(ApiKeyGuard)
  @Get('comment/:id')
  getComment(@Param() param) {
    return this.boardgamesService.getComment(param.id);
  }

  @UseGuards(JwtGuard)
  @Put('rating')
  updateRating(@Req() req) {
    return this.boardgamesService.updateRating(
      req.user,
      req.body.boardGameId,
      req.body.rating,
    );
  }

  @UseGuards(JwtGuard)
  @Post('comment')
  craeteComment(@Req() req) {
    return this.boardgamesService.createComment(
      req.user,
      req.body.boardGameId,
      req.body.comment,
    );
  }

  @UseGuards(JwtGuard)
  @Put('comment')
  updateComment(@Req() req) {
    return this.boardgamesService.updateComment(
      req.user,
      req.body.boardGameId,
      req.body.comment,
    );
  }
}
