# angularclient
An Angular 1+ Web Client, designed to work with BacksideServlet, a Java webservices servlet.

Right now, it is only coded to the level of user account management.

## Usage ##
This system is designed to run against [BacksideServlet](BacksideServlet "https://github.com/KnowledgeGarden/BacksideServlet"), which must be booted before starting this client. Both this client and that server speak a specific webservices API and protocol. Both projects are co-evolving together<br/><br/>
Generally speaking, package.json has a start script, which reads:

"start": "http-server -a localhost -p 8080 -c-1",

To boot the system after:
**npm update**,

**npm start**  will start it.

The start script takes the form:
"start": "http-server -a  **server** -p **port** -c-1"
Pay attention to **server** and to **port**.

**Note (20150720)**: server.js has been removed; it is not needed so long as the start script is functioning properly. Debugging the start script entails making certain the port is not already in use.

**Note (20150719)**: Very much still in development. For instance, many aspects of paths are still not solved. For instance, the system is configured (in "localhost" mode -- see /app/js/config.js) to boot localhost:8000. If one simply runs the npm "start" script (and if it works properly), the system will come up properly. When the start script fails, "node server.js" will boot the system, but then one must click on index.html to get it started. As I said, there remains much to do to get the platform running correctly.
 

Code developed with WebStorm 10+ and based on code from [Angular-Seed](Angular-Seed "https://github.com/angular/angular-seed") and from [KnAllEdge](KnAllEdge "https://github.com/mprinc/KnAllEdge")
