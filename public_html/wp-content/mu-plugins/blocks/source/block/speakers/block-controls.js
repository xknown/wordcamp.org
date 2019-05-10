/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Button, Placeholder } = wp.components;
const { Component }           = wp.element;
const { __ }                  = wp.i18n;

/**
 * Internal dependencies
 */
import { PlaceholderSpecificMode } from '../../component/block-controls';
import { getOptionLabel }          from '../../component/item-select';
import SpeakersBlockContent        from './block-content';
import SpeakersSelect              from './speakers-select';
import { LABEL }                   from './index';

/**
 * Component for displaying a UI within the block.
 */
class SpeakersBlockControls extends Component {
	/**
	 * Render the internal block UI.
	 *
	 * @return {Element}
	 */
	render() {
		const { icon, attributes, setAttributes, blockData } = this.props;
		const { mode } = attributes;
		const { options } = blockData;

		let output;

		switch ( mode ) {
			case 'all' :
				output = (
					<SpeakersBlockContent { ...this.props } />
				);
				break;

			case 'wcb_speaker' :
			case 'wcb_speaker_group' :
				output = (
					<PlaceholderSpecificMode
						label={ getOptionLabel( mode, options.mode ) }
						icon={ icon }
						content={
							<SpeakersBlockContent { ...this.props } />
						}
						placeholderChildren={
							<SpeakersSelect { ...this.props } />
						}
					/>
				);
				break;

			default :
				output = (
					<Placeholder
						className={ classnames( 'wordcamp-block-edit-placeholder', 'wordcamp-block-edit-placeholder-no-mode' ) }
						icon={ icon }
						label={ LABEL }
					>
						<div className="wordcamp-block-edit-mode-option">
							<Button
								isDefault
								isLarge
								onClick={ () => {
									setAttributes( { mode: 'all' } );
								} }
							>
								{ getOptionLabel( 'all', options.mode ) }
							</Button>
						</div>

						<div className="wordcamp-block-edit-mode-option">
							<SpeakersSelect
								icon={ icon }
								label={ __( 'Choose specific speakers or groups', 'wordcamporg' ) }
								{ ...this.props }
							/>
						</div>
					</Placeholder>
				);
				break;
		}

		return output;
	}
}

export default SpeakersBlockControls;
