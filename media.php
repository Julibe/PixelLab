<?php
	$brand_name = 'Julibe';
	$brand_url = 'https://julibe.com/';
	$brand_slogan = 'Crafting Digital Experiences';
	$brand_cta = "Visit $brand_url to see more designs.";
	$copyright = "Copyright © " . date('Y') . " $brand_name";
	$brand_keywords = [$brand_name, 'Design', 'Development', 'Freelance', 'Web'];

	$fallback_images = ['000', '001', '002', '003', '004'];

	function cleanInput($input) {
		return preg_replace('/[^a-zA-Z0-9_\-\.]/', '', basename($input));
	}

	function getXmpPacket($url, $copy, $cta, $keys) {
		return '<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>' .
	 		'<x:xmpmeta xmlns:x="adobe:ns:meta/">' .
	 		'<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">' .
	 		'<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xmp="http://ns.julibe.com/xmp/1.0/">' .
	 		'<dc:rights><rdf:Alt><rdf:li xml:lang="x-default">' . $copy . '</rdf:li></rdf:Alt></dc:rights>' .
	 		'<dc:creator><rdf:Seq><rdf:li>Julibe</rdf:li></rdf:Seq></dc:creator>' .
	 		'<dc:description><rdf:Alt><rdf:li xml:lang="x-default">' . $cta . '</rdf:li></rdf:Alt></dc:description>' .
	 		'<dc:subject><rdf:Bag><rdf:li>' . implode('</rdf:li><rdf:li>', $keys) . '</rdf:li></rdf:Bag></dc:subject>' .
	 		'<xmp:AuthorUri>' . $url . '</xmp:AuthorUri>' .
	 		'</rdf:Description></rdf:RDF></x:xmpmeta><?xpacket end="r"?>';
	}

	$project_slug = isset($_GET['project']) ? cleanInput($_GET['project']) : null;
	$file_name = isset($_GET['file']) ? cleanInput($_GET['file']) : null;

	$path = './assets/media/' . $file_name;
	if ($project_slug) {
		$path = './contents/' . $project_slug . '/media/' . $file_name;
	}

	if (!is_file($path)) {
		$random_key = array_rand($fallback_images);
		$path = './assets/media/no-image-' . $fallback_images[$random_key] . '.webp';
		if (!is_file($path)) exit(header('HTTP/1.1 404 Not Found'));
	}

	$file_type = mime_content_type($path);
	$raw = file_get_contents($path);

	$out = $raw;
	if (in_array($file_type, ['image/jpeg', 'image/webp', 'image/png'])) {
		$out = preg_replace('/Made with Google AI/i', str_pad($brand_name, 20, ' '), $out);
		$out = preg_replace('/Photoshop [0-9.]+/i', str_pad($brand_name, 15, ' '), $out);
		$out = preg_replace('/Adobe/i', 'Julibe', $out);
	}

	if ($file_type === 'image/jpeg') {
		$xmp = getXmpPacket($brand_url, $copyright, $brand_cta, $brand_keywords);
		$xmp_block = "http://ns.adobe.com/xap/1.0/\0" . $xmp;
		$out = substr($out, 0, 2) . "\xFF\xE1" . pack('n', strlen($xmp_block) + 2) . $xmp_block . substr($out, 2);
	}

	header("X-Content-Type-Options: nosniff");
	header("Access-Control-Allow-Origin: *");
	header("X-Developer: $brand_name - $brand_slogan");
	header("X-Designer: $brand_name");
	header("X-Website: $brand_url");
	header("X-Owner: $brand_name");
	header("X-Copyright: $copyright");
	header("X-Keywords: " . implode(', ', $brand_keywords));
	header("X-Year: " . date('Y'));
	header("Content-Type: $file_type");
	header("Content-Length: " . strlen($out));

	echo $out;
?>