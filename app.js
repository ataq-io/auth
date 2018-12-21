/**
 * File: app
 *
 * Created: December 21, 2018
 */


/* Dependencies */

let express = require( 'express' );
let route = require( './routes/route' );
let morgan = require( 'morgan' );
let util = require( './util' );
let fs = require( 'fs' );


module.exports = function () {
  
  /* Create express application */
  
  let app = express();
  
  
  /* Middleware */
  
  let logStream = fs.createWriteStream( util.args.logFile, { flags: 'a' } );
  app.use( morgan( 'dev' ) );
  app.use(
    morgan(
      ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]',
      { stream: logStream }
    )
  );
  
  
  /* Routes */
  
  app.use( '/', route() );
  
  
  /* Export application */
  
  return app;
};


