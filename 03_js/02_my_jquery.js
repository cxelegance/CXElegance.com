// *****
// CXElegance.com
//
// VERSION: 1.5.3; 2013-04-27
//	- transitional, working toward complete overhaul
//
// DEPENDENCIES:
//	+ jQuery (1.6.4)
//	+ jQueryUI (1.8.16) (for effects())
//
// *****

// *****
// TODO list / Milestones
//    SKIP AHEAD TO Version 2.0
//
//	- Version 1.5.4:
//		- clean up what's left of old div scrolling, mousewheeling, etc. (HTML, CSS, JavaScript)
//		- replace page #'s with real text page names (and see if any detail names are too generic)
//		- details display
//			- if not visible, don't waste time animating a close/hide before showing (as per request)
//			- after showing details, recalc the page heights
//				- recalc again after hiding details
//				- now, or future version, this page height equalization feature needs to be overhauled
//			- handle possible issue of duplicate ID's from copying detail contents into display
//			- when it closes, set the window URL... to current page
//			- it won't appear if you load a page with detail deeper than first page (e.g. load a portfolio page with detail)
//			- it won't appear if page number has wrapped around (browse past end and it wraps around to beginning)
//			- look at callback or event trigger for when animations are complete
//				- we want to always be offering a callback up the calling chain/stack
//				- when we initiate from within, i.e. user can't provide callback, then shall we trigger event announcing commpletion?
//			- CSS the border of display depending on page; colors are not distinct in some cases (e.g. portfolio 1)
//	- Version 1.5.5:
//		- rethink how page acts on smaller screenwidths; rethink fluid layout
//		 	- fix portfolio image width discrepancy (chrome firefox)
//		 	- on super narrow pages, fix portfolio images and title extending past, causing scrollbar
//		 	- when confident with narrow page / fluid handling, restore the viewport meta tag
//		 	- hiding/showing of elements for varying page width
//		- consider removing jQueryUI, currently being used for method: effect() (for scaling the size of elements on page resize)
//		 	- stop scalable things shrinking to nothing on IPhone
//		 		- or get rid of scaling, because also buggy on Android 2.2
//		 		- or use the jQuery throttle/debounce (plugin?) code to possibly resolve this
//		- fix bug: sometimes browser needs a resize to spur proper width space calculations
//			- e.g. sometimes text on right of portfolio images is below images, even though there is space
//			- now is maybe time to overhaul this feature?
//		- fix bug: Chrome won't put Testimonials side-by-side but Firefox does...
//	- Version 1.5.6:
//		- rethink fixed topdock... better way?
//		 	- could just have this at the top of every "page", eliminating the need for fixation
//		- rethink HTML (and CSS)
//			- wherever div and span are used, can we use a more specific/accurate tag/element?
//				- the answer will often be yes, so do so
//		 	- replace CSS nth-childs with more specific selectors
//			- be more precise and efficient with CSS selectors
//			- look for and clean orphaned CSS; re-org CSS in nice LESS categorization/grouping
//	- Version 1.5.7:
//		- remove legacy code, replace with separate entities:
//			- elements that disappear/reappear depending on page width
//			- page height equalizations... part of main page scrolling / detail viewing plugin?
//			- row width/spacer calculators
//	- Version 1.5.8:
//		- consider minifying css/js/html (it's being sent compressed now, which is good)
//		- w3c validate css/jscript/HTML
//		- load bg and img images after page is ready and shown
//		- testing:
//		 	- unit: QUnit
//		 	- also JSlint
//
// *****

/*
 * Milestones for Version 2.0
 *
 *    - Version 2.0.4:
 *       - revisit the original colour schemes and be sure they're implemented correctly in the current
 *         three pages
 *
 *    - Version 2.0.5:
 *       - general refactoring
 *       	- rid of jQuery plugin that was made for page scrolling
 *       	- rid of "CXEPage", but then recreate the namespace for any public-facing methods or props required
 *       	- rid of orphaned or excess CSS
 *       	- rid of orphaned or excess JS
 *       	- rid of orphaned resources
 *       - move 03_js/02_my_jquery.js to 03_js/cxe.js
 *       - move 03_js/03_changelog.js to /changelog.txt|md or RESEARCH BEST PRACTICES for changelog
 *          - https://keepachangelog.com/en/1.0.0/
 *       - if continuing to use LESS, then compile it and serve compiled
 *       - serve all text resources (JS, CSS) minified
 *
 *    - Version 2.0.6:
 *       - create a random colour scheme for the pages
 *          - adjacent pages always contrast each other nicely
 *          - text, links, and borders within are thematically predetermined
 *          - each time the page loads, you get a random page order
 */

$(function () { // on document load/ready

	$('body').CXEpage ({ // watch for event 'detailComplete.CXEpage'; it announces when detail (show/hide) animations are complete
		scrollSpeed: 700, // page scroll animation speed
		detailSpeed: 700, // detail show/hide animation speed
		pages: $('.page'), // where all pages are kept
		details: $('.detail'), // where all details are kept; ENSURE NO ID's are in here because there will be duplication issues
		detailDivClass: $('.detail_display'), // where all detail display containers are; you can stylize in CSS; look for 'CXEpage' namespaced html that is generated
		scrollBody: $('body, html') // this probably shouldn't be an option
	});

	$( ".linky" ). click ( function (event) { // TODO: should be an event listener within the CXEpage jQuery plugin
		event.preventDefault ();
		$('body').CXEpage ('goTo', {
			page: { // I dunno if this is a page link or a detail link
				URL: $(this).attr ('href').substr (1)
			},
			detail: {
				URL: $(this).attr ('href').substr (1)
			}//,
			//callback: function () {console.log ('linky was actioned');}
		});
	});

	$( ".linkyhome" ). click ( function (event) { // TODO: should be an event listener within the CXEpage jQuery plugin
		event.preventDefault ();
		$('body').CXEpage ('goTo', {
			page: { // I dunno if this is a page link or a detail link
				num: 0
			},
			detail: {
				URL: $(this).attr ('href').substr (1)
			}//,
		});
	});

	$( "#next" ).click ( function (event) { // TODO: should be an event listener within the CXEpage jQuery plugin
		event.preventDefault ();
		$('body').CXEpage ('nextPage', {
		});
	});

	$( "#back" ).click ( function (event) { // TODO: should be an event listener within the CXEpage jQuery plugin
		event.preventDefault ();
		$('body').CXEpage ('prevPage', {
		});
	});

	$( "#popup_up" ).mouseup( function () {
	});

	$( "#popup_up" ).mousedown( function () {
		var selected = $( "#popup_content" );
		$( this ).data( "scrollTop", selected.scrollTop() );
		$.CXEpage.methods.scroll_popup( "#popup_up" , -$.CXEpage.env.g_popup_scroll_amt );
		$( this ).data( "scrollTop", selected.scrollTop() );
		$.CXEpage.env.g_scrollID = self.setInterval( "$.CXEpage.methods.scroll_popup( '#popup_up' , -" + $.CXEpage.env.g_popup_scroll_amt.toString() + " )" , $.CXEpage.env.g_popup_scroll_int );
	});

	$( "#popup_down" ).mouseup( function () {
	});

	$( "#popup_down" ).mousedown( function () {
		var selected = $( "#popup_content" );
		$( this ).data( "scrollTop", selected.scrollTop() );
		$.CXEpage.methods.scroll_popup( "#popup_up" , $.CXEpage.env.g_popup_scroll_amt );
		$( this ).data( "scrollTop", selected.scrollTop() );
		$.CXEpage.env.g_scrollID = self.setInterval( "$.CXEpage.methods.scroll_popup( '#popup_down' , " + $.CXEpage.env.g_popup_scroll_amt.toString() + " )" , $.CXEpage.env.g_popup_scroll_int );
	});

	$( window ).scroll( function () {
		if ( $.CXEpage.env.g_popup_visible ) {
			$( "#popup_content" ).scrollTop( $( this ).scrollTop() );
		}
	});

	$( "#popup_next" ).click ( function () {
		$.CXEpage.methods.shift_detail( 1 );
	});

	$( "#popup_back" ).click ( function () {
		$.CXEpage.methods.shift_detail( -1 );
	});

	$( "#popup_close" ).click ( function (e) {
		// Prevent a page reload when a link is pressed
		e.preventDefault();
		// Call the scroll function
		$.CXEpage.methods.follow_link ( "page" + $.CXEpage.env.g_current_page.toString() );
	});

});

// *****
// modular arithmetic: http://javascript.about.com/od/problemsolving/a/modulobug.htm
//
// *****

Number.prototype.mod = function (n) {
	return ((this % n) + n) % n;
};

// *****
// a jQuery plugin-styled solution for handling URL routing, page scrolling, and detail showing
//
//	I realize this is a bit silly - a jQuery plugin - because really you would only use this plugin for one
//	element in any page - most likely the 'body'. However, it's an exercise that I enjoyed coding.  So there.
//
// *****

(function ($) { // a jQuery plugin for page scrolling

	'use strict';

	var methods, env, defaults;

	env = { // _init needs this, however you should refer to that/this.CXE.env
		currentPage: 0,
		pageMap: [],
		detailMap: [],
		detailPageMap: []
	};

	defaults = { // _init needs this, however you should refer to that/this.CXE.env
		scrollSpeed: 700, // page scroll animation speed
		detailSpeed: 700, // detail show/hide animation speed
		pages: $('.page'), // where all pages are kept
		details: $('.detail'), // where all details are kept; ENSURE NO ID's are in here because there will be duplication issues
		detailDivClass: $('.detail_display'), // where all detail display containers are; you can stylize in CSS; look for 'CXEpage' namespaced html that is generated
		scrollBody: $('body, html') // this probably shouldn't be an option
	};

	methods = {
		internal: {
			_init: function (options) {
				return this.each (function () {
					var that = $(this), settings = {};
					that.CXE = {}; // namespacing
					// process options
					$.extend (settings, defaults, options);
					$.extend (that.CXE, {env: env});
					$.extend (that.CXE.env, settings);
					// get all pages and number them (0 to n), we assume page ID's are unique
					that.CXE.env.pages.each (function (i, page) {
						that.CXE.env.pageMap.push ($(page).attr ('id'));
					});
					// get all details and number them (0 to n), we assume detail ID's are unique
					that.CXE.env.details.each (function (i, detail) {
						var page = $.inArray ($(detail).parents (that.CXE.env.pages.selector).attr ('id'), that.CXE.env.pageMap);
						that.CXE.env.detailMap.push ($(detail).attr ('id'));
						that.CXE.env.detailPageMap.push (page); // assume page > -1 because assume details are inside page div
					});
					// init the current page
					that.CXE.env.currentPage = 0;
					// write env before looking at URL and scrolling
					methods.internal._putEnv.apply (that, []);
					// scroll to page as per initial URL
					methods.external.goTo.apply (that, [{
						page: { // we don't know if the URL is for a page or a detail
							URL: methods.internal._getURL ()
						},
						detail: {
							URL: methods.internal._getURL ()
						}
					}]);
				});
			},
			_scrollTo: function (id, callback) { // id has no # in front of it

			},
			_showDetail: function (id, callback) { // id has no # in front of it
				// it is assumed we are on correct page
				var	helpers,
					that = this, // please call this internal method with .apply (this, [id, callback])
					detail = $('#' + this.CXE.env.pageMap[this.CXE.env.currentPage] + ' ' + this.CXE.env.detailDivClass.selector);

				// helper methods:
				helpers = {
					showDetail: function (id, callback) {
						detail.html (
							'\n' +
							'	<div class="CXEpage_detail">' + '\n' +
							'		<div class="topdock">' + '\n' +
							'			<a href="" onclick="$(\'body\').CXEpage (\'hideDetail\'); return false;" class="close">&gt;&lt;</a>' + '\n' + // TODO: make the close button text customizable
							'		</div>' + '\n' +
							'		<div class="inner">' + '\n' +
							'			<div class="title">' + id + '</div>' + '\n' +
							'			<div class="hr"></div>' + '\n' +
							'			<div class="content">' + $('#' + id).html () + '</div>' + '\n'  +
							'		</div>' + '\n' +
							'	</div>' + '\n'
						);
						detail.animate (
							{height: 'show'},
							this.CXE.env.detailSpeed,
							callback
						);
					}
				};
				// hide first, then show
				methods.internal._hideDetail.apply (this, [function () {
					helpers.showDetail.apply (that, [id, function () {
						callback ();
						methods.internal._putEnv.apply (that, []);
					}]);
				}]);
			},
			_hideDetail: function (callback) {
				var	that = this, // please call this internal method with .apply (this, [callback])
					detail = $(this.CXE.env.detailDivClass.selector); // all of them
				detail.animate (
					{height: 'hide'},
					this.CXE.env.detailSpeed
				).promise ().done (function () {
					callback ();
					methods.internal._putEnv.apply (that, []);
				}); // because detail may have multiple elements to do
			},
			_getURL: function () {
				return window.location.hash.substr (1);
			},
			_setURL: function (hash) {
				// expects hash to be a string without the leading '#'
				window.location.hash = "#" + hash;
			},
			_putEnv: function () { // let's restrict writing of Env to just internal methods
				this.data ('CXEenv', this.CXE.env); // please call this internal method with .apply (this, [])
			},
			_getEnv: function () {
				this.CXE = {env: {}}; // please call this internal method with .apply (this, [])
				$.extend (this.CXE.env, this.data ('CXEenv'));
			}
		},
		external: {
			nextPage: function (options) {
				return this.each (function () {
					var that = $(this);
					methods.internal._getEnv.apply (that, []);
					methods.external.goTo.apply (that, [{
						page: {
							num: that.CXE.env.currentPage + 1
						},
						callback: options && options.callback ? options.callback : function () {} // TODO is callback a function?
					}]);
				});
			},
			prevPage: function (options) {
				return this.each (function () {
					var that = $(this);
					methods.internal._getEnv.apply (that, []);
					methods.external.goTo.apply (that, [{
						page: {
							num: that.CXE.env.currentPage - 1
						},
						callback: options && options.callback ? options.callback : function () {} // TODO is callback a function?
					}]);
				});
			},
			showDetail: function (options) {
				return this.each (function () {
					var that = $(this);
					if (options && options.detail & options.detail.URL) methods.external.goTo.apply (that, [{
						detail: {
							URL: options.detail.URL
						},
						callback: options.callback ? options.callback : function () {} // TODO is callback a function?
					}]);
				});
			},
			hideDetail: function (options) {
				return this.each (function () {
					var that = $(this);
					var fnCallback = function(){
						if(typeof options == 'object' && options !== null && typeof options.callback == 'function'){
							options.callback();
						}
						methods.internal._setURL ('page' + (that.CXE.env.currentPage + 1));
					};
					methods.internal._getEnv.apply (that, []);
					methods.internal._hideDetail.apply (that, [fnCallback]);
				});
			},
			goTo: function (options) {
				//
				// options: { // example
				//	page: {
				//		num: 3,
				//		URL: 'contact'
				// 	},
				//	detail: {
				//		num: 4,
				//		URL: 'testimonial1'
				//	},
				//	callback: function () {}
				// } // TODO: type checking on options for a public function
				return this.each (function () {
					var URL, index, intMethods, that = $(this);
					methods.internal._getEnv.apply (that, []);

					intMethods = {
						handlePage: function (options) {
							var defaultIndex;
							if (options && options.page) {
								if (options.page.URL) {
									index = $.inArray (options.page.URL, that.CXE.env.pageMap);
									defaultIndex = that.CXE.env.detailPageMap[that.CXE.env.detailMap.indexOf(options.page.URL)];
									methods.internal._scrollTo.apply (that, [
										index > -1 ? options.page.URL : that.CXE.env.pageMap[defaultIndex],
										function () {
											that.CXE.env.currentPage = index > -1 ? index : defaultIndex;
											index > -1 ? methods.internal._setURL (options.page.URL) : (function () {}) ();
											if (options.detail) intMethods.handleDetail (options.detail, options.callback ? options.callback : function () {}); // TODO is callback a function?
											else options.callback ? options.callback () : (function () {}) (); // TODO is callback a function?
										}
									]);
								}
								else if (options.page.num === 0 || options.page.num) methods.internal._scrollTo.apply (that, [
									(function (index, array) {
										index = index.mod (array.length);
										URL = array[index];
										return URL;
									}) (options.page.num, that.CXE.env.pageMap),
									function () {
										that.CXE.env.currentPage = options.page.num;
										methods.internal._setURL (URL);
										if (options.detail) intMethods.handleDetail (options.detail, options.callback ? options.callback : function () {}); // TODO is callback a function?
										else options.callback ? options.callback () : (function () {}) (); // TODO is callback a function?
									}
								]);
								// else do nothing
							} else if (options && options.detail) intMethods.handleDetail (options.detail, options.callback ? options.callback : function () {});
							// else do nothing
						},
						handleDetail: function (detail, callback) {
							if (detail && detail.URL) {
								index = $.inArray (detail.URL, that.CXE.env.detailMap);
								if (index > -1 && that.CXE.env.detailPageMap[index] == that.CXE.env.currentPage) { // no point showing the details if we're on the wrong page
									methods.internal._showDetail.apply (that, [
										that.CXE.env.detailMap[index],
										function () {
											methods.internal._setURL (detail.URL);
											callback ();
										}
									]);
								} // else do nothing
							} else if (detail && (detail.num === 0 || detail.num)) {
								if (that.CXE.env.detailPageMap[detail.num] == that.CXE.env.currentPage) { // no point showing the details if we're on the wrong page
									methods.internal._showDetail (that, [
										(function (index, array) {
											index = index.mod (array.length);
											URL = array[index];
											return URL;
										}) (detail.num, that.CXE.env.detailMap),
										function () {
											methods.internal._setURL (URL);
											callback ();
										}
									]);
								} // else do nothing
							} // else do nothing
						}
					};

					// hide any details, then route for page, and route for detail as callback
					methods.internal._hideDetail.apply (that, [function () {
						intMethods.handlePage (options ? options : {});
					}]);
				});
			}
		}
	};

// ***** function controller

	$.fn.CXEpage = function (method) { // CXE is the namespace for this "plugin"
		if (methods.external[method]) return methods.external[method].apply (this, Array.prototype.slice.call (arguments, 1));
		else if (typeof method === 'object' || !method) return methods.internal._init.apply (this, arguments);
		else $.error ('Method ' +  method + ' does not exist on jQuery.CXEpage');
	};

}) (jQuery);

// *****
// CXEpage: namespacing for legacy (and embarrassing) functions and global variables
//
//	- there's nothing elegant about this section; that's why it's legacy and being orphaned
//		- quickly turning them into methods and properties; the JavaScript way
//	* these methods and properties are to be overhauled so don't spend too much time here
//
// *****

(function ($) { // Let's be good and secure our nice $ namespace
	'use strict';
	$.CXEpage = { // introducing our legacy namespace

		env: {
			// customizable by me/you
			g_viewport_width_min: 640, // min width pixels, we change what's visible when <= this value
			g_viewport_height_extra: 100, // how many extra pixels would you like in the height of the pages, beyond max viewport height or max content height?
			g_page_scroll_speed: 1200, // what speed should JQuery animate the page scroll?
			g_popup_content_area_border_width: 4, // pixels; static, set same as in CSS
			g_popup_topdock_height: 50, // pixels; static, set same as in CSS
			g_popup_content_height_adjustor: 82, // how many pixels to subtract to get bottom margin right, keeping in mind margins and paddings
			g_popup_toggle_speed: 750, // what speed should JQuery animate the popup appear/disappear?
			g_scaling_adjustor: 0.22, // when scalable items are scaled down, we have an adjustor amount due to the content area being a percentage of the body
			g_popup_scroll_amt: 25, // amount of pixels to jump each interval
			g_popup_scroll_int: 50, // number of milliseconds per interval
			g_make_sure_scrollbar: 2, // how many pix to make sure there's a scrollbar when popup is up; browsers acting funny if no scrollbar
			g_guiding_links_frequency: 4000, // number of milliseconds per interval
			g_guiding_links_speed: 2000, // number of milliseconds to complete animation
			g_guiding_link_color: "#FFBF66",
			g_website_title_base: "CXElegance",
			//g_mousewheel_speed: 30, // a number for multiplying the amount of mousewheel movement there is

			// initializations only
			g_viewport_width: 0, // this will get set properly on document ready
			g_viewport_height: 0, // this will get set properly on document ready
			g_viewport_height_min: 0, // this will be set on document ready, it is the value of the tallest page
			g_hidden: false, // are the hideable elements hidden?
			g_popup_left: 0, // will be set properly on resize and doc ready
			g_popup_content_area_width: 0, // will be set on resize and doc ready
			g_popup_content_area_height: 0, // will be set on resize and doc ready
			g_current_URL_place: "!", // will be set on page load
			g_current_page: 1, // starting point, page1
			g_current_detail: 0, // starting point, detail 0, i.e. not looking at a detail
			g_popup_visible: false, // the modal popup, is it visible?
			g_scrollID: 0, // for popup scrolling
			g_animateID: 0, // for animated link
			___end___: 0 // just a dummy ending so I can copy and paste commas above
		},

		methods: {

			animate_guiding_links: function () {
				$( "#next,#back,a.linky" ).animate ( { backgroundColor : $.CXEpage.env.g_guiding_link_color } , $.CXEpage.env.g_guiding_links_speed , function () {
					$( "#next,#back,a.linky" ).removeAttr ( "style" ).animate ();
				 });
			},

			cancel_window_timer: function ( timer ) {
				timer = window.clearInterval ( timer );
			},

			hide_other_pages: function ( bool_hide ) {
				if ( bool_hide ) {
					$( ".page" ).toggleClass( "hidden" );
					$( "#page" + $.CXEpage.env.g_current_page.toString() ).toggleClass ( "hidden" );
					$( ".page" ).toggleClass( "overflow_hidden" );
					$.CXEpage.methods.set_page_heights ( false );
				}
				else {
					$( "#page" + $.CXEpage.env.g_current_page.toString() ).toggleClass ( "hidden" );
					$( ".page" ).toggleClass( "hidden" );
					$( ".page" ).toggleClass( "overflow_hidden" );
					$.CXEpage.methods.set_page_heights ( true );
				}
			},

			scroll_popup: function ( button , amount ) {

			},

			toggle_popup_visible: function () {
				if ( $.CXEpage.env.g_popup_visible ) {
					$( "#modal_screen" ).fadeOut( $.CXEpage.env.g_popup_toggle_speed );
					$( "#popup" ).fadeOut( $.CXEpage.env.g_popup_toggle_speed );
					$.CXEpage.methods.hide_other_pages( false );
				}
				else {
					$( "#popup" ).fadeIn( $.CXEpage.env.g_popup_toggle_speed );
					$( "#modal_screen" ).fadeIn( $.CXEpage.env.g_popup_toggle_speed );
					$.CXEpage.methods.hide_other_pages( true );
				}
				$.CXEpage.env.g_popup_visible = !$.CXEpage.env.g_popup_visible;
				$( "#popup" ).toggleClass( "hidden" );
				$( "#modal_screen" ).toggleClass( "hidden" );
			},

			shift_detail: function ( adj ) {
				// adj should be + or - 1
				var potential = "detail_" + ($.CXEpage.env.g_current_detail + adj).toString();
				if ( $( "#details_page" + $.CXEpage.env.g_current_page.toString() + " ." + potential ).length ) {
					$.CXEpage.methods.follow_link ( $( "#details_page" + $.CXEpage.env.g_current_page.toString() + " ." + potential + ">.detail" ).attr( "id" ) );
				}
			},

			shift_page: function ( adj ) {
				// adj should be + or - 1
				var potential = "page" + ($.CXEpage.env.g_current_page + adj).toString();
				if ( $ ( "#" + potential ).length ) {
					$.CXEpage.methods.follow_link ( potential );
				}
			},

			mark_position: function ( page, detail ) {
				// make sure these are integer values!
				$.CXEpage.env.g_current_detail = detail;
				$.CXEpage.env.g_current_page = page;
			},

			follow_link: function ( id ) {
				// expects text to be string that we can browse to, like a hash ID without '#'
				$.CXEpage.methods.set_URL_place ( id );
				$.CXEpage.methods.goto_URL_place ();
				$.CXEpage.methods.change_location_hash ( id );
			},

			change_location_hash: function ( hash ) {
				// expects hash to be a string without the leading '#'
				window.location.hash = "#" + hash;
			},

			goto_URL_place: function () {
				var page_title = $.CXEpage.env.g_website_title_base;
				if ( $.CXEpage.env.g_current_URL_place == "" ) {
					if ( $.CXEpage.env.g_popup_visible ) {
						$.CXEpage.methods.toggle_popup_visible ();
					}
					$.CXEpage.methods.mark_position ( 1 , 0 );
					page_title += " - Welcome";
					$.CXEpage.methods.scroll_to_id ( "page1" );
				}
				else if ( $.CXEpage.env.g_current_URL_place.substring( 0 , 4 ) == "page" ) {
					$.CXEpage.methods.mark_position ( parseInt( $.CXEpage.env.g_current_URL_place.substr( 4 ) ) , 0 );
					if ( $.CXEpage.env.g_popup_visible ) {
						$.CXEpage.methods.toggle_popup_visible ();
					}
					$.CXEpage.methods.scroll_to_id ( $.CXEpage.env.g_current_URL_place );
					page_title += " - " + $.CXEpage.env.g_current_URL_place;
				}
				else {
					// determine what page and scroll to it
						// find the div named "<name>"
						// it's parent div is called "details_page<num>"
					var id = $( "#" + $.CXEpage.env.g_current_URL_place ).parent().parent().attr ( "id" );
					var index = id.lastIndexOf( "_" ) + 1;
					var detail_id = $( "#" + $.CXEpage.env.g_current_URL_place ).parent().attr ( "class" );
					detail_id = detail_id.substr( 7 );
					id = id.substr( index );
					$.CXEpage.methods.scroll_to_id ( id );
					$.CXEpage.methods.mark_position ( id.substr( 4 ) , parseInt( detail_id ) );

					// load the modal popup contents
					$( "#popup_content" ).html( $( "#" + $.CXEpage.env.g_current_URL_place ).html() );
					if ( !$.CXEpage.env.g_popup_visible ) {
						$.CXEpage.methods.toggle_popup_visible ();
					}
					$.CXEpage.methods.set_page_heights ( false );
					page_title += " - " + $.CXEpage.env.g_current_URL_place;
				}
				// change the page title
				$( "head>title" ).html( page_title );
				// change the popup guide text, which is just the page_title
				$( "#popup_content_guide_text>span" ).html( $.CXEpage.env.g_current_URL_place );
			},

			set_URL_place: function ( id ) {
				$.CXEpage.env.g_current_URL_place = id;
			},

			initial_URL_place: function () {
				$.CXEpage.env.g_current_URL_place = window.location.hash;
				$.CXEpage.env.g_current_URL_place = $.CXEpage.env.g_current_URL_place.substr( 1 ); // get rid of the leading '#'
			},

			set_viewport_dimensions: function () {
				$.CXEpage.env.g_viewport_width = $( window ).width();
				$.CXEpage.env.g_viewport_height = $( window ).height();
			},

			viewport_size_changed: function () {
				$.CXEpage.methods.set_viewport_dimensions ();

				// to hide, or not to hide things
				if ( $.CXEpage.env.g_viewport_width <= $.CXEpage.env.g_viewport_width_min ) {
					$( ".hideable" ).addClass ("hidden");
					$( "#popup" ).removeClass ("halfwidth");
					$( "#popup" ).addClass ("fullwidth");
					$( "#popup" ).removeClass ("popup_minwidth");
					$.CXEpage.env.g_hidden = true;
				} else {
					$( ".hideable" ).removeClass ("hidden");
					$( "#popup" ).removeClass ("fullwidth");
					$( "#popup" ).addClass ("halfwidth");
					$( "#popup" ).addClass ("popup_minwidth");
					$.CXEpage.env.g_hidden = false;
				}

				// the testimonials page needs a bit of help, we want content boxes to be same width, unless we are hiding things
				if ( !$.CXEpage.env.g_hidden ) {
					var maxwidth = 0;
					$ ( "#page2 .row_content" ).each ( function () {
						maxwidth = Math.max ( maxwidth , $( this ).width() );
					});
					$ ( "#page2 .row_content" ).each ( function () {
						$( this ).width ( maxwidth );
					});
				}
				else {
					$ ( "#page2 .row_content" ).each ( function () {
						$( this ).width ( 'auto' );
					});
				}

				// set width of spacers in rows
				if ( !$.CXEpage.env.g_hidden ) {
					$ ( ".row" ).each ( function (i) {
						var content_width_total = 0; // this will accumulate in the following code
						var row_width = $ ( this ).innerWidth();
						var content_counter = 0; // this is a counter accumulating +1
						var space_betweens = 4; // a pixel guess of the space between two inline blocks, depends on browser?
						var misc_adjustor = 1; // do you want to reduce the spacer width any more pixels?
						var this_row_id = $ ( this ).attr ( "id" );
						var spacer_counter = $( "#" + this_row_id + " .row_spacer").length;

						$ ( "#" + this_row_id + " .row_content" ).each ( function () {
							content_width_total = content_width_total + $( this ).outerWidth( true );
							content_counter = content_counter + 1;
						});

						var spacer_width = ( row_width - content_width_total ) / spacer_counter;
						spacer_width -= 0.5; // we want to round down, not round up
						spacer_width = Math.round ( spacer_width );

						// experiencing annoying width discrepencies in JQuery
						// only an issue if there are less spacers than contents
						spacer_width -= ( 2 * space_betweens );
						if ( spacer_counter < content_counter ) {
							spacer_width -= misc_adjustor;
						}

						$ ( "#" + this_row_id + " .row_spacer" ).outerWidth ( spacer_width );
					});
				}

				// set height of bottom spacers for pages
				if ( $.CXEpage.env.g_popup_visible ) {
					$.CXEpage.methods.set_page_heights ( false );
				}
				else {
					$.CXEpage.methods.set_page_heights ( true );
				}

				// set "popup" left position
				$.CXEpage.methods.popup_left_set ();

				// set "popup_content_area" height and width
				$.CXEpage.env.g_popup_content_area_width = $ ( "#popup" ).width() - ( 2 * $.CXEpage.env.g_popup_content_area_border_width );
				$.CXEpage.env.g_popup_content_area_height = $.CXEpage.env.g_viewport_height - $.CXEpage.env.g_popup_topdock_height - ( 2 * $.CXEpage.env.g_popup_content_area_border_width );
				$ ( "#popup_content_area" ).width ( $.CXEpage.env.g_popup_content_area_width );
				$ ( "#popup_content_area" ).height ( $.CXEpage.env.g_popup_content_area_height );
				// one of these isn't working on fresh loads, so just use a general adjust below:  $( "#popup_content_guide_text" ).outerHeight( true ) - $( "popup_content_guide_hr" ).outerHeight( true )
				$ ( "#popup_content" ).height ( $.CXEpage.env.g_popup_content_area_height - ( 2 * $.CXEpage.env.g_popup_content_area_border_width ) - $.CXEpage.env.g_popup_content_height_adjustor );

			},

			set_page_heights: function ( bool_on ) {

			},

			popup_left_set: function () {
			},

			scroll_to_id: function ( id ) {
			}
		}
	};
}) (jQuery);