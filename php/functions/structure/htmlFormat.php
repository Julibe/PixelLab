<?php
	/*
		HTML Formatting and Indentation Utility
		Version: 1.0.1
		Author: Julibe - Crafting Amazing Digital Experiences
		Copyright: 2023 © https://julibe.com
		License: MIT
		Description: Performs comprehensive cleanup, formatting, and structural indentation on an HTML string. It standardizes whitespace, corrects common tag errors, and optionally formats the code for human readability.
		Parameters:
			@param string $html The raw HTML string to be processed.
			@param bool $indent_output Whether to structurally indent the output. Default is true.
			@param string $indent_string The string to use for a single level of indentation (e.g., "\t" or "    "). Default is a tab.
		Usage:
			Clean and indent (default behavior)
			$pretty_html = htmlFormat($raw_html_string);

			Only clean (no indentation)
			$minified_html = htmlFormat($raw_html_string, false);
		Returns:
			A cleaned, formatted, and optionally indented HTML string.
		Example:
			$raw = '  <p>Hello	World. </p> <br/> ';
			echo htmlFormat($raw);
			Expected Output (Indented):
			<p>Hello World.</p>
			<br>
		Dependencies: None.
		Last Updated: 2025-12-12
	*/
	function htmlFormat(string $html, bool $indent_output = true, string $indent_string = "\t"): string{
		// General Cleanup and Whitespace Reduction
		$html = trim($html);
		$html = preg_replace('/\s+/', ' ', $html);

		// Character and Tag Standardization
		$html = html_entity_decode($html, ENT_QUOTES | ENT_HTML5, 'UTF-8');
		$html = str_ireplace(['</br>', '<br/>', '<br />'], '<br>', $html);
		//$html = preg_replace('/\s*([<>])\s*/', '$1', $html);
		$html = str_replace(' />', '/>', $html);

		// Protocol Cleanup
		$html = str_replace('http://', '://', $html);
		$html = str_replace('https://', '://', $html);
		$html = preg_replace('/:{1}\/{2,}/', '://', $html);
		$html = str_replace('://', 'http://', $html);
		$html = str_replace('http://s://', 'https://', $html);

		// Final Minification Pass
		$html = str_replace('><', '><', $html);

		// Return cleaned HTML if indentation is skipped
		if (!$indent_output) {
			return trim($html);
		}

		// Structural Indentation Logic
		$html = str_replace('><', ">\n<", $html);

		$clean_html_lines = [];
		$indent_level = 0;
		$lines = explode("\n", $html);

		foreach ($lines as $line) {
			$line = trim($line);
			if (empty($line)) {
				continue;
			}

			// Decrement indent before closing tag
			if (preg_match('/<\/(.*?)>/', $line)) {
				$indent_level = max(0, $indent_level - 1);
			}

			$current_indent = str_repeat($indent_string, $indent_level);
			$clean_html_lines[] = $current_indent . $line;

			// Increment indent after opening tag
			if (preg_match('/<[^\/!](.*?)>/', $line)
				&& !preg_match('/<\/(.*?)>/', $line)
				&& !preg_match('/<br|img|hr|meta|link|input|base|area|col|param(.*?)\/?>/i', $line)) {
				$indent_level++;
			}
		}

		return implode("\n", $clean_html_lines);
	}
?>