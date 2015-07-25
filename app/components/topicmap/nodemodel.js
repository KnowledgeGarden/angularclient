/**
 * Created by park on 7/24/2015.
 * NodeModel provides an API for creation of topic map nodes (topics)
 */
var NodeModel;
NodeModel = function() {

};

var myModel = null;
angular.module('NodeProvider',[])
    .service('nodeprovider', function() {
        if (myModel === null) {
            myModel = new NodeModel();
        }
        return myModel;
    });
