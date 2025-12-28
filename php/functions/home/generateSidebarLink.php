<?php
	/*
		Sidebar Link Item Generator
		Version:
			1.1.0
		Author:
			Julibe - Crafting Amazing Digital Experiences
		Copyright:
			2025 © https://julibe.com
		License:
			Creative Commons Attribution NonCommercial (CC BY-NC 4.0)
		Description:
			Renders a media list item with custom theme colors and accessible attributes.
		Parameters:
			@param array $data The source array containing link details and hex colors.
		Usage:
			echo generateSidebarLink($data);
		Returns:
			A string containing the <li> and styled <a> element.
		Example:
			generateSidebarLink(['url' => 'https://julibe.com', 'text' => 'Website', 'color' => '#1a1a1a']);
		Dependencies:
			FontAwesome
		Notes:
			Requires specific keys in the input array for color and icon mapping.
		Last Updated: 2025-12-19
	*/
	function generateSidebarLink(array $data, string $type = 'social') {
		$url   = $data['url'] ?? '#';
		$title = $data['title'] ?? '';
		$label = $data['label'] ?? '';
		$icon  = $data['icon'] ?? 'fa-link';
		$text  = $data['text'] ?? '';

		$c_main = $data['color'] ?? '#000000';
		$c_text = $data['color_text'] ?? '#ffffff';
		$c_high = $data['color_high'] ?? '#ffffff';

		// Return the structured HTML
		$html = <<<HTML
		<li>
			<a
				href="{$url}"
				title="{$title}"
				aria-label="{$label}"
				target="_{$type}"
				rel="noopener noreferrer"
				class="button {$type}-button"
				style="--c:{$c_main}; --c-text:{$c_text}; --c-high:{$c_high};"
			>
				<span class="icon fa {$icon}" aria-hidden="true"></span>
				<span class="title">{$text}</span>
			</a>
		</li>
		HTML;

		return htmlFormat($html)."\n\n";
	}