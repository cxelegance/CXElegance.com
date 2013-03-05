<?php
    include ($_SERVER['DOCUMENT_ROOT'] . "/compress.php");
?>

// JQuery and Javascript code by CXElegance.com

// the following global vars are just initializations
var g_viewport_width = 0; // this will get set properly on document ready
var g_viewport_height = 0; // this will get set properly on document ready
var g_viewport_height_min = 0; // this will be set on document ready, it is the value of the tallest page
var g_hidden = false; // are the hideable elements hidden?
var g_popup_left = 0; // will be set properly on resize and doc ready
var g_popup_content_area_width = 0; // will be set on resize and doc ready
var g_popup_content_area_height = 0; // will be set on resize and doc ready
var g_current_URL_place = "!"; // will be set on page load
var g_current_page = 1; // starting point, page1
var g_current_detail = 0; // starting point, detail 0, i.e. not looking at a detail
var g_popup_visible = false; // the modal popup, is it visible?
var g_scrollID = 0; // for popup scrolling
var g_animateID = 0; // for animated link

// the following global vars are customizable here
var g_viewport_width_min = 640; // min width pixels, we change what's visible when <= this value
var g_viewport_height_extra = 100; // how many extra pixels would you like in the height of the pages, beyond max viewport height or max content height?
var g_page_scroll_speed = 1200; // what speed should JQuery animate the page scroll?
var g_popup_content_area_border_width = 4; // pixels; static, set same as in CSS
var g_popup_topdock_height = 50; // pixels; static, set same as in CSS
var g_popup_content_height_adjustor = 82; // how many pixels to subtract to get bottom margin right, keeping in mind margins and paddings
var g_popup_toggle_speed = 750; // what speed should JQuery animate the popup appear/disappear?
var g_scaling_adjustor = 0.22; // when scalable items are scaled down, we have an adjustor amount due to the content area being a percentage of the body
var g_popup_scroll_amt = 25; // amount of pixels to jump each interval
var g_popup_scroll_int = 50; // number of milliseconds per interval
var g_make_sure_scrollbar = 2; // how many pix to make sure there's a scrollbar when popup is up; browsers acting funny if no scrollbar
var g_guiding_links_frequency = 4000; // number of milliseconds per interval
var g_guiding_links_speed = 2000; // number of milliseconds to complete animation
var g_guiding_link_color = "#FFBF66";
var g_website_title_base = "CXElegance";
//var g_mousewheel_speed = 30; // a number for multiplying the amount of mousewheel movement there is

$( document ).ready( function () {

	$( ".always_hidden" ).addClass( "hidden" );

	g_animateID = self.setInterval( "animate_guiding_links ()" , g_guiding_links_frequency );

	// our first page load is similar to a page resize
		viewport_size_changed ();
		initial_URL_place ();
		goto_URL_place ();

	$( window ).resize( function() {
		viewport_size_changed ();
		goto_URL_place ();
	});

	$( ".linky" ). click ( function () {
		cancel_window_timer ( g_animateID );
		// strip the "linky##_" from the link
		// then go to the link
		follow_link ( $( this ).attr( "id" ).substr( 8 ) );
	});

	$( "#next" ).click ( function () { 
		cancel_window_timer ( g_animateID );
		shift_page( 1 );
	});

	$( "#back" ).click ( function () {
		cancel_window_timer ( g_animateID );
		shift_page( -1 );
	});

	$( "#popup_up" ).mouseup( function () {
		cancel_window_timer ( g_scrollID );
	});

	$( "#popup_up" ).mousedown( function () {
		var selected = $( "#popup_content" );
		$( this ).data( "scrollTop", selected.scrollTop() );
		scroll_popup( "#popup_up" , -g_popup_scroll_amt );
		$( this ).data( "scrollTop", selected.scrollTop() );
		g_scrollID = self.setInterval( "scroll_popup( '#popup_up' , -" + g_popup_scroll_amt.toString() + " )" , g_popup_scroll_int );
	});

	$( "#popup_down" ).mouseup( function () {
		cancel_window_timer ( g_scrollID );
	});

	$( "#popup_down" ).mousedown( function () {
		var selected = $( "#popup_content" );
		$( this ).data( "scrollTop", selected.scrollTop() );
		scroll_popup( "#popup_up" , g_popup_scroll_amt );
		$( this ).data( "scrollTop", selected.scrollTop() );
		g_scrollID = self.setInterval( "scroll_popup( '#popup_down' , " + g_popup_scroll_amt.toString() + " )" , g_popup_scroll_int );
	});

	$( window ).scroll( function () {
		if ( g_popup_visible ) {
			$( "#popup_content" ).scrollTop( $( this ).scrollTop() );
		}
	});

	$( "#popup_next" ).click ( function () {
		shift_detail( 1 );
	});

	$( "#popup_back" ).click ( function () {
		shift_detail( -1 );
	});

	$( "#popup_close" ).click ( function (e) { 
		// Prevent a page reload when a link is pressed
		e.preventDefault(); 
		// Call the scroll function
		follow_link ( "page" + g_current_page.toString() );
	});

});

function animate_guiding_links () {
	$( "#next,#back,#linky00_creative" ).animate ( { backgroundColor : g_guiding_link_color } , g_guiding_links_speed , function () {
		$( "#next,#back,#linky00_creative" ).removeAttr ( "style" ).animate ();
	 });
};

function cancel_window_timer ( timer ) {
	timer = window.clearInterval ( timer );
};

function hide_other_pages ( bool_hide ) {
	if ( bool_hide ) {
		$( ".page" ).toggleClass( "hidden" );
		$( "#page" + g_current_page.toString() ).toggleClass ( "hidden" );
		$( ".page" ).toggleClass( "overflow_hidden" );
		set_page_heights ( false );
	}
	else {
		$( "#page" + g_current_page.toString() ).toggleClass ( "hidden" );
		$( ".page" ).toggleClass( "hidden" );
		$( ".page" ).toggleClass( "overflow_hidden" );
		set_page_heights ( true );
	}
};

function scroll_popup ( button , amount ) {
	var selected = $( "#popup_content" );
	button = $( button );
	selected.scrollTop( button.data( "scrollTop" ) + amount );
	button.data( "scrollTop", selected.scrollTop() );
};

function toggle_popup_visible () {
	if ( g_popup_visible ) {
		$( "#modal_screen" ).fadeOut( g_popup_toggle_speed );
		$( "#popup" ).fadeOut( g_popup_toggle_speed );
		hide_other_pages( false );
	}
	else {
		$( "#popup" ).fadeIn( g_popup_toggle_speed );
		$( "#modal_screen" ).fadeIn( g_popup_toggle_speed );
		hide_other_pages( true );
	}
	g_popup_visible = !g_popup_visible;
	$( "#popup" ).toggleClass( "hidden" );
	$( "#modal_screen" ).toggleClass( "hidden" );
};

function shift_detail ( adj ) {
	// adj should be + or - 1
	var potential = "detail_" + (g_current_detail + adj).toString();
	if ( $( "#details_page" + g_current_page.toString() + " ." + potential ).length ) {
		follow_link ( $( "#details_page" + g_current_page.toString() + " ." + potential + ">.detail" ).attr( "id" ) );
	}
};

function shift_page ( adj ) {
	// adj should be + or - 1
	var potential = "page" + (g_current_page + adj).toString();
	if ( $ ( "#" + potential ).length ) {
		follow_link ( potential );
	}
};

function mark_position ( page, detail ) {
	// make sure these are integer values!
	g_current_detail = detail;
	g_current_page = page;
};

function follow_link ( id ) {
	// expects text to be string that we can browse to, like a hash ID without '#'
	set_URL_place ( id );
	goto_URL_place ();
	change_location_hash ( id );
};

function change_location_hash ( hash ) {
	// expects hash to be a string without the leading '#'
	window.location.hash = "#" + hash;
};

function goto_URL_place () {
	var page_title = g_website_title_base;
	if ( g_current_URL_place == "" ) {
		if ( g_popup_visible ) {
			toggle_popup_visible ();
		}
		mark_position ( 1 , 0 );
		page_title += " - Welcome";
		scroll_to_id ( "page1" );
	}
	else if ( g_current_URL_place.substring( 0 , 4 ) == "page" ) {
		mark_position ( parseInt( g_current_URL_place.substr( 4 ) ) , 0 );
		if ( g_popup_visible ) {
			toggle_popup_visible ();
		}
		scroll_to_id ( g_current_URL_place );
		page_title += " - " + g_current_URL_place;
	}
	else {
		// determine what page and scroll to it
			// find the div named "<name>"
			// it's parent div is called "details_page<num>"
		var id = $( "#" + g_current_URL_place ).parent().parent().attr ( "id" );
		var index = id.lastIndexOf( "_" ) + 1;
		var detail_id = $( "#" + g_current_URL_place ).parent().attr ( "class" );
		detail_id = detail_id.substr( 7 );
		id = id.substr( index );
		scroll_to_id ( id );
		mark_position ( id.substr( 4 ) , parseInt( detail_id ) );

		// load the modal popup contents
		$( "#popup_content" ).html( $( "#" + g_current_URL_place ).html() );
		// $( "#popup_title" ).html( g_current_URL_place ); // got rid of this, having a home link now
		if ( !g_popup_visible ) {
			toggle_popup_visible ();
		}
		set_page_heights ( false );
		page_title += " - " + g_current_URL_place;
	}
	// change the page title
	$( "head>title" ).html( page_title );
	// change the popup guide text, which is just the page_title
	$( "#popup_content_guide_text>span" ).html( g_current_URL_place );
};

function set_URL_place ( id ) {
	g_current_URL_place = id;
};

function initial_URL_place () {
	g_current_URL_place = window.location.hash;
	g_current_URL_place = g_current_URL_place.substr( 1 ); // get rid of the leading '#'
};

function set_viewport_dimensions () {
	g_viewport_width = $( window ).width();
	g_viewport_height = $( window ).height();
};

function viewport_size_changed () {
	set_viewport_dimensions ();

	// to hide, or not to hide things
	if ( g_viewport_width <= g_viewport_width_min ) {
		$( ".hideable" ).addClass ("hidden");
		$( "#popup" ).removeClass ("halfwidth");
		$( "#popup" ).addClass ("fullwidth");
		$( "#popup" ).removeClass ("popup_minwidth");
		g_hidden = true;
	} else {
		$( ".hideable" ).removeClass ("hidden");
		$( "#popup" ).removeClass ("fullwidth");
		$( "#popup" ).addClass ("halfwidth");
		$( "#popup" ).addClass ("popup_minwidth");
		g_hidden = false;
	}

	// the testimonials page needs a bit of help, we want content boxes to be same width, unless we are hiding things
	if ( !g_hidden ) {
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
	if ( !g_hidden ) {
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
	if ( g_popup_visible ) {
		set_page_heights ( false );
	}
	else {
		set_page_heights ( true );
	}

	// set "popup" left position
	popup_left_set ();

	// set "popup_content_area" height and width
	g_popup_content_area_width = $ ( "#popup" ).width() - ( 2 * g_popup_content_area_border_width );
	g_popup_content_area_height = g_viewport_height - g_popup_topdock_height - ( 2 * g_popup_content_area_border_width );
	$ ( "#popup_content_area" ).width ( g_popup_content_area_width );
	$ ( "#popup_content_area" ).height ( g_popup_content_area_height );
	// one of these isn't working on fresh loads, so just use a general adjust below:  $( "#popup_content_guide_text" ).outerHeight( true ) - $( "popup_content_guide_hr" ).outerHeight( true )
	$ ( "#popup_content" ).height ( g_popup_content_area_height - ( 2 * g_popup_content_area_border_width ) - g_popup_content_height_adjustor );

	// scale down the scalable items
	$( ".scalable" ).each ( function () {
		if ( g_hidden ) {
			$( this ).removeAttr( "style" ).effect ();
			var element_width = $( this ).width();
			var new_width = ( ( ( g_viewport_width * ( 1 - g_scaling_adjustor ) ) / element_width ) * 100 ) - 0.5;
			if ( new_width < 100 ) {
				new_width = Math.round( new_width );
				$( this ).effect( "scale" , { percent: new_width , scale: 'both' } , 250 );
			}
		}
		else {
			$( this ).removeAttr( "style" ).effect ();
		}
	});

};

function set_page_heights ( bool_on ) {
	$ ( ".page" ).each ( function (i) {
		$ ( this ).height( 'auto' ); // needed to determine natural height
		g_viewport_height_min = Math.max ( $ ( this ).height() , g_viewport_height_min );
	});
	if ( bool_on ) {
		// we want the height of all pages to be the same, max height
		$ ( ".page" ).height ( Math.max ( g_viewport_height_min , g_viewport_height + g_viewport_height_extra ) );
	}
	else {
		// we want the page height to be the height of the viewport
		// $ ( ".page" ).height ( Math.max ( g_viewport_height_min , g_viewport_height ) );
		// $ ( ".page" ).height ( g_viewport_height + g_make_sure_scrollbar );
		$ ( ".page" ).height ( Math.max ( $ ( "#popup_content" )[0].scrollHeight + ( 2 * g_popup_content_area_border_width ) + g_popup_topdock_height + g_popup_content_height_adjustor , g_viewport_height + g_make_sure_scrollbar ) );
	}
}

function popup_left_set () {
	g_popup_left = Math.round ( ( g_viewport_width - $ ( "#popup" ).width() ) / 2 );
	// $( "#popup" ).offset ( { top: 0, left: g_popup_left } ); // annoying me!!
	$( "#popup" ).css( "left" , g_popup_left.toString() + "px" );
};

function scroll_to_id ( id ) {
	// expects id to be missing the # - it should just be the name of the ID in a string
	$( "html,body" ).animate ( { scrollTop: $( "#" + id ).offset().top } , g_page_scroll_speed );
};
