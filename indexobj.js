'use strict';

const
  error_codes = require('lib/errorMessages').error_codes,
  modelValidation = require('lib/modelValidation'),
  Promise = require('bluebird');



 Crud = (model) => {

    this.model = model


    Crud.prototype.create = (properties) =>{
          var self = this;
          var Model = self.model;
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

    Crud.prototype.getRecordByProperty = (property, value) =>{
          var self = this;
          var Model = self.model;
          if (!property || !value)
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


    Crud.prototype.deleteRecord = (property, value) => {
          var self = this;
          var Model = self.model;

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



    Crud.prototype.updateRecords= (queryparam, queryVal, properties, values) => {
        var self = this;
        var Model = self.model;

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



}//end of class





module.exports.Crud = Crud;