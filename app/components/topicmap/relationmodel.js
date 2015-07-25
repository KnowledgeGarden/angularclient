/**
 * Created by park on 7/24/2015.
 * RelationModel provides an API for wiring connections (relations)
 * among topics in the topic map.
 */
var RelationModel;
RelationModel = function() {

};

var myModel = null;
angular.module('RelationProvider',[])
    .service('relationprovider', function() {
        if (myModel === null) {
            myModel = new RelationModel();
        }
        return myModel;
    });
