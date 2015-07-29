# TopicMap#
A topic map is a container for *topics*, each, technically like a *node* in a *graph*. A topic is a container for all that is knowable and representable about a **particular subject**. Operations we can perform on a topic map are these:<br/>

- Create a topic node, as either an *instance* of another topic, or as a *sub-class* of another topic. For example, it's possible to create an instance topic for the particular shoes you are wearing; if your shoes are of type *Nike*, then, assuming there is a topic for *Nike Shoes*, your new topic would be an instance of that topic. If the topic is, say, a new (to the topic map) bookmark of a particular web page, then that, too, would be a topic which is an instance of the BookmarkNodeType. On the other hand, if the topic is a new (to the topic map) kind of bacterial infection, then that topic would be a sub-class of a class, say, for bacterial infection type.

- Edit an existing topic, a process which is controlled by *role-based access control rules*. In general, you are free to edit any topic you create, but not those created by others. That general rule is modified in the case where the system provides the ability of a topic owner to assign editorial rights to others, typically groups. A user with *Admin* credentials can edit the work of others.

- Relate topics to each other, a process which allows users to create relations between two topics. These relations are drawn from a pre-defined list of relation types. In general, site policy does not permit creation of new relation types.

Applications are created to facilitate the application of these use cases to specific classes of activity,such as social bookmarking, blogging, wiki topics, and others.

## Topic Nodes ##
Internally, a topic is a JSON object which takes this form when we create a new topic:

{<br/>
    "Locator": "AngTestClass2",<br/>
    "uName": "jackpark",<br/>
    "Lang": "en",<br/>
    "Label": "My test topic",<br/>
    "Details": "Created to test the AngularApp code",<br/>
    "LiP": "/images/cogwheel.png",<br/>
    "SiP": "/images/cogwheel.sm.png",<br/>
    "IsPvt": "F",<br/>
    "SType": "ClassType"<br/>
}<br/><br/>

When the topic map receives that form and processes it, a full topic node is returned, which looks like this:

{<br/>
    "crDt": "2015-07-25T18:54:17-07:00",<br/>
    "trCl": [<br/>
        "ClassType"<br/>
    ],<br/>
    "crtr": "jackpark",<br/>
    "lox": "AngTestClass2",<br/>
    "sIco": "/images/cogwheel.sm.png",<br/>
    "isPrv": "false",<br/>
    "_ver": "1437875657385",<br/>
    "lEdDt": "2015-07-25T18:54:17-07:00",<br/>
    "details": [<br/>
        "Created to test the AngularApp code"<br/>
    ],<br/>
    "label": [<br/>
        "My test topic"<br/>
    ],<br/>
    "lIco": "/images/cogwheel.png",<br/>
    "inOf": "ClassType"<br/>
}<br/><br/>
  

## TopicMap API ##
Note: work very much still in progress<br/>

**Topic Creation** <br/>

- **submitNewInstanceTopic** allows for the creation of a new instance topic. The signature of this function requires several items:

  - **locator**  which is the unique database identifier for the new topic. It can, in fact, be *null*, which means that the topic map will assign a value to it.

  - **typeLocator**  which is the locator for the topic for which this new topic is to be an instance. Knowledge of available types will be found in topic map documentation elsewhere.

  - **userId**  which is a value supplied by the system ($scope._userId) for authenticated users.

  - **label**  each topic can have a label. In fact, it can have many labels, some being synonyms, some being in different languages (e.g. 'en', 'fr', 'es'). If no label exists (a very rare case), one submits an empty string "" instead.

  - **details**  each topic can have one or more descriptive paragraphs, called details. They can be in other languages as well. If no details are available, one submits an empty string "" instead.

  - **language**  the two character language code, e.g. 'en'

  - **largeImagePath**  an icon path based on icons found in the /images directory. Icons have a name, eg. bookmark.png, so the largeImagePath for that would be "/images/bookmark.png"

  - **smallImagepath** an icon path like largeImagePath, but small icons look like this: bookmark_sm.png.

  - **isPrivate**  a boolean, e.g. true or false, where false means the topic is public. Most all topics are public.

  - **userIP**  which is a value captured by this system and available as a global variable $scope._userIP

  - **sToken**  which is a session token returned by BacksideServlet when a user authenticates. It is available as a global variable $scope.sToken

  - responseFunction  the callback function, the signature of which is (err, result)

- **submitNewSubclassTopic** which is just like submitNewInstanceTopic with one exception: *parentLocator* replaces *typeLocator*, where parentLocator is the locator for the desired super-class.

**Relate Topics**<br/>
Still to be developed.

**General**<br/>
Many more functions to be added.

- **getTopic**  a way to fetch a topic, with these signature items:
  - **locator**  which is the unique database identifier for the new topic. It can, in fact, be *null*, which means that the topic map will assign a value to it.
  - **userId**  which is a value supplied by the system ($scope._userId) for authenticated users.
  - **userIP**  which is a value captured by this system and available as a global variable $scope._userIP

  - **sToken**  which is a session token returned by BacksideServlet when a user authenticates. It is available as a global variable $scope.sToken

  - responseFunction  the callback function, the signature of which is (err, result)

- **putTopic**  a way to save a topic. Typically, one uses updateTopic, described next.

- **updateTopic**  a way to store a topic which has been edited The important point to note is that each topic has a *version* number; the topic map will check versions, and can issue an **OptimisticLockException** message. This function will update the version number before shipping the topic off to BacksideServlet. Its signature is the same as putTopic:

  - jsonTopic  the JSON object which is the topic

  - **userId**  which is a value supplied by the system ($scope._userId) for authenticated users.
  - **userIP**  which is a value captured by this system and available as a global variable $scope._userIP

  - **sToken**  which is a session token returned by BacksideServlet when a user authenticates. It is available as a global variable $scope.sToken

  - responseFunction  the callback function, the signature of which is (err, result)

- **listUsers**  is a way to list those topics which are of type *UserType* -- topics which represent users with accounts at the portal. The signature looks like this:

  - start  the offset into a potentially long list of users

  - count  how many to fetch

  - **userId**  which is a value supplied by the system ($scope._userId) for authenticated users.
  - **userIP**  which is a value captured by this system and available as a global variable $scope._userIP

  - **sToken**  which is a session token returned by BacksideServlet when a user authenticates. It is available as a global variable $scope.sToken
