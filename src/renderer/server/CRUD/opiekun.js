import db from '../database';
import Joi from 'joi';
import { opiekunSchema } from './_schema';

function valTakers(opiekun) {
    return Joi.validate(opiekun, opiekunSchema, { abortEarly: true }, function (err, value) {
        if (err) {
            alert('Błąd val: ' + err);
            return false;
        } else {
            return value;
        }
    })
};


const viewTaker = function (id, res) {
    db.findOne({ doc: 'takers', "taker.nrGrobu": id }, function (err, doc) {
        if (err) {
            return alert('Error: ' + err);
        } else {
            let docJSON = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(doc))));
            return res(docJSON);
        }
    })
}

const addTaker = function (takerData) {
    let valid = new valTakers(takerData);
    if (valid) {
        db.insert({ doc: 'takers', taker: valid }, function (err, res) {
            if (err) {
                return alert('Bład add: ' + err);
            } else {
                return res;
            }
        })
    }
}

const editTaker = function (updateData, nrGrobu) {
    db.findOne({ 'taker.nrGrobu': nrGrobu }, function (err, res) {
        if (err) {
            return 'Error: ' + err;
        } else if (res) {

            let validResult = new valTakers(updateData)

            if (res.taker.imie !== validResult.imie && JSON.stringify(validResult.imie) !== '') {
                db.update({ _id: res._id }, { $set: { 'taker.imie': validResult.imie } }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }

            if (res.taker.nazwisko !== validResult.nazwisko && JSON.stringify(validResult.nazwisko) !== '') {
                db.update({ _id: res._id }, { $set: { 'taker.nazwisko': validResult.nazwisko } }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }

            if (res.taker.adres !== validResult.adres && JSON.stringify(validResult.adres) !== '') {
                db.update({ _id: res._id }, { $set: { 'taker.adres': validResult.adres } }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }

            if (res.taker.tel !== validResult.tel && JSON.stringify(validResult.tel) !== '') {
                db.update({ _id: res._id }, { $set: { 'taker.tel': validResult.tel } }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }

            if (res.taker.email !== validResult.email && JSON.stringify(validResult.email) !== '') {
                db.update({ _id: res._id }, { $set: { 'taker.email': validResult.email } }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }

            if (res.taker.uwagi !== validResult.uwagi && JSON.stringify(validResult.uwagi) !== '') {
                db.update({ _id: res._id }, { $set: { 'taker.uwagi': validResult.uwagi } }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }
        };
    })
};

export let takers = { viewTaker, addTaker, editTaker }