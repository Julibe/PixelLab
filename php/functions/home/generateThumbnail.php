<?php
	/*
		Thumbnail Component Generator
		Version:
			1.1.0
		Author:
			Julibe - Crafting Amazing Digital Experiences
		Copyright:
			2025 © https://julibe.com
		License:
			Creative Commons Attribution NonCommercial (CC BY-NC 4.0)
		Description:
			Creates a rich-media card for projects or games, handling dynamic themes and accessibility.
		Parameters:
			@param array $value Data array containing project metadata, colors, and content.
			@param string $item Fallback string for title if no title is provided.
		Usage:
			echo generateThumbnail($project_data, "project-slug");
		Returns:
			A fully-formed <article> HTML component.
		Example:
			generateThumbnail(['category' => 'game', 'title' => 'Space Invaders'], 'space-invaders');
		Dependencies:
			mediaAssets()
		Notes:
			Contextually changes button labels based on the 'category' key.
		Last Updated: 2025-12-19
	*/
	function generateThumbnail(array $value = [], string $item = '') {
		$images = mediaAssets($value);

		// Data Normalization
		$tech_list   = $value['technologies'] ?? [];
		$tech_string = is_array($tech_list) ? implode(', ', $tech_list) : (string) $tech_list;
		$title       = $value['title'] ?? ucwords(str_replace(['-', '_'], ' ', $item));
		$date        = (string) (strtotime($value['created']) ?? date('Y-m-d H:i:s O'));
		$year        = (string) (date('Y', $date ) ?? date('Y'));
		$desc        = (string) ($value['description'] ?? 'No description available.');
		$ver         = (string) ($value['version'] ?? '1.0.0');
		$cat         = (string) ($value['category'] ?? 'application');
		$url         = (string) ($value['url'] ?? $item);
		$favorite    = (string) ($value['favorite'] ?? 'false');

		$class = '';
		if ($favorite) $class .= ' favorite';





		// Theme Variables
		$colors = $value['colors'] ?? [];
		$c_main = (string) ($colors[0] ?? '#1b004b');
		$c_text = (string) ($colors[1] ?? '#ffffff');
		$c_high = (string) ($colors[2] ?? '#ee355e');

		// Contextual Labels
		$is_game    = ($cat === 'game');
		$view_txt   = $value['view_btn'] ?? ($is_game ? "Let's play the Game!" : "This looks awesome!");
		$read_txt   = $value['read_btn'] ?? ($is_game ? "Read about this Game!" : "Read about this project!");
		$view_small = $is_game ? "Play Game" : "View Project";
		$read_small = "Read More";


		$html = <<<HTML
			<article
				id="{$url}"
				class="thumb"
				data-title="{$title}"
				data-date="{$date}"
				data-year="{$year}"
				data-category="{$cat}"
				data-technologies="{$tech_string}"
				data-version="{$ver}"
				data-favorite="{$favorite}"
				title="{$title} - {$desc}"
				aria-labelledby="{$url}-title"

				style="--c:{$c_main}; --c-text:{$c_text}; --c-high:{$c_high};"
			>
				<header class="thumb-header">
					<figure class="thumb-image">
						<a href="./view/{$url}.html" title="This looks awesome! {$title}" aria-label="{$view_txt} {$title}" target="_view">
							<picture>
								<img src="{$images['cover']}" alt="{$title}" loading="lazy" />
							</picture>
						</a>
					</figure>
				</header>

				<section class="thumb-content">
					<h3 id="{$url}-title" class="thumb-title" title="View {$title}">
						<a href="./view/{$url}.html" aria-label="View {$title}" target="_view">
							<span class="thumb-icon" style="--icon:url('{$images['icon']}');" aria-hidden="true"></span>
							<span class="text">{$title}</span>
							<span class="year">({$year})</span>
						</a>
					</h3>

					<p class="thumb-description">{$desc}</p>

					<nav class="thumb-buttons">
						<ul>
							<li>
								<a href="./view/{$url}.html" title="{$view_txt}" aria-label="{$view_txt} {$title}" class="view-button button" target="_view">
									<span class="icon fa fa-play" aria-hidden="true"></span>
									<span class="long">{$view_txt}</span>
									<span class="small">({$view_small})</span>
								</a>
							</li>
							<li>
								<a href="./about/{$url}.html" class="about-button button" title="More info about {$title}" aria-label="More info about {$title}" target="_about">
									<span class="icon fa fa-info" aria-hidden="true"></span>
									<span class="long">{$read_txt}</span>
									<span class="small">({$read_small})</span>
								</a>
							</li>
						</ul>
					</nav>
				</section>
			</article>
		HTML;
		return htmlFormat($html)."\n\n";

	}