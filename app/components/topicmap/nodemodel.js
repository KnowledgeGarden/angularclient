/**
 * Created by park on 7/24/2015.
 * NodeModel provides an API for creation of topic map nodes (topics)
 * FROM BacksideServlet definitions
     //Verbs
     public static final String
         //GET
         GET_TOPIC				= "GetTopic",
         PUT_TOPIC				= "PutTopic",
         //POST
         REMOVE_TOPIC			= "RemTopic",
         //followed by cargo withspecs for the topic,
         //e.g. Locator = some value or not present, meaning needs locator
         // SuperType or ParentType, lavel, description, language, IsPrivate
         NEW_INSTANCE_TOPIC		= "NewInstance",
         NEW_SUBCLASS_TOPIC		= "NewSub";
     //attributes
     public static final String
         TOPIC_LOCATOR 		= "Locator",
         SUPERTYPE_LOCATOR	= "SType",
         PARENT_LOCATOR		= "PType",
         TOPIC_LABEL			= "Label",
         TOPIC_DETAILS		= "Details",
         //2-character code, e.g. "en"
         LANGUAGE			= "Lang",
         //nodes get images
         LARGE_IMAGE_PATH	= "LiP",
         SMALL_IMAGE_PATH	= "SiP",
         // "t" or "f" case insensitive
         IS_PRIVATE			= "IsPvt";
    BacksideServlet will use the UserLocator from Credentials for the node's creator.
    That is based on this assumption:
        <em>Only authenticated users can post any new content</em>
 */
'use strict';
var NodeModel;
NodeModel = function() {
    var self = this;

    self.init = function() {
        console.log("NodeModel.init");
        return "Howdy";
    };

    console.log("Hello from NodeModel "+self);
    /**
     * Return a simple Node
     * @param locator can be <code>null</code>
     * @param creatorId
     * @param label  can be <code>null</code>
     * @param details can be <code>null</code>
     * @param language if <code>null</code>, defaults to "en"
     * @param largeImagePath, e.g. "/images/bookmark.png"
     * @param smallImagePath, e.g. "/images/bookmark_sm.png"
     * @param isPrivate one of 't' or 'f'  (could be 'T'or 'F')
     * @return
     */
    self.newNode = function(locator, creatorId, label, details, language,
                            largeImagePath, smallImagePath, isPrivate) {
        var result = {};
        if (locator !== null) {
            result.Locator = locator;
        }
        result.uName = creatorId;
        if (null !== language) {
            result.Lang = language;
        } else {
            result.Lang = "en";
        }
        if (null !== label) {
            result.Label = label;
        }
        if (null != details) {
            result.Details = details;
        }
        if (null !== largeImagePath) {
            result.LiP = largeImagePath;
        } else {
            result.LiP = "";
        }
        if (null !== smallImagePath) {
            result.SiP = smallImagePath;
        } else {
            result.SiP = "";
        }
        result.IsPvt = isPrivate;
        return result;
    };

    /**
     * Return a JSONObject as a shell for a new instance node for the topicmap.
     * @param locator
     * @param typeLocator
     * @param creatorId
     * @param label
     * @param details
     * @param language
     * @param largeImagePath
     * @param smallImagePath
     * @param isPrivate
     */
    self.newInstanceNode = function(locator, typeLocator, creatorId, label, details, language,
                                    largeImagePath, smallImagePath, isPrivate) {
        var result = self.newNode(locator, creatorId, label, details, language,
            largeImagePath, smallImagePath, isPrivate);
        result.SType = typeLocator;
        return result;
    };

    self.newSubclassNode = function(locator, parentLocator, creatorId, label, details, language,
                                    largeImagePath, smallImagePath, isPrivate) {
        var result = self.newNode(locator, creatorId, label, details, language,
            largeImagePath, smallImagePath, isPrivate);
        result.PType = parentLocator;
        return result;
    };

};

var myNodeModel = null;
angular.module('NodeProvider',[])
    .service('nodeprovider', function() {
        console.log("NodeModelling "+myNodeModel);
        if (myNodeModel === null) {
            myNodeModel = new NodeModel();
            console.log("NodeModelling2 "+myNodeModel);
        }
        return myNodeModel;
    });
