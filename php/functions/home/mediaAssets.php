<?php
	/*
		Media Asset Discovery Engine
		Version:
			1.1.0
		Author:
			Julibe - Crafting Amazing Digital Experiences
		Copyright:
			2025 © https://julibe.com
		License:
			Creative Commons Attribution NonCommercial (CC BY-NC 4.0)
		Description:
			Locates project-specific images (covers, icons, screenshots) and provides smart fallbacks.
		Parameters:
			@param array $item_data Array containing 'dir' (physical path) and 'url' (slug).
		Usage:
			$assets = mediaAssets($project_data);
		Returns:
			An array of validated asset URLs including a nested 'screenshots' list.
		Example:
			$images = mediaAssets(['dir' => './content/project-a', 'url' => 'project-a']);
		Dependencies:
			Standard PHP File System functions.
		Notes:
			Screenshots are expected in the format 'screenshot_000.webp'.
		Last Updated: 2025-12-19
	*/
	function mediaAssets(array $item_data) {
		$item_dir  = $item_data['dir'] ?? '';
		$media_dir = rtrim($item_dir, '/') . '/media';
		$media_url = './media/' . ($item_data['url'] ?? '');

		$fallback_img  = $media_url . '/none-image.webp';
		$fallback_icon = $media_url . '/none-icon.webp';

		// Local helper to check and return paths
		$find_asset = function ($names, $fallback) use ($media_dir, $media_url) {
			$names = is_array($names) ? $names : [$names];
			foreach ($names as $name) {
				if (is_file($media_dir . '/' . $name)) {
					return $media_url . '/' . $name;
				}
			}
			return $fallback;
		};

		$assets = [];

		// Primary Visuals
		$assets['cover']   = $find_asset(['cover.webp', 'cover.png', 'cover.jpg', 'cover.svg', 'cover.gif','thumb.webp', 'thumb.png', 'thumb.jpg', 'thumb.svg', 'thumb.gif'], $fallback_img);
		$assets['poster']  = $find_asset(['poster.webp', 'poster.png', 'poster.jpg', 'poster.svg', 'poster.gif'], $assets['cover']);

		// Brand Visuals
		$assets['icon']    = $find_asset(['icon.webp', 'icon.png', 'icon.jpg', 'icon.svg', 'icon.gif'], $fallback_icon);
		$assets['favicon'] = $find_asset(['favicon.webp', 'favicon.png', 'favicon.jpg', 'favicon.svg', 'favicon.gif'], $assets['icon']);

		// Screenshot Collection
		$assets['screenshots'] = [];
		$screenshot_index = 0;

		while (true) {
			$screenshot_names = [
				'screenshot_' . str_pad($screenshot_index, 3, '0', STR_PAD_LEFT),
				'image_' . str_pad($screenshot_index, 3, '0', STR_PAD_LEFT),
				'thumbnail_' . str_pad($screenshot_index, 3, '0', STR_PAD_LEFT),
				'thumb_' . str_pad($screenshot_index, 3, '0', STR_PAD_LEFT)
			];

			$found = false;
			foreach ($screenshot_names as $screenshot_name) {
				$screenshot_formats = [
					$screenshot_name . '.webp',
					$screenshot_name . '.png',
					$screenshot_name . '.jpg',
					$screenshot_name . '.gif',
					$screenshot_name . '.svg'
				];

				foreach ($screenshot_formats as $format) {
					if (is_file($media_dir . '/' . $format)) {
						$assets['screenshots'][] = $media_url . '/' . $format;
						$found = true;
						break 2;
					}
				}
			}

			if (!$found) break;
			$screenshot_index++;

			// Safety ceiling
			if ($screenshot_index > 100) break;
		}

		return $assets;
	}