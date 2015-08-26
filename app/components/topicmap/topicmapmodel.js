/**
 * Created by park on 7/21/2015.
 * A model which provides a TopicMap API for other apps
 * This model is initialized in AdminApp which is the first app to fire
 * on every view. It is then available to any app which needs topic map
 * services.
 */
'use strict';
///////////////////////////////
// Network support
///////////////////////////////
/**
 * @param query
 * @param callback  signature (error, response)
 */
function doPost(query, data, configService, callback) {

    var url = configService.server.backend+query+data;
    //TODO should not be adding data to url
    // but not sure where to find it during request
    console.log("XXX "+url);
    $.ajax({
        type: 'POST',
        url: url,
        crossDomain: true,
        data: data,
        dataType: 'json',
        success: function(responseData, textStatus, jqXHR) {
            console.log("DOPOST SUCCESS");
            callback(null, responseData);
        },
        error: function (responseData, textStatus, errorThrown) {
            console.log("DOPOST ERROR");
            callback(responseData, null);
        }
    });
}

/**
 * @param query a query string
 * @param callback signature (error, response)
 */
function doGet(query, configService, callback) {
    var url = configService.server.backend+query;
    console.log("XXX "+url);
    $.ajax({
        type: 'GET',
        url: url,
        crossDomain: true,
        dataType: 'json',
        success: function(responseData, textStatus, jqXHR) {
            console.log("DOGET SUCCESS");
            callback(null, responseData);
        },
        error: function (responseData, textStatus, errorThrown) {
            console.log("DOGET ERROR");
            callback(responseData, null);
        }
    });
}

function doAltPost(query, configService, callback) {
    var url = configService.server.backend+query;
    console.log("XXX "+url);
    $.ajax({
        type: "POST",
        url: url,
        crossDomain: true,
        dataType: "json",
        success: function(responseData, textStatus, jqXHR) {
            console.log("DOALTPOST SUCCESS");
            callback(null, responseData);
        },
        error: function (responseData, textStatus, errorThrown) {
            console.log("DOALTPOST ERROR");
            callback(responseData, null);
        }
    });
}

///////////////////////////////
// TopicMapModel
///////////////////////////////

var TopicMapModel;
TopicMapModel = function () {
    var configService = null,
        constants = null,
        nodeModel = null,
        relationModel = null,
        self = this;

    console.log("TopicMapModel ");

    /**
     * Must be called on boot -- by adminapp
     */
    self.init = function (configurizer, nodeprovider, relationprovider, constantsprovider) {
        if (configService === null) {
            constants = constantsprovider;
            configService = configurizer;
            nodeModel = nodeprovider;
            nodeModel.init(constantsprovider);
            relationModel = relationprovider;
            console.log("TopicMap config " + configService + " " + nodeModel + " " + relationModel);
        }
    };

    self.getNodeModel = function () {
        return nodeModel;
    };

    self.getRelationModel = function () {
        return relationModel;
    };

    ////////////////////////////////////////
    // Query handling
    ////////////////////////////////////////
    /**
     * Create a full query where <code>cargo</code> is involved, by adding
     * a <em>cargo</em> section to <code>coreQuery</code>
     * @param coreQuery
     * @param cargo
     * @returns {*}
     */
    self.buildQuery = function(coreQuery, cargo) {
        var result = coreQuery;
        result.cargo = cargo;
        return result;
    };

    self.getCoreQuery = function(verb, userId, userIP, sToken) {
        var query = {};
        query.verb = verb;
        query.uIP = userIP;
        query.uName = userId;
        query.sToken = sToken;
        return query;
    };

    ////////////////////////////////////////
    // Topicmap handling
    ////////////////////////////////////////

    /**
     * Add features to a given node
     * @param cargo
     * @param userId
     * @param userIp
     * @param sToken
     * @param responseFunction
     */
    self.addNodeFeatures = function(cargo, userId, userIp, sToken, responseFunction) {
        var query = self.getCoreQuery(constants.ADD_FEATURES_TO_TOPIC, userId, userIP, sToken);
        query = self.buildQuery(query, cargo);
        doAltPost("tm/"+JSON.stringify(query), configService, function(err, response) {
            console.log("AddFeatures "+err);
            return responseFunction(err, response);
        });
    };

    /**
     * Fetch a list of user topics
     * @param start
     * @param count
     * @param userId
     * @param userIP
     * @param responseFunction signature( err, result)
     * returns a list of JSON objects, or an empty list
     */
    self.listUsers = function (start, count, userId, userIP, sToken, responseFunction) {
        var result = [],
            query = self.getCoreQuery(constants.LIST_USERS, userId, userIP),
            urx = 'tm/';
        query.from = '0';
        query.count = '-1';
        doGet(urx + JSON.stringify(query), configService, function (err, response) {
            console.log("ListUsers " + err + " | " + response);
            if (null !== response) {
                var cargo = response.cargo;
                console.log(JSON.stringify(cargo));
                result = cargo;
                //[{"crDt":"2015-07-23T12:48:26-07:00","trCl":["UserType"],"crtr":"SystemUser","lox":"jackpark","sIco":"/images/person_sm.png","isPrv":"false","_ver":"1437680906846",
                // "lEdDt":"2015-07-23T12:48:26-07:00","details":[""],"label":["Jack Park"],"lIco":"/images/person.png","inOf":"UserType"}]
            }
            return responseFunction(err, result);
        });
    };

    self.listInstanceTopics = function (typeLocator, start, count, userId, userIP, sToken, responseFunction) {
        var result = [],
            query = self.getCoreQuery(constants.LIST_INSTANCE_TOPICS, userId, userIP),
            urx = 'tm/';
        query.from = '0';
        query.count = '-1';
        query.inOf = typeLocator;
        doGet(urx + JSON.stringify(query), configService, function (err, response) {
            console.log("ListUsers " + err + " | " + response);
            if (null !== response) {
                var cargo = response.cargo;
                console.log(JSON.stringify(cargo));
                result = cargo;
                //[{"crDt":"2015-07-23T12:48:26-07:00","trCl":["UserType"],"crtr":"SystemUser","lox":"jackpark","sIco":"/images/person_sm.png","isPrv":"false","_ver":"1437680906846",
                // "lEdDt":"2015-07-23T12:48:26-07:00","details":[""],"label":["Jack Park"],"lIco":"/images/person.png","inOf":"UserType"}]
            }
            return responseFunction(err, result);
        });
    };

    /**
     * Return the topic as a JSON object
     * @param locator
     * @param userId
     * @param userIP
     * @param responseFunction signature (err, rersult)
     */
    self.getTopic = function(locator, userId, userIP, sToken, responseFunction) {
        var result = {},
            query = self.getCoreQuery(constants.GET_TOPIC, userId, userIP, sToken),
        urx = 'tm/';
        query.Locator = locator;
        query.uIP = userIP;
        doGet(urx + JSON.stringify(query), configService, function (err, response) {
            console.log("ListUsers " + err + " | " + response);
            if (response != null) {
                var cargo = response.cargo;
                console.log(JSON.stringify(cargo));
                result = cargo;
            }
            return responseFunction(err, result);
        });
    };

    /**
     * <p>Note:<br/>
     *  an error message can be returned which reads:<br/>
     *  <em>OptimisticLockException</em> which means that the database
     *  has seen a version of the node being stored with a higher
     *  version number. This typically means that the caller must fetch
     *  the latest version of the node and perform surgery on that one,
     *  then use <code>updateTopic</code> to change the version number</p>
     * @param jsonTopic
     * @param userId
     * @param userIP
     * @param responseFunction signature (err, result)
     */
    self.putTopic = function(jsonTopic, userId, userIP, sToken, responseFunction) {
        var query = self.getCoreQuery(constants.PUT_TOPIC, userId, userIP, sToken);
        query = self.buildQuery(query, jsonTopic);
        //TODO doPost
    };

    /**
     * Update a topic node by updating its <em>version</em> before saving
     * @param jsonTopic
     * @param userId
     * @param userIP
     * @param responseFunction signature(err, result)
     */
    self.updateTopic = function(jsonTopic, userId, userIP, sToken, responseFunction) {
        var d = new Date();
        //update the node's version
        jsonTopic._ver = d.getTime();
        self.putTopic(jsonTopic, userId, userIp, function(err, result) {
            return responseFunction(err, result);
        });
    };

    self._submitNewInstanceTopic = function(topic, userId, userIP,  sToken, responseFunction ) {
        var query = self.getCoreQuery(constants.NEW_INSTANCE_TOPIC, userId, userIP, sToken);
        query = self.buildQuery(query, topic);
        doAltPost("tm/"+JSON.stringify(query), configService, function(err, response) {
            console.log("NEWINSTANCE "+err+" | "+JSON.stringify(response));
            return responseFunction(err, response);
        });

    }
    self.submitNewInstanceTopic = function(locator, typeLocator, userId, label, details, language,
                                           largeImagePath, smallImagePath, isPrivate, userIP, sToken, responseFunction) {
        var topic = nodeModel.newInstanceNode(locator, typeLocator, userId, label, details, language,
                                                largeImagePath, smallImagePath, isPrivate);
        self._submitNewInstanceTopic(topic, userId, userIP, sToken, function(err, response) {
           return responseFunction(err, response);
        });
    };

    self._submitNewSubclassTopic = function(topic, userId, userIP, sToken, responseFunction) {
        var query = self.getCoreQuery(constants.NEW_SUBCLASS_TOPIC, userId, userIP, sToken);
        query = self.buildQuery(query, topic);
        doAltPost("tm/"+JSON.stringify(query), configService, function(err, response) {
            console.log("NEWSUB "+err+" | "+JSON.stringify(response));
            return responseFunction(err, response);
        });

    }

    self.submitNewSubclassTopic = function(locator, parentLocator, userId, label, details, language,
                                           largeImagePath, smallImagePath, isPrivate, userIP, sToken, responseFunction) {
        var topic = nodeModel.newSubclassNode(locator, parentLocator, userId, label, details, language,
            largeImagePath, smallImagePath, isPrivate);
        console.log("TMT "+JSON.stringify(topic));
        self._submitNewSubclassTopic(topic, userId, userIp, sToken, function(err, response) {
             return responseFunction(err, response);
        });
    };

};

var myModel = null;
angular.module('TopicMapProvider',[])
    .service('tmprovider', function() {
        console.log("TopicMapModelling");
        if (myModel === null) {
            myModel = new TopicMapModel();
        }
        return myModel;
    });