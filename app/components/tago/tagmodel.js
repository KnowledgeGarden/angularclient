/**
 * Created by park on 7/28/2015.
 */
'use strict';
var TagModel;

TagModel = function() {
    var self = this;

    console.log("TagModel");
};

var myTagModel = null;

angular.module('TagProvider',[])
    .service('tagprovider', function() {
        console.log("TagModelling "+myTagModel);
        if (myTagModel === null) {
            myTagModel = new TagModel();
            console.log("TagModelling2 "+myTagModel);
        }
        return myTagModel;
    });
