import { IsNotEmpty, IsNumber } from "class-validator";

export class ProductDto {
    @IsNumber()
    amount: number

    @IsNotEmpty()
    sku: string

    @IsNotEmpty()
    name: string
}