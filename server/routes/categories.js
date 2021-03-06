const express = require('express');
const router = express.Router();

const { Categories } = require("../models/User");

//=================================
//             Categories
//=================================

router.post("/categories", (req, res) => {

    const category = new Categories(req.body);

    category.save((err) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.get("/getAllCategories", (req, res) => {

    Categories.find()
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })

});

module.exports = router;
