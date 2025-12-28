<?php
	/*
		Load Functions Recursive
		Version: 0.2.0
		Author: Julibe
		Copyright:  2024 https://julibe.com/
		Description: Recursively scans a directory for PHP files, includes them, and registers them in the Session using SPL Iterators.
	*/

	// Session safety
	if ( session_status() === PHP_SESSION_NONE ) {
		session_start();
	}

	// Reset function map
	$_SESSION['functions'] = [];

	// Validate config and paths
	$root_path = isset( $config['paths']['php'] ) ? $config['paths']['php'] : __DIR__ . '/../';
	$functions_path = $root_path . 'functions/';

	// Normalize path
	$base_path = realpath( $functions_path );

	if ( $base_path && is_dir( $base_path ) ) {

		try {
			// Create recursive iterator
			$directory = new RecursiveDirectoryIterator( $base_path, RecursiveDirectoryIterator::SKIP_DOTS );
			$iterator  = new RecursiveIteratorIterator( $directory );

			foreach ( $iterator as $file ) {

				// Filter PHP files
				if ( $file->getExtension() !== 'php' ) {
					continue;
				}

				$full_path = $file->getPathname();

				// Include file
				include_once $full_path;

				// Calculate relative path
				$current_dir  = $file->getPath();

				// Get relative directory
				$relative_dir = substr( $current_dir, strlen( $base_path ) );

				// Clean slashes
				$relative_dir = trim( $relative_dir, DIRECTORY_SEPARATOR );

				// Split parts
				$path_parts = $relative_dir ? explode( DIRECTORY_SEPARATOR, $relative_dir ) : [];

				// Build module metadata
				$module_type = ! empty( $path_parts ) ? implode( '_', $path_parts ) : 'core';
				$module_name = $file->getBasename( '.php' );

				// Register in session
				$_SESSION['functions'][ $module_type ][ $module_name ] = $module_name;
			}

		} catch ( Exception $e ) {
			// Log error
			error_log( 'Autoloader Error: ' . $e->getMessage() );
		}
	} else {
		// Log warning
		error_log( 'Warning: Functions directory not found at ' . $functions_path );
	}
?>