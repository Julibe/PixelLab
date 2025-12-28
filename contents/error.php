<?
	$head_config = [
		'title'       => 'Oh no! Page Not Found | It’s all Error ' . $error_code . '’s fault!',
		'name' 	  => 'Not Found',
		'description' => 'Oops! The page you were looking for does not exist, has moved, or decided to take a day off.',
		'keywords'    => '404, error, page not found, missing page',
		'lang'        => $lang,
	];

?>

<main>
	<h1>
		Oh no!
		That pesky error <?php echo $error_code; ?>!<br>
		It means that the page you are looking for cannot be found.<br>
	</h1>

	<p>

		Well… this is awkward 😅<br>
		We searched high and low, behind the sofa, and under the keyboard…<br>
		But <em>"<?php echo $section; ?>"</em> is nowhere to be found.

	</p>

		<p>
			It might have moved, vanished, or decided to take a day off.
		</p>

		<p>
			Good news though: the rest of the site is behaving nicely.
		</p>

	<nav>
		<a href="./">Let’s go back <em>"Home"</em> where things are safe and familiar</a>
	</nav>
</main>