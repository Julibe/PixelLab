<?php
	/*
		Function Name: Clean and Format HTML Output Utility
		Version: 1.3.6
		Author: Julibe - Crafting Amazing Digital Experiences
		Copyright: 2025 © https://julibe.com/
		License: MIT
		Description: Sanitizes and formats HTML. Includes specific fixes for Script/JSON-LD indentation, removes debug attributes, and enforcing HTTPS on resources.

		Parameters:
			@param string $html              The raw HTML content to be cleaned.
			@param string $format            The desired output format. Defaults to 'html'.
			@param bool   $remove_empty_tags Whether to strip empty container and text tags. Defaults to false.

		Usage:
			$cleaned = cleanOutput($raw_html, 'html', true);

		Returns:
			A string containing the processed HTML.

		Dependencies:
			Optionally uses external function htmlFormat() for advanced indentation.

		Last Updated: 2025-12-12
	*/
	function cleanOutput( string $html, string $format = 'html', bool $remove_empty_tags = false ): string {
		$html = trim( $html );

		/* Validation */
		if ( ! in_array( strtolower( $format ), [ 'html', 'htm' ], true ) ) {
			return $html;
		}

		/* Flatten Structure */
		$html = str_replace( [ "\r\n", "\r", "\n", "\t" ], ' ', $html );
		$html = preg_replace( '/\s+/', ' ', $html );

		/* Cleanup Artifacts */
		$html = str_replace( '<?xml version="1.0" encoding="utf-8"?>', ' ', $html );
		$html = preg_replace( '/\s+tag="[a-z0-9]+"/i', ' ', $html );

		/* HTTPS Protocol Enforcement */
		$html = preg_replace(
			'/(href|src)=(["\'])(https?:\/\/)(?!.*\.(?:css|js|png|jpg|gif|svg|webp))(?!\w+\.\w+\/)(?!\w+\/)([^"\']+)/i',
			'$1=$2https://$4',
			$html
		);

		/* Character Replacements */
		$replacements = [
			'> <' => '><',
			'< '  => ' <',
			' >'  => '> ',
			'Â¿'  => '¿',
		];
		$html = str_replace( array_keys( $replacements ), array_values( $replacements ), $html );

		/* Boolean Attribute Minification */
		$html = preg_replace(
			'/ (checked|disabled|selected|readonly|multiple|formnovalidate|autoplay|controls|loop|muted|default|ismap|novalidate|open|required)="[^"]*?"/i',
			' $1',
			$html
		);

		/* Smart Lazy Loading */
		$html = preg_replace(
			'/<(img|iframe)(?![^>]*\bloading=)([^>]+)>/i',
			'<$1 loading="lazy"$2>',
			$html
		);

		/* Empty Tag Removal */
		if ( $remove_empty_tags ) {
			$html = preg_replace( '/<(p|span|div|section|article|header|footer|aside|ul|ol|li|strong|em|h[1-6])\b[^>]*>\s*<\/\1>/i', ' ', $html );
		}

		/* Formatting Preparation */
		$html = preg_replace( '/(<\/(script|style)>)(<)/i', "$1\n$3", $html );

		/* External Formatting */
		if ( function_exists( 'htmlFormat' ) ) {
			$html = htmlFormat( $html );
		} else {
			$html = str_replace( '<', "\n<", $html );
			$html = str_replace( ">\n</", "></", $html );
			$html = str_replace( ">\n<", "><", $html );
		}

		/* Final HTTPS Safety */
		$html = preg_replace( '/ (href|src)="http:/i', ' $1="https:', $html );

		$html = str_replace( "http:", "https:", $html );
		GLOBAL $is_local;
		if ( $is_local ) {
			$html = str_replace( "https:", "http:", $html );
		}

		return trim( $html );
	}
?>