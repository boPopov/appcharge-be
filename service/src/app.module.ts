import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { OfferController } from './controllers/offer.controller'
import { OfferService } from './services/offer.service'
import { OrderController } from './controllers/order.controller'
import { OrderService } from './services/order.service'
import { Users } from './models/user.entity'
import { Offer } from './models/offer.entity'
import { Game } from './models/game.entity'
import { Product } from './models/product.entity'
import { Orders} from './models/order.entity'
import { JwtModule } from '@nestjs/jwt'
import { AuthenticationService } from "./services/auth.service"
import { jwtConstants } from "./auth/constract"


import entities from './databaseentities/db.enteties'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || "localhost",
      port: parseInt(process.env.POSTGRES_PORT) || 5433,
      username: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "123",
      database: process.env.POSTGRES_DB || "postgres_app",
      entities: entities,
      synchronize: true,
      autoLoadEntities: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Offer]),
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Orders])
  ],
  controllers: [UserController, OfferController, OrderController],
  providers: [UserService, AuthenticationService, OfferService, OrderService],
})
export class AppModule {}
