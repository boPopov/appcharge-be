import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ProductDto } from './productdto'
export class EditOfferDto {
    @IsNotEmpty()
    id: string

    currency: string

    name: string

    price: string

    available: number    
    
    products: [ProductDto]
}