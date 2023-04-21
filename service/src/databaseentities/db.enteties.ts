import {Users} from "../models/user.entity";
import {Offer} from "../models/offer.entity";
import {Orders} from "../models/order.entity";
import {Game} from "../models/game.entity";
import {Product} from "../models/product.entity";

const entities = [Users, Offer, Orders, Game, Product];

export {Users, Offer, Orders, Game, Product};
export default entities;