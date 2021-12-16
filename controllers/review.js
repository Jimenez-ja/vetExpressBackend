const Payment = require('../models/payment');
const Review = require('../models/review');
const moment = require('moment');

const mongoose = require('mongoose')

const getAllReviews = async(req, res) => {

    const review = await Review.find()
        .populate('user', ['name'])
        .populate('service', ['name'])

    if (review.length == 0) {
        return res.status(404).json({
            err: "No se encontraronn reviews"
        })
    }

    const total = review.length;
    res.json({
        total,
        review
    })

}

const getreviewsMonthly = async(req, res) => {
    const start = moment().startOf('month').format('MM/DD/YYYY');
    const end = moment().endOf('month').format('MM/DD/YYYY');

    const review = await Review.find({ date: { $gte: start, $lte: end } });

    const total = review.length;

    res.json({
        total,
        review
    })
}

const getReview = async(req, res) => {

    const { id } = req.params;

    const review = await Review.findOne({ payment: id });

    if (!review) {
        return res.status(404).json({
            err: 'No se encontro la review'
        })
    }

    res.json({
        ok: 'Se encontro review',
        review
    })

}

const getReviewByService = async(req, res) => {

    const { id } = req.params;


    const parseID = mongoose.Types.ObjectId(id);

    const [review, avg, oneStar, twoStar, threeStar, fourStar, fiveStar] = await Promise.all([
        Review.find({ service: id })
        .populate('user', ['name']),
        Review.aggregate([
            { $match: { service: parseID } },
            { $group: { _id: '$service', average: { $avg: '$score' } } }
        ])
    ])


    if (review.length == 0) {
        return res.status(404).json({
            err: 'No se encontraron calificaciones'
        })
    }

    const total = review.length;

    res.json({
        total,
        review,
        avg,
        oneStar,
        twoStar,
        threeStar,
        fourStar,
        fiveStar
    })

}

const postReview = async(req, res) => {

    const { payment, score, title, description } = req.body;

    const pay = await Payment.findById(payment);

    if (!pay) {
        return res.status(404).json({
            err: "No se encontro el pago"
        })
    }

    const { service, user } = pay;

    const review = new Review({ payment, score, title, description, service, user });

    try {
        await review.save();
        return res.status(201).json({
            ok: 'Se envio correctamente la calificacion'
        })

    } catch (error) {
        return res.status(400).json({
            err: error
        })
    }
}



module.exports = {
    getReview,
    getAllReviews,
    getreviewsMonthly,
    getReviewByService,
    postReview
}