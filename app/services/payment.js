const RazorPay = require('razorpay');
const razorPay = require('../config').razorPay;


class RazorPayPayment{

    constructor(){
        this.instance = new RazorPay({
            key_id: razorPay.id,
            key_secret: razorPay.secret
        });
    }

    


    createOrder(data){
         

        return this.instance.orders.create({amount:data.amount * 100, currency:'INR', receipt:data.id, payment_capture:1, notes:{
            type: data.payFor,
            id: data.id        
        }});
    }
     

    parseOrder(data){
        //check for validation
        const body = data.body;
        const signature = data.headers['x-razorpay-signature'];

        // if (!RazorPay.validateWebhookSignature(body, signature, razorPay.webKey)){
        //     return {success: false, id: "", notes:{}};
        // }

        var entity = data.body.payload.payment.entity;
        
        if (body.event == 'order.paid'){
            return {success: true, id: entity.order_id, notes: entity.notes};
        }else{
            return {success: false, id: entity.order_id, notes: entity.notes};
        }
    }
}


module.exports = new RazorPayPayment();