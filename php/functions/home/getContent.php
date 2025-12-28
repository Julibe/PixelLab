<?php
	/*
		Intelligent Content Discovery
		Version:
			1.2.0
		Author:
			Julibe - Crafting Amazing Digital Experiences
		Copyright:
			2025 © https://julibe.com
		License:
			Creative Commons Attribution NonCommercial (CC BY-NC 4.0)
		Description:
			An optimized scanner that gathers README.md data, ensures valid slugs, and sorts results.
		Parameters:
			@param string $contents_dir The root path containing your content folders.
		Usage:
			$blog_posts = getContent('./src/content/');
		Returns:
			An array of content objects, alphabetized by title for easier UI rendering.
		Example:
			$data = getContent('pages'); // Returns sorted array of page data.
		Dependencies:
			frontmatterArray()
		Notes:
			Automatically handles trailing slashes and filters out directories without READMEs.
		Last Updated: 2025-12-19
	*/
	function getContent(string $contents_dir) {
		$data_collection = [];
		$base_path = rtrim($contents_dir, DIRECTORY_SEPARATOR);
		$dir_list = glob($base_path . DIRECTORY_SEPARATOR . '*', GLOB_ONLYDIR);

		if (!$dir_list) return [];

		foreach ($dir_list as $full_path) {
			$readme_path = $full_path . DIRECTORY_SEPARATOR . 'README.md';

			if (!is_file($readme_path)) continue;

			// Efficiently merge system meta with file data
			$file_data = frontmatterArray($readme_path);
			$folder_name = basename($full_path);

			$entry = array_merge([
				'title'     => ucwords(str_replace(['-', '_'], ' ', $folder_name)),
				'url'  => $folder_name,
				'dir'  => $full_path,
				'updated' => filemtime($readme_path)
			], $file_data);

			$data_collection[$entry['title']] = $entry;
		}

		// Sort keys alphabetically so the front-end receives organized data
		ksort($data_collection);

		return $data_collection;
	}