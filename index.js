/**
 * File: index
 *
 * Created: December 21, 2018
 */


/* Dependencies */

let util = require( './util' );
let application = require( './app' );
let http = require( 'http' );


/**
 * Event listener for HTTP server "error" event.
 */

function onError( error ) {
  if ( error.syscall !== 'listen' ) {
    throw error;
  }
  
  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  
  // handle specific listen errors with friendly messages
  switch ( error.code ) {
    case 'EACCES':
      util.error( bind + ' requires elevated privileges' );
      process.exit( 1 );
      break;
    case 'EADDRINUSE':
      util.error( bind + ' is already in use' );
      process.exit( 1 );
      break;
    default:
      throw error;
  }
}


/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let address = server.address();
  let bind = typeof address === 'string'
    ? 'pipe ' + address
    : 'port ' + address.port;
  util.log( 'Listening on ' + bind );
}


/* Configure application */

util.configure();


/* Initialize express application */

let app = application();


/* Select port */

const port = util.args.port || '3000';
app.set( 'port', port );


/* Create HTTP server and listen on provided port */

let server = http.createServer( app );
server.listen( port );
server.on( 'error', onError );
server.on( 'listening', onListening );