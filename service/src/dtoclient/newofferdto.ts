import { IsEmail, IsNotEmpty, MinLength, IsNumber } from "class-validator";
import { ProductDto } from './productdto'

export class NewOfferDto {
    @IsNotEmpty()
    gamename: string

    @IsNotEmpty()
    gamedescription: string

    @IsNumber()
    available: number

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    sku: string

    @IsNotEmpty()
    price: string

    @IsNotEmpty()
    currency: string

    products: [ProductDto]
}