import db from '../database';
import Joi from 'joi';
import { cmSchema } from './_schema';

function valCm(cm) {
    return Joi.validate(cm, cmSchema, {
        abortEarly: true
    }, function (err, value) {
        if (err) {
            alert('Błąd val: ' + err);
            return false;
        } else {
            return value;
        }
    })
};

const viewAll = function (res) {
    db.find({
        doc: 'cm'
    }, function (err, docs) {
        if (err) {
            return alert('Error: ' + err);
        } else {
            let docsJSON = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(docs))));
            return res(docsJSON);
        }
    })
}

const viewOne = function (id, res) {
    db.findOne({
        _id: id
    }, function (err, docs) {
        if (err) {
            return alert('Error: ' + err);
        } else {
            let docsJSON = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(docs))));
            return res(docsJSON);
        }
    })
}


const countData = function(theCount) {
    db.count({ doc: 'cm' }, function (err, count) {
        if (err) {
            alert('Błąd val: ' + err);
            return false;
        } else {
            return theCount(count)
        }
    })
}


const addData = function (cmData) {
    console.log('dodajemy: ' + cmData)
    let valid = new valCm(cmData)
    if (valid) {
        return db.insert({
            doc: 'cm',
            thecm: valid
        }, function (err, res) {
            if (err) {
                return alert('Bład add: ' + err);
            } else {
                return true;
            }
        })
    }

};

const editCm = function (updateData, id) {
    db.findOne({ _id: id }, function (err, res) {
        if (err) {
            return 'Error: ' + err;
        } else if (res) {

            let validResult = new valCm(updateData)

            if (res.thecm.cmFullName !== validResult.cmFullName && JSON.stringify(validResult.cmFullName) !== '') {
                db.update({ _id: res._id }, { $set: { 'thecm.cmFullName': validResult.cmFullName } }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }

            if (res.thecm.wejscie !== validResult.wejscie && JSON.stringify(validResult.wejscie) !== '') {
                db.update({ _id: res._id }, { $set: { 'thecm.wejscie': validResult.wejscie } }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }

            if (res.thecm.rzad !== validResult.rzad && JSON.stringify(validResult.rzad) !== '') {
                db.update({ _id: res._id }, { $set: { 'thecm.rzad': validResult.rzad } }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }

            if (res.thecm.grob !== validResult.grob && JSON.stringify(validResult.grob) !== '') {
                db.update({ _id: res._id }, { $set: { 'thecm.grob': validResult.grob } }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }
        };
    })
};

export let graveyeards = {
    addData,
    countData,
    viewOne,
    editCm,
    viewAll
}