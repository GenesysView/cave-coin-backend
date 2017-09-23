var request = require("request");
var express = require('express');
var md5 = require('md5');


var router = express.Router();


router.get('/getconection', function (req, res) {

      request({
        uri: "https://api.payulatam.com/payments-api/4.0/service.cgi",
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        json:{
            "test": true,
            "language": "en",
            "command": "PING",
            "merchant": {
                "apiLogin": "Zo3D7f1CxBIo2O3",
                "apiKey": "bCM9tus76HXDhQSX4CH75m7mKR"
            }
         }
      }, function(error, response, body) {
        res.send(body);
      });


});

router.get('/getpaymentmethods', function (req, res) {
    
          request({
            uri: "https://api.payulatam.com/payments-api/4.0/service.cgi",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            json:{
                "test": false,
                "language": "en",
                "command": "GET_PAYMENT_METHODS",
                "merchant": {
                    "apiLogin": "Zo3D7f1CxBIo2O3",
                    "apiKey": "bCM9tus76HXDhQSX4CH75m7mKR"
                }
             }
          }, function(error, response, body) {
            res.send(body);
          });
    
    
    });

    router.get('/sendcreditcard', function (req, res) {
        
              request({
                uri: "https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                json:{
                    "language": "es",
                    "command": "SUBMIT_TRANSACTION",
                    "merchant": {
                       "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
                       "apiLogin": "pRRXKOl8ikMmt9u"
                    },
                    "transaction": {
                       "order": {
                          "accountId": "512321",
                          "referenceCode": "TestPayU",
                          "description": "payment test",
                          "language": "es",
                          "signature": "7ee7cf808ce6a39b17481c54f2c57acc",
                          "notifyUrl": "http://www.tes.com/confirmation",
                          "additionalValues": {
                             "TX_VALUE": {
                                "value": 20000,
                                "currency": "COP"
                          },
                             "TX_TAX": {
                                "value": 3193,
                                "currency": "COP"
                          },
                             "TX_TAX_RETURN_BASE": {
                                "value": 16806,
                                "currency": "COP"
                          }
                          },
                          "buyer": {
                             "merchantBuyerId": "1",
                             "fullName": "First name and second buyer  name",
                             "emailAddress": "buyer_test@test.com",
                             "contactPhone": "7563126",
                             "dniNumber": "5415668464654",
                             "shippingAddress": {
                                "street1": "calle 100",
                                "street2": "5555487",
                                "city": "Medellin",
                                "state": "Antioquia",
                                "country": "CO",
                                "postalCode": "000000",
                                "phone": "7563126"
                             }
                          },
                          "shippingAddress": {
                             "street1": "calle 100",
                             "street2": "5555487",
                             "city": "Medellin",
                             "state": "Antioquia",
                             "country": "CO",
                             "postalCode": "0000000",
                             "phone": "7563126"
                          }
                       },
                       "payer": {
                          "merchantPayerId": "1",
                          "fullName": "First name and second payer name",
                          "emailAddress": "payer_test@test.com",
                          "contactPhone": "7563126",
                          "dniNumber": "5415668464654",
                          "billingAddress": {
                             "street1": "calle 93",
                             "street2": "125544",
                             "city": "Bogota",
                             "state": "Bogota DC",
                             "country": "CO",
                             "postalCode": "000000",
                             "phone": "7563126"
                          }
                       },
                       "creditCard": {
                          "number": "4097440000000004",
                          "securityCode": "321",
                          "expirationDate": "2017/12",
                          "name": "REJECTED"
                       },
                       "extraParameters": {
                          "INSTALLMENTS_NUMBER": 1
                       },
                       "type": "AUTHORIZATION_AND_CAPTURE",
                       "paymentMethod": "VISA",
                       "paymentCountry": "CO",
                       "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
                       "ipAddress": "127.0.0.1",
                       "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
                       "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
                    },
                    "test": false
                 }
              }, function(error, response, body) {
                res.send(body);
              });
        
        
        });


        router.get('/sendefectypay', function (req, res) {
            var f=new Date();
            f.setDate(f.getDate() + 8);                        
            var fTemp=f.getFullYear()+''+f.getMonth()+''+f.getDate()+''+f.getHours()+''+f.getMinutes()+''+f.getSeconds();
            console.log(fTemp);
            var signature=md5("bCM9tus76HXDhQSX4CH75m7mKR~679475~"+fTemp+"~9000~COP");            
            
                  request({
                    uri: "https://api.payulatam.com/payments-api/4.0/service.cgi",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    json:{
                        "language": "es",
                        "command": "SUBMIT_TRANSACTION",
                        "merchant": {
                            "apiLogin": "Zo3D7f1CxBIo2O3",
                            "apiKey": "bCM9tus76HXDhQSX4CH75m7mKR"
                        },
                        "transaction": {
                           "order": {
                              "accountId": "",
                              "referenceCode": fTemp,
                              "description": "payment test",
                              "language": "es",
                              "signature": signature,
                              "notifyUrl": "http://www.test.com/confirmation",
                              "additionalValues": {
                                 "TX_VALUE": {
                                    "value": 10000,
                                    "currency": "COP"
                              },
                                 "TX_TAX": {
                                    "value": 0,
                                    "currency": "COP"
                              },
                                 "TX_TAX_RETURN_BASE": {
                                    "value": 0,
                                    "currency": "COP"
                              }
                              }, 
                              "buyer": {
                                 "fullName": "First name and last name",
                                 "emailAddress": "buyer_test@test.com"
                              }
                           },
                           "type": "AUTHORIZATION_AND_CAPTURE",
                           "paymentMethod": "EFECTY",
                           "expirationDate": f,
                           "paymentCountry": "CO",
                           "ipAddress": "127.0.0.1"
                        },
                        "test": false
                     }
                  }, function(error, response, body) {
                    res.send(body);
                  });
            
            
            });

module.exports = router;


