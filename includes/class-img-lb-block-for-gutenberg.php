<?php
/**
 * Checking class_exists or not.
 *
 * @package Img_Lb_Block_For_Gutenberg
 * @subpackage WordPress
 */

if ( ! class_exists( 'Img_Lb_Block_For_Gutenberg' ) ) {
	/**
	 * Declare Image-with-lightbox block for gutenberg class.
	 */
	class Img_Lb_Block_For_Gutenberg {
		/**
		 * Calling class construct.
		 */
		public function __construct() {
			add_action( 'init', array( $this, 'gutenberg_img_lb_block_register' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'gutenberg_img_lb_block_enqueue_script' ) );
		}

		/**
		 * Image-with-lightbox block for gutenber register block and script.
		 */
		public function gutenberg_img_lb_block_register() {

			// Register style.
			wp_register_style( 'img-lb-gutenberg-block', plugin_dir_url( __FILE__ ) . '../assets/css/img-lb-gutenberg-block.css', array(), true );

			// Register block.
			$build_dir = IMG_LB_BLOCK_FOR_GUTENBERG_DIR . 'build';
			register_block_type( $build_dir );
		}

		/**
		 * Enqueue script & style.
		 */
		public function gutenberg_img_lb_block_enqueue_script() {
			global $post;
			if ( function_exists( 'has_block' ) && has_block( 'img-lb-block-for-gutenberg/img-lb', $post ) ) {
				// Enqueue public script.
				wp_register_script( 'img-lb-gutenberg-block', plugin_dir_url( __FILE__ ) . '../assets/js/img-lb-gutenberg-block.js', array(), true, true );
				wp_enqueue_script( 'img-lb-gutenberg-block' );

				// Enqueue style.
				wp_enqueue_style( 'img-lb-gutenberg-block' );
			}
		}
	}
}
