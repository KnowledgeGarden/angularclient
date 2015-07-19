/**
 * Created by Park on 6/3/2015.
 * Seeking a way to make it easy to configure the system
 */
/** Cloned and edited from KnAllEdge */
'use strict';

/* Configuration */
var envs = {
    "server": {
        "needsInvite": false,
        "server": {
            "frontend": "http://www.topicquests.org:8000/",
            "backend": "http://www.topicquests.org:8080/",
            "parseResponse": true,
            "jsonPrefixed": ")]}',\n"
        }
    },
    "localhost": {
        "needsInvite": true,
        "server": {
            "frontend": "http://localhost:8000/app",
            "backend": "http://localhost:8080/",
            "parseResponse": true,
            "jsonPrefixed": ")]}',\n"
        }
    },
    "json": {
        "server": {
            "frontend": "http://localhost:8000/app",
            "backend": "http://localhost:8080/",
            "parseResponse": false
        }
    }
};

//select the environment
// var env = envs.json;
var env = envs.localhost;
// var env = envs.server;

angular.module('Configurizer',[])
    .service('configService', function() {
        return env;
    });