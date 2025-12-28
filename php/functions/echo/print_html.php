<?php

/*
	The HTML Data Inspector
	Version:
	  7.4.8
	Author:
	  Julibe - Crafting Amazing Digital Experiences
	Copyright:
	  2018 © https://julibe.com
	License:
	  Creative Commons Attribution NonCommercial (CC BY-NC 4.0)
	Description:
	  Generates an encapsulated, readable HTML representation of PHP data structures or raw strings for debugging.
	Parameters:
	  @param mixed $target_data The data (array, object, scalar, null) to be displayed.
	  @param string $title An optional title for the print block.
	Usage:
	  $html_output = printH($data_to_inspect, 'User Profile Data');
	Returns:
	  A minified HTML string containing the structured data visualization.
	Example:
	  $user_data = ['id' => 101, 'name' => 'Alex'];
	  echo printH($user_data, 'Current User'); // Expected output: Minified HTML block with data.
	Dependencies:
	  None. Uses PHP's built-in ().
	Notes:
	Last Updated: 2025-12-13
*/

// Main Data Inspection Entry Point
function printH($target_data, $title = 'Print') {
	$html_output = '<div class="print">';

	// Escape the title using native PHP function
	$html_output .= '<h2>' . ($title) . '</h2>';

	if (is_array($target_data) || is_object($target_data)) {
		$html_output .= buildPrintHList((array) $target_data);
	} elseif (is_scalar($target_data) || is_null($target_data)) {
		$output_value = is_bool($target_data) ? ($target_data ? 'true' : 'false') : (is_null($target_data) ? 'NULL' : (string) $target_data);
		// Escape scalar data
		$html_output .= ($output_value);
	} else {
		// Escape resource data
		$html_output .= ((string) $target_data);
	}

	$html_output .= '</div>';

	// Apply minification
	return trim(preg_replace('/\s+/', ' ', $html_output));
}

// Internal Recursive List Builder
function buildPrintHList(array $target_array, $level = 0) {
	$html_output = '<ul class="level-' . $level . '">';

	foreach ($target_array as $data_key => $data_value) {
		$html_output .= '<li>';

		// Always escape the key for safety
		$html_output .= '<b>' . ((string) $data_key) . ':</b> ';

		if (is_array($data_value) || is_object($data_value)) {
			$html_output .= buildPrintHList((array) $data_value, $level + 1);
		} elseif (is_bool($data_value)) {
			$html_output .= ($data_value ? 'true' : 'false');
		} elseif (is_null($data_value)) {
			$html_output .= 'NULL';
		} else {
			// Escape all other scalar values
			$html_output .= ((string) $data_value);
		}

		$html_output .= '</li>';
	}

	$html_output .= '</ul>';

	return $html_output;
}

// Backward Compatibility Wrapper
function print_h($target_array) {
	return printH($target_array);
}

?>