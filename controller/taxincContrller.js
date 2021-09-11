const taxAmt = require('../models/taxAmt');


module.exports.calculateTaxInc = (req, res) => {
    const {basic, hra, fa, lta, INV, rent, cityType, med } = req.body;
    const TaxInc = basic + hra+ fa+ lta - INV - rent - med

    const newEntry = new taxAmt(req.body);
        newEntry.save().then((data) => {
            return res.send(data)
        })
}

module.exports.getEntry = (req, res) => {
    taxAmt.find({}).then((data) => {
        return res.status(200).json(data)
    })
}