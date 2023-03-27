import { __ } from '@wordpress/i18n';
import { 
	useBlockProps, 
	InnerBlocks
 } from '@wordpress/block-editor';

import { registerBlockType } from '@wordpress/blocks';

const TEMPLATE = [ [ 'core/columns', { backgroundColor: 'yellow', verticalAlignment: 'center' }, [
	[ 'core/column', { templateLock: 'all' }, [
		[ 'core/image' ],
	] ],
	[ 'core/column', { templateLock: 'all' }, [
		[ 'block-namespace/block-test', { placeholder: 'Enter side content...' } ],
	] ],
] ] ];

registerBlockType('custom-blocks/custom-blocks-container-block', {
	title: __( 'Container', 'block-test' ),
	category: 'design',

/**
 * @see ./edit.js
 */
edit( { className } ) {
			
			return(
					<div className={ className }>
							<InnerBlocks
									template={ TEMPLATE }
									templateLock="all"
							/>
					</div>
			)
	},

/**
 * @see ./save.js
 */
save() {
			const blockProps = useBlockProps.save();
			return(
					<div { ...blockProps }>
							<InnerBlocks.Content />
					</div>
			)
	},
});