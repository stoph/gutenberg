/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import SiteHub from '../site-hub';
import Navigation from '../navigation';
import SaveButton from '../save-button';
import { store as bootStore } from '../../store';
import './style.scss';

function renderIcon( icon: string | React.ReactNode ) {
	if ( typeof icon === 'string' && icon.startsWith( 'dashicons-' ) ) {
		return <span className={ `dashicons ${ icon }` } />;
	}
	if ( typeof icon === 'string' && icon.startsWith( 'data:' ) ) {
		return (
			<img src={ icon } alt="" className="boot-sidebar__app-icon-img" />
		);
	}
	return icon;
}

function AppHeader() {
	const appInfo = useSelect(
		( select ) => select( bootStore ).getAppInfo(),
		[]
	);

	if ( ! appInfo ) {
		return null;
	}

	return (
		<div className="boot-sidebar__app-header">
			<div className="boot-sidebar__app-name-row">
				{ appInfo.icon && (
					<div className="boot-sidebar__app-icon">
						{ renderIcon( appInfo.icon ) }
					</div>
				) }
				<div className="boot-sidebar__app-name">{ appInfo.name }</div>
			</div>
			{ appInfo.description && (
				<div className="boot-sidebar__app-description">
					{ appInfo.description }
				</div>
			) }
		</div>
	);
}

export default function Sidebar() {
	return (
		<div className="boot-sidebar__scrollable">
			<SiteHub />
			<AppHeader />
			<div className="boot-sidebar__content">
				<Navigation />
			</div>
			<div className="boot-sidebar__footer">
				<SaveButton />
			</div>
		</div>
	);
}
