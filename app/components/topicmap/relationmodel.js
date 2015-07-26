/**
 * Created by park on 7/24/2015.
 * RelationModel provides an API for wiring connections (relations)
 * among topics in the topic map.
 */
var RelationModel;
RelationModel = function() {
    console.log("Hello from RelationModel");
};

var myRelationModel = null;
angular.module('RelationProvider',[])
    .service('relationprovider', function() {
        console.log("RelationModelling "+myRelationModel);
        if (myRelationModel === null) {
            myRelationModel = new RelationModel();
            console.log("RelationModelling2 "+myRelationModel);
        }
        return myRelationModel;
    });
