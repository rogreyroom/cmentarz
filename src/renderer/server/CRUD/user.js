import db from '../database';
import Joi from 'joi';
import { userSchema } from './_schema';

function valUser(user) {
    return Joi.validate(user, userSchema, {
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

function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const addUser = function (userData) {
    let valid = new valUser(userData);
    if (valid) {
        return db.insert({
            doc: 'users',
            user: valid
        }, function (err, res) {
            if (err) {
                return alert('Bład add: ' + err);
            } else {
                return true;
            }
        })
    }

};

const editUser = function (userData, id) {
    db.findOne({
        _id: id
    }, function (err, res) {
        if (err) {
            return alert('Błąd del: ' + err);
        } else {

            let valid = new valUser(userData);
            if (valid) {
                db.update({
                    _id: res._id
                }, {
                        $set: {
                            user: valid
                        }
                    }, {}, function (err, res) {
                        if (err) {
                            return alert('Błąd edit: ' + err);
                        } else {
                            return true;
                        }
                    })

            }
        }
    })
};

const removeUser = function (userId) {
    db.findOne({
        _id: userId
    }, function (err, res) {
        if (err) {
            return alert('Błąd del: ' + err);
        } else {
            db.remove({
                _id: userId
            }, function (err, res) {
                if (err) {
                    return alert('Błąd: ' + err);
                } else {
                    return alert('OK: użytkownik został usunięty. ' + res);
                }
            })
        }
    })
};

const viewAllUsers = function (id, res) {
    db.find({
        doc: 'users',
        "user.nrGrobu": id
    }, function (err, docs) {
        if (err) {
            return alert('Error: ' + err);
        } else {
            let docsJSON = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(docs))));
            return res(docsJSON);
        }
    })
}

const viewUsers = function (res) {
    db.find({
        doc: 'users'
    }, function (err, docs) {
        if (err) {
            return alert('Error: ' + err);
        } else {
            let docsJSON = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(docs))));
            return res(docsJSON);
        }
    })
}


const viewUser = function (id, res) {

    db.findOne({
        _id: id
    }, function (err, doc) {
        if (err) {
            return alert('Error: ' + err);
        } else {
            let docJSON = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(doc))));
            return res(docJSON);
        }
    })

}

const findUsers = function (name, res) {
    let theName = jsUcfirst(name)
    if (name) {
        db.find({
            doc: 'users',
            'user.nazwisko': theName
        }, function (err, docs) {
            if (err) {
                return alert('Error: ' + err);
            } else {
                let docJSON = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(docs))));
                return res(docJSON);
            }
        })
    }
}

export let users = {
    addUser,
    editUser,
    removeUser,
    viewAllUsers,
    viewUsers,
    viewUser,
    findUsers
}