import { Injectable } from '@nestjs/common';
import { Boardgames, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardgamesService {
  constructor(private prisma: PrismaService) {}

  async getById(boardGameid: string) {
    const result = await this.prisma.boardgames.findUnique({
      where: {
        id: boardGameid,
      },
    });
    return result;
  }

  async getComment(boardGameId: string) {
    const result = await this.prisma.comment.findMany({
      where: {
        boardGameId: boardGameId,
      },
    });
    return result;
  }

  async getAll() {
    const result = await this.prisma.boardgames.findMany();
    return result;
  }

  async updateRating(user: User, boardgameId: string, rating: number) {
    const userRating = await this.prisma.userRating.findFirst({
      where: {
        boardGameId: boardgameId,
        userId: user.id,
      },
    });
    if (!userRating) {
      const createUserRating = await this.prisma.userRating.create({
        data: {
          userId: user.id,
          rating: rating,
          boardGameId: boardgameId,
        },
      });
      return createUserRating.id;
    } else {
      await this.prisma.userRating.update({
        where: {
          id: userRating[0].id,
        },
        data: {
          rating: rating,
        },
      });
      return userRating.id;
    }
  }

  async create(datas: Boardgames[]) {
    for (const data of datas) {
      await this.prisma.boardgames.create({
        data: {
          id: data.id.toString(),
          maxplayers: parseInt(data.maxplayers.toString()),
          minplayers: parseInt(data.minplayers.toString()),
          maxplaytime: parseInt(data.maxplaytime.toString()),
          minplaytime: parseInt(data.minplaytime.toString()),
          name: data.name,
          description: data.description,
          image: data.image,
          thumbnail: data.thumbnail,
          yearpublished: data.yearpublished,
        },
      });
    }
    return 'complete';
  }

  async createComment(user: User, boardGameId: string, comment: string) {
    const userComment = await this.prisma.comment.create({
      data: {
        userId: user.id,
        boardGameId: boardGameId,
        comment: comment,
        username: user.username,
      },
    });
    return userComment.id;
  }

  async updateComment(user: User, boardGameId: string, comment: string) {
    await this.prisma.comment.updateMany({
      where: {
        userId: user.id,
        boardGameId: boardGameId,
      },
      data: {
        comment: comment,
      },
    });
  }
}
