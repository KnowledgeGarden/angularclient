/**
 * Created by park on 7/28/2015.
 */
'use strict';
var TagModel;

TagModel = function() {
    var nodeModel = null,
        constants = null,
        self = this;

    console.log("TagModel");
    self.init = function(nodemodel, constantsprovider) {
        if (nodeModel === null) {
            nodeModel = nodemodel;
            constants = constantsprovider;
            console.log("TagModel.init "+nodeModel);
        }
    }
    self.newBookmark = function(pageTitle, userId) {
        var result = nodeModel.newInstanceNode(null, constants.BOOKMARK_NODE_TYPE, userId, pageTitle, "", "en",
                   constants.BOOKMARK, constants.BOOKMARK_SM, false);
        console.log("BKMK "+JSON.stringify(result));
        return result;
    }
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
