/**
 * File: route
 *
 * Created: December 21, 2018
 */

let express = require( 'express' );


module.exports = function () {
  "use strict";
  
  let router = express.Router();
  
  /* GET home page. */
  router.get( '/helloWorld', function ( req, res ) {
    res.send( "Hello, world!" );
  } );
  
  
  return router;
};