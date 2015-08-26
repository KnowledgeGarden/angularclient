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
    var constants = null,
        self = this;

    self.init = function(constantsprovider) {
        console.log("NodeModel.init");
        if (constants !== null) {
            constants = constantsprovider;
        }
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
            result.lox = locator;
        }
        console.log(locator+" | "+JSON.stringify(result));
        result.crtr = creatorId;
        if (null !== language) {
            result.Lang = language;
        } else {
            result.Lang = "en";
        }
        if (null !== label) {
            result.label = label;
        }
        console.log(locator+" | "+JSON.stringify(result));
        if (null != details) {
            result.details = details;
        }
        if (null !== largeImagePath) {
            result.lIco = largeImagePath;
        } else {
            result.lIco = "";
        }
        console.log(locator+" | "+JSON.stringify(result));
        if (null !== smallImagePath) {
            result.sIco = smallImagePath;
        } else {
            result.sIco = "";
        }
        result.isPrv = isPrivate;
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
        result.inOf = typeLocator;
        console.log("NEWINST "+JSON.stringify(result));
        return result;
    };

    self.newSubclassNode = function(locator, parentLocator, creatorId, label, details, language,
                                    largeImagePath, smallImagePath, isPrivate) {
        var result = self.newNode(locator, creatorId, label, details, language,
            largeImagePath, smallImagePath, isPrivate);
        result.sbOf = parentLocator;
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
