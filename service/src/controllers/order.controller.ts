
import { Controller, HttpCode, HttpStatus, Post, Headers, Body } from "@nestjs/common"
import { AuthenticationService } from "src/services/auth.service";
import { OrderService } from "src/services/order.service";

@Controller('order')
export class OrderController {

    constructor(
        private readonly authService: AuthenticationService,
        private readonly orderService: OrderService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post("/item")
    async orderItem(@Headers('authorization') authorizationToken: string, @Body() orderDto: Record<string, any>){
        if (await this.authService.isTokenValid(authorizationToken)) {
            if(this.orderService.makePayment(orderDto.cardnumber, orderDto.cardowner, orderDto.cardexpiredate, orderDto.cardcvv)){
                let user = await this.authService.getToken(authorizationToken)
                return this.orderService.newOrder(orderDto.offerid, user.id)
            }
        } else {
            return {
                "message": "Sorry, your token has expired.\nPlease login again!"
            }
        }
    }

}