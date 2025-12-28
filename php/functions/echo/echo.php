<?php
	function e( $item = '' ) {

		$item = str_replace( array( '&nbsp;', "\t", "\r" ), ' ', $item );
		$item = str_replace( array( "\n", '<br>', '<br />' ), ' ', $item );
		$item = preg_replace( '/\s+/', ' ', $item );

		if ( preg_match( '/[áéíóúÁÉÍÓÚñ]/', $item ) ) {
			echo ( utf8_encode( $item ) );
		} else {
			echo ( $item );
		}
	}
?>
