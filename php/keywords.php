<?php

	/*
		Keyword Processing Logic
		Version: 1.0.0 (Implied)
		Author: Julibe
		Copyright:  2024 https://ulibe.com/
		Description: Recursively replaces all {key} placeholders, executes embedded PHP, and flags unresolved tokens with error tags.
		Usage: Inline block executed after content capture ($html = ob_get_clean()).
		Returns: Modifies the global $html variable.
	 */
	$loop_count = 0;

	while ( $loop_count <= 5 ) {

		# Find and Map Keywords
		preg_match_all( "/\{(.*?)\}/", $html, $html_matches );
		$html_matches_unique = array_unique( $html_matches[ 1 ] );

		# Initialize keywords array for the current loop
		$keywords = [];

		if ( @is_array( $html_matches_unique ) ) {
			$html_matched_map = [];
			foreach ( $html_matches_unique as $value ) {
				$v_ = trim( $value );
				$v_parts = explode( '/', $v_ );

				if ( @$v_parts[ 1 ] ) {
					if ( $v_parts[ 0 ] == str_replace( ':', '', $v_parts[ 0 ] ) ) {
						if ( $v_parts[ 0 ] == str_replace( ' ', '', $v_parts[ 0 ] ) ) {
							if ( $v_parts[ 1 ] == str_replace( '{', '', $v_parts[ 1 ] ) ) {
								$html_matched_map[ trim( $v_parts[ 0 ] ) ][ trim( $v_parts[ 1 ] ) ] = trim( $v_parts[ 1 ] );
							}
						}
					}
				}
			}
		}



		$keywords[ 'url' ] = $url;
		$keywords[ 'section' ] = '{' . $section . '}';
		$keywords[ 'subtitle' ] = '{' . $section . '}';
		$keywords[ '_' ] = '{html/_}';
		$keywords[ '_n' ] = '{html/_n}';
		$keywords[ 'br' ] = '{html/br}';


		# URL Construction
		$keywords[ 'current_url' ] = $url . $section . '.html';
		$keywords[ 'section_ext' ] = $section . '.html';

		if ( @$is_admin ) {
			$keywords[ 'current_url' ] = $url . $section . '.admin';
			$keywords[ 'section_ext' ] = $url . $section . '.admin';
		}

		if ( @$_SESSION[ 'admin' ] ) {
			foreach ( $_SESSION[ 'admin' ] as $key => $value ) {
				$keywords[ 'admin/' . $key ] = $value;
			}
		}

		# Perform Replacements
		if ( $lang ) {
			foreach ( $keywords as $key => $value ) {
				$v = $value;
				$k = trim( $key );

				if ( str_contains( $v, '<?' ) || str_contains( $v, '?>' ) ) {
					$v = ' ?>' . $v . '<?php ';
					ob_start();
					eval( $v );
					$v = ob_get_clean();
				}
				$html = str_replace( '{' . trim( $k ) . '}', ( $v ), $html );
			}
		}
		$loop_count++;
	}

	/*
		Handle Unresolved Keywords
	 */
	$open_tag = '<span class="missing_keyword">🔑</span>';
	$close_tag = '<span class="missing_keyword">🔧</span>';

	preg_match_all( "/\\{(.*?)\\}/", $html, $keywords_html_final );
	foreach ( array_unique( $keywords_html_final[ 1 ] ) as $value ) {
		$html = str_replace( '{' . trim( $value ) . '}', $open_tag . trim( $value ) . $close_tag, $html );
	}