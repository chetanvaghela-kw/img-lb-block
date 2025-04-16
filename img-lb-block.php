<?php
/**
 * Plugin Name: Image with Lightbox Block
 * Plugin URI : https://wordpress.org/plugins/image-with-ightbox-block/
 * Description: This plugin provides a quick and easy way to add Image with Lightbox's block using Gutenberg visual editor.
 * Tags: blocks, Lightbox, gutenberg Lightbox, editor, Lightbox block
 * Author: Chetan Vaghela
 * Author URI: http://profiles.wordpress.org/thechetanvaghela
 * Text Domain: img-lb-block
 * Version: 1.0
 * License: GPLv3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package Lightbox_Block_For_Gutenberg
 */

// define plugin dir path.
define( 'IMG_LB_BLOCK_FOR_GUTENBERG_DIR', plugin_dir_path( __FILE__ ) );

// Include class file.
require_once plugin_dir_path( __FILE__ ) . '/includes/class-img-lb-block-for-gutenberg.php';

/**
 * Register activation.
 */
function gutenberg_img_lb_block_activation() {
	// Activation code.
}
register_activation_hook( __FILE__, 'gutenberg_img_lb_block_activation' );

/**
 * Register deactivation.
 */
function gutenberg_img_lb_block_deactivation() {
	// Deactivation code.
}
register_deactivation_hook( __FILE__, 'gutenberg_img_lb_block_deactivation' );

/**
 * Plugin init.
 */
function gutenberg_img_lb_block_init() {
	new Img_Lb_Block_For_Gutenberg();
}
add_action( 'plugins_loaded', 'gutenberg_img_lb_block_init' );
