import db from '../database';
import path from 'path';
import jetpack from 'fs-jetpack';
import Jimp from 'jimp';
import Joi from 'joi';
import _ from 'lodash'
import { parcelaSchema, parcelaEditSchema } from './_schema';
import { remote } from 'electron'

const userDataPath = remote.app.getPath('documents');
const uploadFolder = path.resolve(path.join(userDataPath, './cmentarz/db/images/'));

function validateParcela(body, schema) {
    return Joi.validate(body, schema, {
        abortEarly: true
    }, function (err, value) {
        if (err) {
            return alert('Błąd ' + err.message);
        } else {
            return value;
        }
    })
};

const viewAllParcela = function (res) {
    db.find({
        doc: 'graves'
    }, function (err, docs) {
        if (err) {
            return alert('Error: ' + err);
        } else {
            let docsJSON = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(docs))));
            return res(docsJSON);
        }
        })
}

const viewParcela = function (id, res) {
    db.findOne({
        "parcela.nrGrobu": id
    }, function (err, doc) {
        if (err) {
            return alert('Error: ' + err);
        } else {
            let docJSON = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(doc))));
            return res(docJSON, uploadFolder);
        }
    })
}

const addParcela = function (parcelaData, nrGrobu, imagePath) {
    db.findOne({
        nrGrobu: nrGrobu
    }, function (err, doc) {
        if (err) {
            return 'Error: ' + err;
        } else if (doc) {
            return alert('Podany grób numer: ' + doc.nrGrobu + ' znajduje się już w bazie!');
        };

        let result = new validateParcela(parcelaData, parcelaSchema);
        if (typeof result.nrGrobu !== 'undefined') {

            if (imagePath !== '') {

                let fileArr = nrGrobu.split('|')
                let fileName = fileArr[0] + '-' + fileArr[1] + '-' + fileArr[2]
                let theFile = fileName + '.' + result.ext
                let filePath = path.join(uploadFolder, theFile)

                jetpack.copy(imagePath, filePath, {
                    overwrite: true
                });
                Jimp.read(filePath, function (err, resImg) {
                    if (err) throw err;
                    resImg.resize(800, Jimp.AUTO)
                        .quality(60)
                        .write(theFile)
                })
            }

            db.insert({
                doc: 'graves',
                parcela: result
            }, function (err, res) {
                if (err) {
                    return alert('Bład: ' + err);
                } else {
                    parcela: '';
                }
            })
        } else {
            return false;
        }
    })
};

const editParcela = function (updateData, nrGrobu, imagePath) {

    db.findOne({
        'parcela.nrGrobu': nrGrobu
    }, function (err, res) {
        if (err) {
            return 'Error: ' + err;
        } else if (res) {

            let validResult = new validateParcela(updateData, parcelaEditSchema)

            if (res.parcela.rodzaj !== validResult.rodzaj && JSON.stringify(validResult.rodzaj) !== '' && JSON.stringify(validResult.rodzaj) !== null) {
                db.update({
                    _id: res._id
                }, {
                    $set: {
                        'parcela.rodzaj': validResult.rodzaj
                    }
                }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }

            if (res.parcela.status !== validResult.status && JSON.stringify(validResult.status) !== '' && JSON.stringify(validResult.status) !== null) {
                db.update({
                    _id: res._id
                }, {
                    $set: {
                        'parcela.status': validResult.status
                    }
                }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }

            if (res.parcela.okres !== validResult.okres && JSON.stringify(validResult.okres) !== '' && JSON.stringify(validResult.okres) !== null) {
                db.update({
                    _id: res._id
                }, {
                    $set: {
                        'parcela.okres': validResult.okres
                    }
                }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }

            let resDtOplaty = res.parcela.dtOplaty === undefined ? true : false

            if (JSON.stringify(validResult.dtOplaty) !== '' && JSON.stringify(validResult.dtOplaty) !== null) {

                if (resDtOplaty) {

                    db.update({
                        _id: res._id
                    }, {
                            $set: {
                                'parcela.dtOplaty': validResult.dtOplaty
                            }
                        }, {}, function (err, res) {
                            if (err) {
                                console.log('Aktualizacja nie powioda się')
                            }
                            return true;
                        })

                } else {

                    if (res.parcela.dtOplaty.toISOString() !== validResult.dtOplaty.toISOString()) {

                        db.update({
                            _id: res._id
                        }, {
                                $set: {
                                    'parcela.dtOplaty': validResult.dtOplaty
                                }
                            }, {}, function (err, res) {
                                if (err) {
                                    console.log('Aktualizacja nie powioda się')
                                }
                                return true;
                            })

                    }

                }

            }

            if (res.parcela.uwagi !== validResult.uwagi && JSON.stringify(validResult.uwagi) !== '' && JSON.stringify(validResult.uwagi) !== null) {
                db.update({
                    _id: res._id
                }, {
                        $set: {
                            'parcela.uwagi': validResult.uwagi
                        }
                    }, {}, function (err, res) {
                        if (err) {
                            console.log('Aktualizacja nie powioda się')
                        }
                        return true;
                    })
            }

            if (res.parcela.ext !== validResult.ext && JSON.stringify(validResult.ext) !== '' && JSON.stringify(validResult.ext) !== undefined) {
                if (imagePath !== '') {
                    if (validResult.ext !== undefined) {

                        let fileName = nrGrobu + '.' + validResult.ext
                        jetpack.remove(uploadFolder + fileName);
                    }
                    let theFile = uploadFolder + nrGrobu + '.' + validResult.ext
                    jetpack.copy(imagePath, theFile, {
                        overwrite: true
                    });
                    Jimp.read(theFile, function (err, resImg) {
                        if (err) throw err;
                        resImg.resize(800, Jimp.AUTO)
                            .quality(60)
                            .write(theFile)
                    })
                }

                db.update({
                    _id: res._id
                }, {
                    $set: {
                        'parcela.ext': validResult.ext
                    }
                }, {}, function (err, res) {
                    if (err) {
                        console.log('Aktualizacja nie powioda się')
                    }
                    return true;
                })
            }

        };

    })
};

const removeParcela = function (nrGrobu) {
    return db.findOne({
        "parcela.nrGrobu": nrGrobu
    }, function (err, res) {
        if (err) {
            return alert('Błąd del: ' + err);
        } else {

            if (res.parcela.ext !== undefined) {
                let fileName = nrGrobu + '.' + res.parcela.ext
                jetpack.remove(uploadFolder + fileName);
            }
            return db.remove({
                "parcela.nrGrobu": nrGrobu
            }, function (err, res) {
                if (err) {
                    return alert('Błąd: ' + err);
                } else {
                    alert('OK: grób został usunięty. ' + res);
                    return res;
                }
            })
        }
    })
};

const theParcela = function (res) {
    db.find({ doc: 'graves' }, function (err, docs) {
        let docsJSON = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(docs))));
        return res(docsJSON)
        
    })
}

const matrixParcela = function (res) {
    db.find({doc: 'graves' }, function (err, docs) {
        let docsJSON = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(docs))));
        let dataMap = _.orderBy(_.map(docsJSON, 'parcela'), ['parcela', 'rzad', 'grob'], ['asc', 'asc', 'asc'])
        let pCount = _.countBy(dataMap, function(t) {
            return t.parcela
        })

        let myArr = []

        _.forEach(pCount, function (value, key) {
            let wyn = _.filter(dataMap, { 'parcela': key })
            let r = _.countBy(wyn, function (t) {
                return t.rzad
            })
            myArr.push({'parcela': key, 'graves': r})    
        })

        return res(myArr)
 
    })
}


export let graves = {
    addParcela,
    editParcela,
    removeParcela,
    viewAllParcela,
    viewParcela,
    matrixParcela,
    theParcela
};