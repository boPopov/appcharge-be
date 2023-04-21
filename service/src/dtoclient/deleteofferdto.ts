import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class DeleteOfferDto {
    @IsNotEmpty()
    offerId: string
}