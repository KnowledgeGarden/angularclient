/**
 * Created by park on 8/6/2015.
 * These constants are used by BacksideServlet
 */
'use strict';
var Constants;
Constants = function() {
    var self = this;
    //VERBS
    self.ADD_FEATURES_TO_TOPIC	= "AddFeatures"; //topicmap
        //NOTE: AddFeatures can handle TAG_NAMES_PROP and URL_PROP
        //TODO add more features to BacksideServlet for that
    self.GET_TOPIC				= "GetTopic"; //topicmap
    self.PUT_TOPIC				= "PutTopic"; //topicmap
    self.REMOVE_TOPIC			= "RemTopic"; //topicmap
    self.NEW_INSTANCE_TOPIC		= "NewInstance"; //topicmap
    self.NEW_SUBCLASS_TOPIC		= "NewSub"; //topicmap
    self.NEW_USER		        = "NewUser"; //userapp
    self.LIST_INSTANCE_TOPICS	= "ListInstances"; //topicmap
    self.LIST_USERS		        = "ListUsers"; //topicmap & userapp
    self.GET_USER		        = "GetUser"; // userapp
    //NODE PROPERTIES
    self.CREATORID_PROP         = "crtr";
    self.DETAILS_PROP           = "details";
    self.INSTANCE_OF_PROP		= "inOf";
    self.IS_PRIVATE_PROP		= "isPrv"; // takes 't' or 'f' case insensitive
    self.LABEL_PROP             = "label";
    self.LANGUAGE_PROP			= "Lang";
    self.LARGE_IMAGE_PROP		= "lIco";
    self.SMALL_IMAGE_PROP		= "sIco";
    self.LOCATOR_PROP           = "lox";
    self.SUBCLASS_OF_PROP		= "sbOf";
    self.TAG_NAMES_PROP			= "TagNames";  //takes an array [name, name, name]
    self.URL_PROP               = "url";
    //NODE TYPES
    self.BOOKMARK_NODE_TYPE     = "BookmarkNodeType";
    self.CHALLENGE_TYPE 		= "ChallengeNodeType";
    self.ISSUE_TYPE				= "IssueNodeType";
    self.EVIDENCE_TYPE			= "EvidenceNodeType";
    self.CLAIM_TYPE				= "ClaimNodeType";
    self.RESOURCE_TYPE			= "ResourceNodeType";
    self.GUILD_TYPE				= "GuildNodeType";
    self.QUEST_TYPE				= "QuestNodeType";
    self.AVATAR_TYPE			= "AvatarNodeType";
    self.TAG_TYPE				= "TagNodeType";
    self.THEME_TYPE				= "ThemeNodeType";
    self.PRO_TYPE				= "ProNodeType";
    self.CON_TYPE				= "ConNodeType";
    self.SOLUTION_TYPE			= "SolutionNodeType";
    self.POSITION_TYPE			= "PositionNodeType";
    self.CONVERSATION_MAP_TYPE	= "ConversationMapNodeType";
    self.ONTOLOGY_NODE_TYPE		= "OntologyNodeType";
    self.GRAPH_NODE_TYPE		= "GraphNodeType";
    //RELATIONS
    self.DOCUMENT_CREATOR_RELN       = "DocumentCreatorRelationType";
    self.TAG_BOOKMARK_RELN      = "TagDocumentRelationType";
    //IMAGES
    self.CLASS_ICON			= "/images/cogwheel.png";
    self.CLASS_ICON_SM		= "/images/cogwheel_sm.png";
    self.RELATION_ICON		= "/images/cogwheels.png";
    self.RELATION_ICON_SM	= "/images/cogwheels_sm.png";
    self.PROPERTY_ICON		= "/images/snowflake.png";
    self.PROPERTY_ICON_SM	= "/images/snowflake_sm.png";
    self.PERSON_ICON			= "/images/person.png";
    self.PERSON_ICON_SM		= "/images/person_sm.png";
    self.GROUP_ICON			= "/images/group.png";
    self.GROUP_ICON_SM		= "/images/group.png";
    self.ISSUE				= "/images/ibis/issue.png";
    self.ISSUE_SM			= "/images/ibis/issue_sm.png";
    self.POSITION			= "/images/ibis/position.png";
    self.POSITION_SM		 	= "/images/ibis/position_sm.png";
    self.CLAIM				= "/images/ibis/claim.png";
    self.CLAIM_SM			= "/images/ibis/claim_sm.png";
    self.REFERENCE			= "/images/ibis/reference.png";
    self.REFERENCE_SM		= "/images/ibis/reference_sm.png";
    self.PRO					= "/images/ibis/plus.png";
    self.PRO_SM				= "/images/ibis/plus_sm.png";
    self.CON					= "/images/ibis/minus.png";
    self.CON_SM				= "/images/ibis/minus_sm.png";
    self.MAP					= "/images/ibis/map.png";
    self.MAP_SM				= "/images/ibis/map_sm.png";
    self.CHALLENGE			= "/images/ibis/challenge.png";
    self.CHALLENGE_SM		= "/images/ibis/challenge_sm.png";
    self.SOLUTION			= "/images/ibis/decision.png";
    self.SOLUTION_SM			= "/images/ibis/decision_sm.png";
    self.PROJECT				= "/images/project.png";
    self.PROJECT_SM			= "/images/project_sm.png";
    self.ONTOLOGY			= "/images/ontology.png";
    self.ONTOLOGY_SM			= "/images/ontology_sm.png";
    self.PUBLICATION			= "/images/publication.png";
    self.PUBLICATION_SM		= "/images/publication_sm.png";
    self.LITERATURE_ANALYSIS	= "/images/literature-analysis.png";
    self.LITERATURE_ANALYSIS_SM	= "/images/literature-analysis_sm.png";
    self.ORGANIZATION			= "/images/organization.png";
    self.ORGANIZATION_SM			= "/images/organization_sm.png";

    self.BOOKMARK			= "/images/bookmark.png";
    self.BOOKMARK_SM	 		= "/images/bookmark_sm.png";
    self.TAG					= "/images/tag.png";
    self.TAG_SM		 		= "/images/tag_sm.png";
    self.THEME				= "/images/theme.png";
    self.THEME_SM			= "/images/theme_sm.png";
    self.LINK				= "/images/link.png";
    self.LINK_SM				= "/images/link_sm.png";
};

var myConstants = null;

angular.module('ConstantsProvider',[])
    .service('constantsprovider', function() {
        console.log("Constantly "+myConstants);
        if (myConstants === null) {
            myConstants = new Constants();
            console.log("Constantly2 "+myConstants);
        }
        return myConstants;
    });