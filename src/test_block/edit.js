/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
	useBlockProps, 
	RichText,
	AlignmentControl,
	BlockControls,
	InspectorControls,
	PanelColorSettings
 } from '@wordpress/block-editor';

 import { 
	TextControl, 
	PanelBody,
	PanelRow,
	ToggleControl,
	ExternalLink
 } from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
	const {content, align, backgroundColor, textColor, cbLink, linkLabel, hasLinkNofollow} = attributes;

	const blockProps = useBlockProps({
		className: `has-text-align-${align}`
	});
	const onChangeContent = ( newContent )=>{
		setAttributes({content:newContent})
	}
	const onChangeAlign = (newAlign) => {
		setAttributes({
			align: newAlign=== undefined ? 'none' : newAlign,
		})
	}
	const onChangeBackgroundColor=(newBackgroundColor)=>{
		setAttributes({backgroundColor:newBackgroundColor})
	}
	const onChangeTextColor=(newTextColor)=>{
		setAttributes({textColor:newTextColor})
	}
	const onChangeCblink=(newLink)=>{
		setAttributes({cbLink: newLink===undefined ? '' : newLink})
	}
	const onChangeLinkLabel=(newLinklabel)=>{
		setAttributes({linkLabel: newLinklabel===undefined ? '' : newLinklabel})
	}
	const toggleNofollow=()=>{
		setAttributes({hasLinkNofollow: !hasLinkNofollow})
	}

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={__('Color settings','block-test')}
					initialOpen={false}
					colorSettings={
						[
							{
								value:textColor,
								onChange:onChangeTextColor,
								label:__('Text color','block-test')
							},
							{
								value:backgroundColor,
								onChange:onChangeBackgroundColor,
								label:__('Background color','block-test')
							}
						]
					}
				/>
				<PanelBody
					title={__('Link Setting','block-test')}
					initialOpen={true}
				>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__('CB link','block-test')}
								value={ cbLink }
								onChange={ onChangeCblink }
								help={__('Add your link','block-test')}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__('Link label','block-test')}
								value={ linkLabel }
								onChange={ onChangeLinkLabel }
								help={__('Add link label','block-test')}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<ToggleControl
								label="Add rel = nofollow"
								help={hasLinkNofollow ? "Has rel nofollow." : "No rel nofollow."}
								checked={hasLinkNofollow}
								onChange={toggleNofollow}
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentControl
					value={attributes.align}
					onChange={onChangeAlign}
				/>
			</BlockControls>

			<div 
				{ ...blockProps}
				style={ { backgroundColor: backgroundColor } }
			>
				<RichText
					tagName="p"
					onChange={ onChangeContent }
					allowedFormats={['core/bold','core/italic']}
					value={ content }
					placeholder={__('Write your text...','block-test')}
					style={ { color: textColor } }
				/>
				<ExternalLink
					href={ cbLink }
					className="cb_button"
					rel={ hasLinkNofollow ? "nofollow" : ""}
				>
					{ linkLabel }
				</ExternalLink>
			</div>
			
		</>
	);
}