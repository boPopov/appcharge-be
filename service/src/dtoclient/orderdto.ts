import { IsNotEmpty } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    cardnumber: string

    @IsNotEmpty()
    cardexpiredate: string

    @IsNotEmpty()
    cardcvv: string

    @IsNotEmpty()
    offerid: string
}