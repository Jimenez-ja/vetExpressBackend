const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const payPalClient = require('../Common/payPalClient');
const moment = require('moment');

const Payment = require('../models/payment');

const getPaymentById = async(req, res) => {

    const { authUser } = req;

    const payment = await Payment.find({ user: authUser._id })
        .populate('user', ['name'])
        .sort({ _id: 'desc' })

    res.json({
        payment
    })

}

const getPaymentMonthly = async(req, res)=>{

    const start = moment().startOf('month').format('MM/DD/YYYY');
    const end   = moment().endOf('month').format('MM/DD/YYYY');

    const payment = await Payment.find({date:{$gte: start, $lte: end}});

    const total = payment.length;

    res.json({
        total,
        payment
    })

}

const getPayments = async(req, res) =>{

    const payment = await Payment.find();

    res.json({
        payment
    })

}

const postPayment = async(req, res) => {

    const { orderID, date, time, id } = req.body;

    const { authUser } = req;
    let request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID);

    let order;
    try {
        order = await payPalClient.client().execute(request);
    } catch ({ message }) {
        const { name } = JSON.parse(message);
        return res.status(400).json({
            err: name
        })
    }

    const { status, update_time, payer, purchase_units } = order.result;

    const { amount } = purchase_units[0];

    const payment = new Payment({ user: authUser._id, status, update_time, payer, date, time, service: id, amount });

    try {
        await payment.save()
        return res.json({
            payment
        })
    } catch (error) {
        return res.status(400).json({
            err: error
        })
    }

}

module.exports = {
    getPaymentById,
    getPaymentMonthly,
    getPayments,
    postPayment
}