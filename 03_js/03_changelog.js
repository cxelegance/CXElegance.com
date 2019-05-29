/*
 * Change Log (changelog for CXElegance.com)
 *
 * VERSION: 2.0.1; 2019-05-29
 *    - corrected the resizing of "scalable" elements – specifically the main logo
 *    - switched responsive elements to flexbox
 *    - removed all click-for-more-details functionality; opted for vertical scrolling through all visible content
 *
 * VERSION: 2.0; 2019-04-23
 *    - rid of all bottom stuff: bio through toolkit
 *    - rid of top nav bar
 *    - rid of all pages except testimonials
 *    - link to github, to linkedIn
 *
 * VERSION: 1.5.3; 2013-04-27
 *    - started the changelog (this JS doc)
 *    - stopped adapting to narrow screens, for now, because features need improving to make this "nice"
 *       - for smartphones and tablets
 *    - moved TODO list into main JS/jQuery source (was in HTML)
 *    - moved all legacy and embarrassing old code into a namespaced object
 *    - added 'use strict' for my coding purposes
 *    - removed "popup" (modal, fixed, absolute)
 *       - replaced with height-growing, CSS-able content that animates in-page
 *    - removed animated window timer junk that initiates at load (flashing links)
 */

(function (whatisthis) {
	if(whatisthis === 'changelog') return true;
}) ('changelog');