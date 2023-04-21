import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Offer } from "../models/offer.entity"
import { Orders } from "src/models/order.entity";
import * as crypto from 'crypto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Orders) private readonly orderRepository: Repository<Orders>,
        @InjectRepository(Offer) private readonly offerRepository: Repository<Offer>
    ){}

    async newOrder(offer_id: string, user_id: string) {
        let offer = await this.offerRepository.findOneBy({id: offer_id})
        console.log("Offer", offer)
        let id = this.generateID()
        
        try {
            this.orderRepository.insert({order_id: id, offer_id: offer_id, user_id: user_id, amount: 15, currency: offer.currency})
        } catch (err) {
            return err
        }
        
        offer.available--
        
        try{
            this.offerRepository.save(offer)
        } catch(err) {
            return err
        }

        return "Okay"
    }
    
    generateID() {
        const algorithm = 'aes-256-cbc';
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update("id", 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    makePayment(cardnumber: string, cardowner: string, cardexpiredate: string, cardcvv: string) {
        /**
         * Here should be an implementation of a payment system.
         * For example: Stripe, Square, PayPal etc.
         * For this example we will just return 'true' and simulate that the payment was succesful.
         */
        if (this.validateCard(cardnumber, cardexpiredate)) {
            return true
        } else {
            return {"message": "Not a valida credit card"}
        }
    }

    validateCard(cardnumber: string, cardexpirydate: string) {
        const month = parseInt(cardexpirydate.slice(0, 2));
        const year = parseInt(`20${cardexpirydate.slice(2, 4)}`);
        const now = new Date();

        if (month < 1 || month > 12) {
        return false;
        }

        if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
        return false;
        }

        return true;
    }

}