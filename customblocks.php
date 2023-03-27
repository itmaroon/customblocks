<?php
/*
Plugin Name: Custom Blocks
Description: グーテンベルクのブロックをカスタマイズしたものやオリジナルで作成したブロックを集めたプラグインです。
Version: 1.0.0
Author:WebクリエイターItmaroon
Author URI:https://itmaroon.net
*/

//block.jsonからオリジナルブロックの読込
function customblocks_register_block() {
	register_block_type( __DIR__.'/build/test_block' );
	register_block_type( __DIR__.'/build/second_block' );
}
add_action( 'init', 'customblocks_register_block' );

//コアブロックのカスタマイズ
function custamize_enqueue() {
	wp_enqueue_script( 'custamize-script',
			plugins_url( 'custamize.js', __FILE__ ).'?'.date('YmdHis'),
			array( 'wp-blocks', 'wp-block-editor', 'wp-element', 'wp-i18n' )
	);
}
add_action( 'enqueue_block_editor_assets', 'custamize_enqueue' );

function custamize_stylesheet() {
	wp_enqueue_style( 'custamize-style', plugins_url( 'css/custamize.css', __FILE__ ).'?'.date('YmdHis') );
}
add_action( 'enqueue_block_assets', 'custamize_stylesheet' );