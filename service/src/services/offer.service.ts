import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Offer } from "../models/offer.entity"
import { Product } from "../models/product.entity"
import { Game } from "../models/game.entity"
import { ProductDto } from "../dtoclient/productdto"

@Injectable()
export class OfferService {
    constructor(
        @InjectRepository(Offer) private readonly offerRepository: Repository<Offer>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Game) private readonly gameRepository : Repository<Game>
    ){}

    async newOffer(currency: string, name: string, price: string, available: number, gamename: string, gamedescription: string, products: [ProductDto]) {
        let game = await this.insertGame(gamename, gamedescription)
        
        this.offerRepository.insert({available: available, game_id: game.id, name: name, currency: currency, price: price})
        let offer = await this.offerRepository.findOneBy({name: name})
        
        if (products !== undefined || products !== null) {
            this.insertProducts(offer.id, products)
        }

        return "Okay"
    }

    insertProducts(offer_id: string, products: [ProductDto]) {
        products.forEach(product => {
            this.productRepository.insert({amount: product.amount, name: product.name, sku: product.sku, offer_id: offer_id})
        });
    }

    async insertGame(gamename: string, gamedescription: string) {
        let gameObject = await this.checkIfGameExists(gamename)

        if (gameObject === undefined || gameObject === null) {
            console.log(gamename, gamedescription)
            await this.gameRepository.insert({name: gamename, description: gamedescription})
        } 
        return await this.checkIfGameExists(gamename)
    }

    checkIfGameExists(gamename: string) {
        return this.gameRepository.findOneBy({name: gamename})
    }

    async editOffer(id: string, currency: string, name: string, price: string, available: number) {
        let offerObject: Offer 
        offerObject = await this.offerRepository.findOneBy({id: id})

        if (offerObject === undefined || offerObject === null) {
            throw new Error("Offer does not exist!");
        }
        
        let editedOffer = await this.editObject(id, currency, name, price, available, offerObject) 
        this.offerRepository.save(editedOffer)

        return "Okay"
    }

    editObject(id: string, currency: string, name: string, price: string, available: number, offer: Offer) {

        if (currency !== "" && !this.checkIfValuesDiffer(currency, offer.currency)) {
            offer.currency = currency
        }

        if (name !== "" && !this.checkIfValuesDiffer(name, offer.name)) {
            offer.name = name
        }

        if (price !== "" && !this.checkIfValuesDiffer(price, offer.price)) {
            offer.price = price
        }

        if (available !== undefined && available !== null && available !== -1 && !this.checkIfValuesDiffer(available, offer.available)) {
            offer.available = available
        }

        return offer
    }

    checkIfValuesDiffer(val1: any, val2: any) {
        if (!val2 && val1) {
            return true
        }
        return val1 === val2
    }

    deleteOffer(id: string) {
        this.offerRepository.delete({id: id})
        return "Okay"
    }

    async getOffers() {
        let offers = await this.offerRepository.find();
        let offersObject = {}
        
        for(let index = 0 ; index < offers.length ; index++) {
            let details = await this.getOfferDetailsAndProducts(offers[index])
            offersObject[index] = details
        }
        
        return offersObject
    }

    async getOffer(id: string) {
        let offer: Offer
        try{
            offer = await this.offerRepository.findOneBy({id: id})
        } catch(err) {
            return err
        }
        return this.getOfferDetailsAndProducts(offer)
    }

    async getOfferDetailsAndProducts(offer: Offer) {
        let products: Product[]
        try{
            products = await this.productRepository.findBy({offer_id: offer.id})
        } catch (err){
            return err
        }
        return this.offerObjectCreator(offer, products)
    }

    offerObjectCreator(offer: Offer, products: Product[]) {
        let offerObject = {}
        offerObject["id"] = offer.id
        offerObject["available"] = offer.available
        offerObject["game_id"] = offer.game_id
        offerObject["price"] = offer.price
        offerObject["currency"] = offer.currency
        offerObject["name"] = offer.name
        offerObject["products"] = products
        return offerObject
    }
}