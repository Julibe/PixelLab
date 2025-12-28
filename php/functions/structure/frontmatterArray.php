<?php

/*
	Markdown Front Matter Parser
	Version:
		1.2.3
	Author:
		Julibe - Crafting Amazing Digital Experiences
	Copyright:
		2025 © https://julibe.com
	License:
		Creative Commons Attribution NonCommercial (CC BY-NC 4.0)
	Description:
		Reads a Markdown file, manually parses simple YAML front matter (key: value, lists, and multiline), and separates it from the content without external dependencies.
	Parameters:
		@param string $file_path The absolute or relative path to the Markdown file.
	Usage:
		$data = frontMatterArray('./posts/welcome.md');
	Returns:
		An associative array containing the parsed front matter keys, with the raw content assigned to the 'content' key.
	Example:
		$data = frontMatterArray("docs/intro.md");
		// Returns: ['title' => 'Hello', 'tags' => ['php', 'dev'], 'content' => '# My Post']
	Dependencies:
		None (Native PHP).
	Notes:
		Enhanced native parser to robustly handle simple YAML lists and multiline strings using clear state management.
	Last Updated: 2025-12-13
*/

// Main Front Matter Parser
function frontMatterArray(string $file_path): array
{
	$default_return = [
		'front_matter' => [],
		'content'      => '',
	];

	// File check
	if (!file_exists($file_path) || !is_readable($file_path)) {
		return $default_return;
	}

	$raw_content = file_get_contents($file_path);

	if (empty($raw_content)) {
		return $default_return;
	}

	// Line ending standardization
	$raw_content = str_replace(["\r\n", "\r"], "\n", $raw_content);

	// Check opening delimiter
	if (strpos($raw_content, "---\n") !== 0) {
		$default_return['content'] = $raw_content;
		return $default_return;
	}

	// Split content block
	$parts = explode("\n---\n", substr($raw_content, 4), 2);

	// Fallback for malformed front matter
	if (count($parts) < 2) {
		$default_return['content'] = $raw_content;
		return $default_return;
	}

	$yaml_block = trim($parts[0]);
	$parsed_meta = [];
	$current_multiline_key = null;
	$current_list_key = null;

	// YAML Parsing Loop
	$yaml_lines = explode("\n", $yaml_block);
	foreach ($yaml_lines as $line) {
		$trimmed_line = trim($line);

		// Multiline parsing
		if ($current_multiline_key !== null) {
			if (preg_match('/^(\s+)(.+)/', $line, $matches)) {
				$parsed_meta[$current_multiline_key] .= "\n" . trim($matches[2]);
				continue;
			} else {
				$current_multiline_key = null;
			}
		}

		// List item parsing
		if ($current_list_key !== null) {
			if (preg_match('/^\s*- (.+)/', $line, $matches)) {
				$parsed_meta[$current_list_key][] = trim($matches[1], " \"'");
				continue;
			} else {
				$current_list_key = null;
			}
		}

		// Skip empty lines/comments
		if (!$trimmed_line || strpos($trimmed_line, '#') === 0) {
			continue;
		}

		// Standard Key: Value
		if (strpos($trimmed_line, ':') !== false) {
			[$key, $value] = explode(':', $trimmed_line, 2);
			$clean_key = trim($key);
			$clean_value = trim($value);

			if ($clean_value === '|') {
				// Start multiline block
				$current_multiline_key = $clean_key;
				$parsed_meta[$current_multiline_key] = '';
			} elseif ($clean_value === '') {
				// Start list block
				$current_list_key = $clean_key;
				$parsed_meta[$current_list_key] = [];
			} else {
				// Standard key:value pair
				$parsed_meta[$clean_key] = trim($clean_value, " \"'");
			}
		}
	}

	// Final return structure
	$parsed_meta['content'] = trim($parts[1]);
	return $parsed_meta;
}

?>