'use strict';

const
	error_codes = require('lib/errorMessages').error_codes,
	modelValidation = require('lib/modelValidation'),
	Promise = require('bluebird');


exports.create = (Model, properties) =>{
	  for (var prop in properties) {
        if (properties.hasOwnProperty(prop)) {
            if (!modelValidation.validateProperty(Model, prop)) {
                console.log('Invalid Property: ' + prop);
                return Promise.reject(error_codes.ResourceNotValid);//ResourceNotValid
            }
        }
    }
    const newRecord = new Model(properties);
    return newRecord.save();
};



exports.getRecordByProperty = (Model, property, value) =>{
 	if (!property || !value || !Model)
    {
        return Promise.reject(error_codes.MissingFields);
    }


    if (modelValidation.validateProperty(Model, property))
    {
        var query={};
        query[property]= value;
        return Model.findOne(query).exec();
    }
    else {
        return Promise.reject(error_codes.ResourceNotValid);
    }
};






exports.deleteRecord = (Model, property, value) => {

    if (!property || !value) {
        return Promise.reject(error_codes.MissingFields); //MissingFields
    }

    if (modelValidation.validateProperty(Model, property)) {
        var query = {};
        query[property] = value;
        console.log("DLEETE RECORD " + JSON.stringify(query));
        return Model.findOneAndRemove(query).exec();
    }
    else {
        return Promise.reject(error_codes.ResourceNotValid); //ResourceNotValid
    }

};



exports.updateRecords= (Model, queryparam, queryVal, properties, values) => {

    if (!email || !properties || !values) {
        return Promise.reject(error_codes.MissingFields);
    }
    else if (!Array.isArray(properties) || !Array.isArray(values)) {
        return Promise.reject(error_codes.ResourceNotValid);
    }
    else if (properties.length != values.length) {
        return Promise.reject(error_codes.ResourceNotValid);
    }

    return modelValidation.getModelByProperty(Model, queryParam, queryVal)
        .then(rec => {
            if (rec) {
                for (var i in properties) {
                    if (properties.hasOwnProperty(i)) {
                        let property = properties[i];
                        if (modelValidation.validateProperty(property)) {
                            rec[property] = values[i];
                        }
                        else {
                            return Promise.reject(error_codes.ResourceNotValid);//ResourceNotValid
                        }
                    }
                }
                return rec.save();
            }
            else {
                log.error('The record ' + queryVal + ' doesn\'t exist');
                return Promise.reject(error_codes.ResourceNotExist); //UnknownError
            }

        }).then(rec => {
            return rec;
        }).catch(err => {
            return Promise.reject(err);
        });

};



};


