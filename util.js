/**
 * File: util
 *
 * Created: December 21, 2018
 */


/* Dependencies */

let minimist = require( 'minimist' );
let fs = require( 'fs' );


/* Default arguments */

const defaultArgs = {
  
  debug: false,
  port: 3000,
  
  serviceName: 'auth',
  
  logFile: 'auth' + getUnixTime() + 'LogDump.log',
  errorFile: 'auth' + getUnixTime() + 'ErrorDump.log'
  
};
module.exports.args = defaultArgs;


function getUnixTime() {
  "use strict";
  return Math.round( (new Date()).getTime() / 1000 )
}


/**
 * Logs message appropriately depending on current configuration, deployment, and environment.
 *
 * @param message Message to be logged.
 */

module.exports.log = function ( message ) {
  "use strict";
  
  /* Do nothing if no message */
  if ( message === null || message === undefined ) {
    return;
  }
  
  /* Parse message argument */
  let msg = message;
  if ( typeof( msg ) === "object" ) {
    msg = JSON.stringify( msg );
  }
  
  /* Log header */
  const nowDate = new Date();
  const nowUnixTime = Math.round( (nowDate).getTime() / 1000 );
  const header = "-----------------------------\n"
    + "---------- New Log ----------\n"
    + "-----------------------------"
    + "\nTime:"
    + "\n\t" + nowUnixTime + " (" + nowDate + ")\n";
  
  /* Retrieve stack trace */
  let stack = new Error().stack;
  stack = stack.replace( "Error", "Trace:" );
  
  msg = header + stack + "\nMessage:\n\t" + msg + "\n\n";
  
  /* Log to console if debug deployment */
  if ( module.exports.args.debug ) {
    console.log( msg );
  }
  
  /* Append log message to log file */
  fs.appendFile( module.exports.args.logFile, msg, function ( error ) {
    // Whats a few errors between friends
  } );
};


/**
 * Logs error message appropriately depending on current configuration, deployment, and environment.
 *
 * @param message Error to be logged.
 */

module.exports.error = function ( message ) {
  "use strict";
  
  /* Do nothing if no message */
  if ( message === null || message === undefined ) {
    return;
  }
  
  /* Parse message argument */
  let msg = message;
  if ( typeof( msg ) === "object" ) {
    msg = JSON.stringify( msg );
  }
  
  /* Header log */
  const nowDate = new Date();
  const nowUnixTime = Math.round( (nowDate).getTime() / 1000 );
  const header = "-------------------------------\n"
    + "---------- New Error ----------\n"
    + "-------------------------------"
    + "\nTime:"
    + "\n\t" + nowUnixTime + " (" + nowDate + ")\n";
  
  /* Retrieve stack trace */
  let stack = new Error().stack;
  stack = stack.replace( "Error", "Trace:" );
  
  msg = header + stack + "\nMessage:\n\t" + msg + "\n\n";
  
  /* Log to console if debug deployment */
  if ( module.exports.args.debug ) {
    console.error( msg );
  }
  
  /* Append error message to log file */
  fs.appendFile( module.exports.args.errorFile, msg, function ( error ) {
    // Whats a few errors between friends
  } );
};


/**
 * Reads all command line arguments and config files.
 */

module.exports.configure = function () {
  
  /* Parse application arguments */
  module.exports.args = Object.assign( module.exports.args, minimist( process.argv.slice( 2 ) ) );
  let configFile = module.exports.args[ 'configFile' ];
  
  /* If config file argument present */
  if ( configFile ) {
    let fileContents = fs.readFileSync( configFile );                       // Read contents of config file
    let configData = JSON.parse( fileContents );                            // Parse file contents as JSON data
    module.exports.args = Object.assign( module.exports.args, configData ); // Merge with any command line arguments
  }
  
  /* Clear log and error files */
  fs.unlink( module.exports.args.logFile, function ( error ) {
    // Whats a few errors between friends
  } );
  fs.unlink( module.exports.args.errorFile, function ( error ) {
    // Whats a few errors between friends
  } );
};