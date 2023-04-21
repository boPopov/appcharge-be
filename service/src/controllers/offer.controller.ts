import { AuthenticationService } from '../services/auth.service';
import { Body, Controller, Post, Get, Put, Delete, HttpCode, HttpStatus, Headers, Query } from "@nestjs/common";
import { OfferService } from '../services/offer.service'
@Controller('offer')
export class OfferController{

    constructor(
        private readonly authService: AuthenticationService,
        private readonly offerService: OfferService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post("/new")
    async addNewOffer(@Headers('authorization') authorizationToken: string, @Body() newOfferDto: Record<string, any>) {
        if (await this.authService.isTokenValid(authorizationToken)) {
            return this.offerService.newOffer(newOfferDto.currency, newOfferDto.name, newOfferDto.price, newOfferDto.available, newOfferDto.gamename, newOfferDto.gamedescription, newOfferDto.products)
        } else {
            return {
                "message": "Sorry, your token has expired.\nPlease login again!"
            }
        }
    }

    @HttpCode(HttpStatus.OK)
    @Put("/edit")
    async editOffer(@Headers('authorization') authorizationToken: string, @Body() editOfferDto: Record<string, any>) {
        if (await this.authService.isTokenValid(authorizationToken)) {
            return this.offerService.editOffer(editOfferDto.id, editOfferDto.currency, editOfferDto.name, editOfferDto.price, editOfferDto.available)
        } else {
            return {
                "message": "Sorry, your token has expired.\nPlease login again!"
            }
        }
    }

    @HttpCode(HttpStatus.OK)
    @Delete("/delete")
    async deleteOffer(@Headers('authorization') authorizationToken: string, @Body() deleteOfferDto: Record<string, any>) {
        if(await this.authService.isTokenValid(authorizationToken)) {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAA")
            return this.offerService.deleteOffer(deleteOfferDto.id)
        } else {
            console.log("IN ERROR");
            return { "message": "Sorry, your token has expired.\nPlease login again!" }
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    async getOffer(@Headers('authorization') authorizationToken: string, @Query('offer') offerValue: string) {
        console.log("Token:", authorizationToken)
        if (await this.authService.isTokenValid(authorizationToken)) {
            if (offerValue === undefined || offerValue === null || offerValue === "") {
                return this.offerService.getOffers()
            } else {
                return this.offerService.getOffer(offerValue)
            }
        } else {
            return {
                "message": "Sorry, your token has expired.\nPlease login again!"
            }
        }
    }

}