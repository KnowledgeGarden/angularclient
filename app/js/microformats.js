/**
 * Created by Admin on 6/2/2015.
 */
/** a clone of the microformats used in BacksideServlet.
 These are necessary for defining verbs, and attributes of JSON
 objects sent over the wire.
 */

/**
 * General credentials
 * ICredentialsMicroformats.java
 */
//JSON Attributes
/** absolutely required field */
module.exports.USER_NAME	    = "uName";
/** required for authentication */
module.exports.USER_EMAIL	    = "uEmail";
/** password is encrypted, is only required for authentication */
module.exports.USER_PWD	        = "uPwd";
/** Required once individual is logged in; returned by RESP_TOKEN */
module.exports.SESSION_TOKEN	= "sToken";
//response token attributes
module.exports.RESP_TOKEN		= "rToken";
module.exports.RESP_MESSAGE	    = "rMsg";
//core command attributes
module.exports.VERB			    = "verb";
/** encapsulate a list of verb/cargo pairs */
module.exports.SEQUENCE_VERB	= "sequence"; //experimental
module.exports.MODIFIERS		= "mods"; // likely unused
module.exports.CARGO			= "cargo";
//common query modifiers
module.exports.ITEM_FROM		= "from";
module.exports.ITEM_COUNT		= "count";
module.exports.ITEM_SORT		= "sort"; //probably not used
module.exports.DATE_INC_SORT	= "DateIncSort";
module.exports.DATE_DEC_SORT	= "DateDecSort";
module.exports.ALPHA_INC_SORT	= "AlphaIncSort";
module.exports.ALPHA_DEC_SORT	= "AlphaDecSort";
//common verbs -- likely never used
module.exports.V_GET			= "get";
module.exports.V_PUT			= "put";
module.exports.V_DELETE		    = "del";
module.exports.V_FIND			= "find";

/**
 * Admin App IAdminMicroformat.java
 */
module.exports.REMOVE_USER		= "RemUser";  //POST
module.exports.UPDATE_USER_ROLE	= "UpdUsRol"; //POST
module.exports.UPDATE_USER_EMAIL= "UpdUsEma"; //POST
/** subject to common modifiers */
module.exports.LIST_USERS		= "ListUsers";	//GET


/**
 * Auth App IAuthMicroformat.java
 */
module.exports.AUTHENTICATE	    = "Auth"; 	//POST
module.exports.LOGOUT			= "LogOut"; //POST


/**
 * User App IUserMicroformat.java
 */
//JSON attributes
module.exports.USER_ROLE 		= "uRole";
module.exports.USER_AVATAR		= "uAvatar";
module.exports.USER_GEOLOC		= "uGeoloc";
module.exports.USER_HOMEPAGE	= "uHomepage";
/** starts a list of USER_PROPERTY objects */
module.exports.USER_PROPERTIES	= "uProplist";
module.exports.USER_PROPERTY 	= "uProp";
module.exports.PROP_KEY		    = "pKey";
module.exports.PROP_VAL		    = "pVal";
/** list of usernames, possibly empty */
module.exports.USER_LIST		= "uList";
//Verbs
module.exports.NEW_USER		    = "NewUser"; 	//POST
/** subject to common modifiers */
module.exports.LIST_USERS		= "ListUsers"; 	//GET
