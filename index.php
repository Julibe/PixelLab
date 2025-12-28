<?php

	// --- Initialization ---
	require_once( 'config.php' );

	date_default_timezone_set( $config['timezone'] );
	foreach ( $config['runtime'] as $key => $value ) {
		ini_set( $key, $value );
	}
	foreach ( $config['headers'] as $key => $value ) {
		header( "$key: $value" );
	}
	session_start();

	// --- Content Negotiation ---
	$format = isset( $_GET['format'] ) ? strtolower( $_GET['format'] ) : 'html';
	if ( !array_key_exists( $format, $config['formats'] ) ) {
		$format = 'html';
	}
	header( "Content-type: " . $config['formats'][$format] . "; charset=UTF-8" );

	// Environment Overrides
	if ( $_SERVER["SERVER_NAME"] != 'localhost' ) {
		ini_set( 'display_errors', 1 );
		ini_set( 'display_startup_errors', 1 );
		error_reporting( E_ALL );
		$_SESSION['url'] = '';
	} else {
		$_SESSION['url'] = $config['urls']['local'];
	}

	// --- Logic ---
	$root_dir = $config['paths']['root'];

	require_once( $config['paths']['php'] . 'functions.php' );

	if ( isset( $_GET['search'] ) ) {
		$search = trim( preg_replace( "/[^\w\s]/u", " ", strtolower( $_GET['search'] ) ) );
		$_GET['search'] = $search;
	}

	$_SESSION['get'] = $_GET;

	// --- Routing ---
	$is_admin = isset( $_GET['admin'] );

	$category = isset( $_GET['category'] ) ? trim( $_GET['category'] ) : null;
	$filter   = isset( $_GET['filter'] )   ? trim( $_GET['filter'] )   : null;
	$slug     = isset( $_GET['slug'] )     ? trim( $_GET['slug'] )     : null;

	if ( $category ) {
		$section = $category;
	} elseif ( $slug ) {
		$section = $slug;
	} else {
		$section = 'home';
	}

	if ( empty( $section ) || $section == 'index' ) { $section = 'home'; }

	if ( !isset( $_SESSION['lang'] ) ) { $_SESSION['lang'] = $config['langs'][0]; }
	if ( isset( $_GET['lang'] ) ) { $_SESSION['lang'] = $_GET['lang']; }
	$lang = trim( $_SESSION['lang'] );

	// --- Content Loading ---
	ob_start();

	$section_file = $section . '.php';

	if ( $is_admin ) {
		$section_path = isset( $_SESSION['admin_user'] ) ? 'admin/' . $section_file : 'admin/login.php';
	} else {
		$section_path = 'contents/' . $section_file;
	}

	if ( is_file( $section_path ) ) {
		include( $section_path );
	} else {
		$error_code = 404;
		include( 'contents/error.php' );
	}
	$html_section = ob_get_clean();

	// --- Rendering ---
	ob_start();

	if ( $format == 'html' || $format == 'htm' ) {
		?>
		<!doctype html>
		<html lang="<?php echo $lang ?>" dir="ltr">
			<?php
				if (empty($head_config)) {

					$head_config = [
						"title"       => "Julibe Apps | PixelLab",
						"name"        => "PixelLab",
						"description" => "A playful code playground where cool concepts, neat ideas, and bold web experiments come to life. Click around and explore.",
						"keywords"    => "PixelLab, Julibe Apps, code playground, creative coding, frontend experiments, HTML CSS JavaScript, UI UX, web lab, interactive apps",
						"fonts"       => ["google" => "Roboto, Open Sans"]
					];

				}
				echo ( generateHead($head_config)  );
			?>

			<body>
				<?php echo   ( $html_section ); ?>
			</body>
		</html>
		<?php
	} else {
		echo $html_section;
	}

	$html = ob_get_clean();

	//include( $config['paths']['php'] . 'keywords.php' );

	echo  trim($html);

	die();
?>