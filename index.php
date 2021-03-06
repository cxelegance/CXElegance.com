<?php
//check phpinfo() for what env vars are available
$isHTTPS = isset($_SERVER['HTTP_X_FORWARDED_PROTO']);
$isHTTPS = $isHTTPS && strtolower($_SERVER['HTTP_X_FORWARDED_PROTO']) == 'https';
?>

<!DOCTYPE HTML>
<html>

<head>
	<meta charset="UTF-8">
	<!-- Welcome to CXElegance.com, this code is being developed still;
	please see my jQuery code (below) for TODO list
	please find link to changelog below, as well -->

	<meta name="description" content="Web development and technical services, including data organization, websites, content management, and application development.">
	<meta name="keywords" content="jQuery, PHP, OOP, HTML, CSS, XML, Git, website, webpage, JavaScript, backups, data, organization, architecture, CMS, content, management, technical, freelance, services">
	<meta name="author" content="Jesse CXElegance">

	<!-- ensure smartphones don't try to zoom in automatically, and disable scaling so Android 2.2 and others work with fixed div -->
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"> -->
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- offer a nice smartphone icon - 158 × 158 pixels -->
	<link rel="apple-touch-icon" href="01_pics/12_iphone.png">

	<!-- load my google fonts -->
	<link href="<?= ($isHTTPS ? 'https' : 'http'); ?>://fonts.googleapis.com/css?family=Yanone+Kaffeesatz|Oswald|Lobster" rel="stylesheet" type="text/css">

	<!-- favicon -->
	<link rel="icon" href="favicon.png" sizes="16x16" type="image/png">

	<!-- load the jQuery code -->
	<!-- I am having difficulty getting compression on my site for jQuery and jQueryUI, and maybe LESS -->
	<!-- <style type="text/css">@import "http://code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css";</style><!-- <style type="text/css">@import "00_jquery/css/custom-theme/jquery-ui-1.8.16.custom.css";</style> -->
	<script type="text/javascript" src="03_js/jquery-1.6.4.min.js"></script>
	<script type="text/javascript" src="03_js/jquery-ui-1.8.16.custom.min.js"></script>
	<!-- <script type="text/javascript" src="00_jquery/JScrollPane/jquery.mousewheel.js"></script> -->

	<!-- load my custom jQuery/JavaScript code -->
	<script type="text/javascript" src="03_js/02_my_jquery.js"></script>

	<!-- load my changelog, this is for you if you are a developer and are reading this -->
	<script type="text/javascript" src="03_js/03_changelog.js"></script>

	<!-- load my custom CSS LESS -->
	<link rel="stylesheet/less" type="text/css" href="02_css/03_my.css" title="main">

	<!-- import my exceptions/conditional css -->
	<style type="text/css">
		@import "02_css/08_c-css.php";
	</style>

	<!-- alternate stylesheet, blank/simple -->
	<link rel="alternate stylesheet" type="text/css" href="02_css/13_rescue.css" title="help">

	<!-- load LESS JavaScript code -->
	<script type="text/javascript" src="03_js/less-1.2.2.min.js"></script>

	<!-- title will be changed by JavaScript -->
	<title>CXElegance</title>

</head>

<body>

	<div id="page1" class="page">

		<div class="content_area_narrower centered ">

			<div class="content_area centered ">

				<div class="row centered ">

					<div class="detail_display"></div>

					<div class="flexbox" style="align-items: center; justify-content: space-between; flex-wrap: wrap;">
						<div class=" row_content scalable" style="margin-right: 5em; padding-bottom: 0;">
							<div class="logo font_lobster">
								CXElegance
							</div>
							<div class="">
								<img id="underline" src="01_pics/04_underline.png" alt="underline" class="">
							</div>
						</div>
						<div class="flexbox row_content font_oswald" style="padding-bottom: 0; flex-direction: column; justify-content: center;">
							<span class="fatterr font_size_21 centerWhenSkinny">
								web and technical services focusing on
							</span>
							<span class="fatterrr font_size_21 centerWhenSkinny" style="margin-bottom: 0.3em; display: inline-block; text-align: center;">
								the Client eXperience
							</span>
							<div class="flexbox">
								<div class="flexbox" style="justify-content: space-around; flex-grow: 1;">
									<a href="https://github.com/cxelegance" class=" row_content linky">
										<span class="linkstyle">&lt;</span>github<span class="linkstyle">&gt;</span>
									</a>

									<a href="https://www.linkedin.com/in/cxelegance" class=" row_content linky">
										<span class="linkstyle">&lt;</span>linkedin<span class="linkstyle">&gt;</span>
									</a>
								</div>
								<div class="flexbox" style="flex-grow: 0;"></div>
							</div>
						</div>
					</div>

				</div>

				<div class="font_oswald">

					<h2>CXElegance is...</h2>
					<div class="detail font_size_18">
						<h5>... just one guy, really</h5>
						<p>Jesse "CXElegance" is an alter ego derived from a burst of inspiration in 2011.
						<h5>Break it down: CX</h5>
						<p>You, the Client, are entitled to a great eXperience in your business interactions.</p>
						<p>Your expectations, in terms of communication, deliverables and more, shall be met or exceeded... but is this enough?</p>
						<p>Let's make our experience together - our interactions, our processes - enjoyable, desirable, and memorable.</p>
						<h5>Break it down: Elegance</h5>
						<p>In mathematics, we get excited when a solution reveals beauty through it's simplicity, efficiency, and adaptability; when it surprises us; when it offers great insight. We strive for elegance always.</p>
					</div>

					<h2>CXElegance is creative</h2>
					<div class="detail font_size_18">
						<p>Tailored solutions are not found on the Internet; they are dreamed of, desired, planned, designed...</p>
						<p>...and then the Internet shows us many methods of actualizing our dreams.</p>
						<p>We love to be creative, we love it when our creations are loved by others.</p>
					</div>

					<h2>CXElegance is fun</h2>
					<div class="detail font_size_18">
						<p>Is it okay to have fun in business? Yes! Let's aim for quality in our lives, and good healthy energy - at home, at play, at work.</p>
						<p>Let's enjoy the experience!</p>
					</div>

					<h2>CXElegance is reliable</h2>
					<div class="detail font_size_18">
						<p>You can count on CXElegance to be honest, forthcoming, and specific about what is possible and what is expected.</p>
					</div>

					<h2>CXElegance is proactive</h2>
					<div class="detail font_size_18">
						<p>If it's foreseeable, then let's address it now!</p>
						<p>If it's a concern, then let's discuss and consider it.</p>
						<p>Surely there's a way we can make things better? Soon? Now?</p>
					</div>

					<h2>CXElegance is experienced</h2>
					<div class="detail font_size_18">
						<p>Jesse's first application developer role was in 2001, while he was still in university – he graduated with a B.Sc. majoring in mathematics and computer science.</p>
						<p>He has worked for 10 years as an application developer and has been an I.T. professional for nearly 20 years.</p>
					</div>

				</div>

			</div>

		</div>
	</div>

	<div id="page6" class="page">

		<div class="content_area_narrower centered ">

			<div class="content_area centered ">

				<div class="row centered ">

					<div class="detail_display"></div>

					<div class=" row_content font_lobster font_size_50 scalable">
						Services
					</div>

				</div>

				<h2 class="colorWhite">Do you need a full-stack developer for app development?</h2>
				<div class="detail font_size_18">
					<p>
						CXElegance has a long history of work, primarily with PHP, JavaScript, HTML and CSS, and mostly in Linux environments.
					</p>
				</div>

				<h2 class="colorWhite">Do you need a skilled hand in developing a module for your project?</h2>
				<div class="detail font_size_18">
					<p>
						CXElegance is well accustomed to receiving a specification and creating a rapid prototype to either prove a concept or to further engage in requirements analysis.
					</p>
				</div>

				<h2 class="colorWhite">Do you want to find your data quickly?</h2>
				<div class="detail font_size_18">
					<p>
						CXElegance adopted and adapted organizational methods that SNC-Lavalin, Inc. used in its massive, international engineering projects.
					</p>
				</div>

				<h2 class="colorWhite">Do you want painless, reliable backups?</h2>
				<div class="detail font_size_18">
					<p>
						CXElegance can help individuals and small organizations set up a local backup system, with or without cloud redundancy, with little infrastructure.
					</p>
				</div>

				<h2 class="colorWhite">What about privacy, security and data encryption?</h2>
				<div class="detail font_size_18">
					<p>
						CXElegance can help individuals and small organizations form habits that are aligned with best practices for today's Internet.
					</p>
				</div>

				<h2 class="colorWhite">How about a sharp eye looking over your app or site's copy?</h2>
				<div class="detail font_size_18">
					<p>
						CXElegance is an English grammar wiz and can help keep your app looking professional; plus he can work with your CMS or dig straight into your HTML.
					</p>
				</div>

				<h2 class="colorWhite">Do you want to learn to code?</h2>
				<div class="detail font_size_18">
					<p>
						Whether it's to build a website, develop a cross-platform app, create some useful scripts, or learn the fundamental principles of software engineering, CXElegance can help.
					</p>
				</div>

			</div>

		</div>

	</div>

	<div id="page2" class="page">

		<div class="content_area_narrower centered ">

			<div class="content_area centered ">

				<div class="row centered ">

					<div class="detail_display"></div>

					<div class=" row_content font_lobster font_size_50 scalable">
						Testimonials
					</div>

				</div>

				<h2 class="colorWhite">&quot;...takes the time to understand what you want to achieve...&quot;</h2>
				<div class="detail font_size_18">
					<h5>Mark Bennett, salvationarmy.org.nz</h5>
					<p>
						[CXElegance] is excellent at listening to requirements and turning them into functional models that meet your objectives.
						He takes the time to understand what you want to achieve before looking at the processes that are needed.
						Jesse thinks creatively and is not bound by conventional methods or approaches meaning you get brilliantly functional and beautiful results.
					</p>
				</div>

				<h2 class="colorWhite">&quot;[a] professional who makes his clients a top priority.&quot;</h2>
				<div class="detail font_size_18">
					<h5>Marzio Manderioli, cartoonsbymarzio.com</h5>
					<p>
						It is my pleasure to recommend [CXElegance] to your firm or business.
						When I hired Jesse to build a web site for my cartooning business I was concerned that the geographical distance between us might lead to delays and frustrations.
						I need not have feared as Jesse's work was nothing short of outstanding.
						Jesse has both a theoretical and practical knowledge of computers and programming.
						He is also a skilled communicator and creative troubleshooter.
						If you hire Jesse you will see that he is an enthusiastic professional who makes his clients a top priority.
						I recommend him to you without reservation.
					</p>
				</div>

				<h2 class="colorWhite">&quot;I look forward to working with him again...&quot;</h2>
				<div class="detail font_size_18">
					<h5>Aaron Burgess, aaronburgess.com</h5>
					<p>
						[CXElegance] was professional, proactive and easy to work with during the development and construction of my photography blog, [URL no longer active].
						His flexibility during the design phase and dedication made the whole process an enjoyable experience.
						I would have no hesitation in recommending Jesse for Web based work and I look forward to working with him again on future Web projects.
						<br><br>
						Cheers
					</p>
				</div>

				<h2 class="colorWhite">&quot;...makes searching for old data much faster...&quot;</h2>
				<div class="detail font_size_18">
					<h5>Ana Sanz</h5>
					<p>
						For many years I had been making several redundant backup copies; I had duplicated data unnecessarily in my backups and I needed a method to organize things better.
						[CXElegance] showed me a system that allows me to better organize myself and my data, gradually at my own pace.
						Next time I backup, it will be smaller and faster; I won't have duplicated data in my backups because of his archiving strategy.
						Jesse's method makes searching for old data much faster, and I have saved many gigabytes on my hard disks.
						<br><br>
						Great! Cheers Jesse!
					</p>
				</div>

			</div>

		</div>
	</div>

</body>

</html>