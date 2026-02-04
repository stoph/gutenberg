/**
 * Internal dependencies
 */
import remove from './remove';

/**
 * Strips scripts and on* attributes from HTML.
 *
 * @param {string} html HTML to sanitize.
 *
 * @return {string} The sanitized HTML.
 */
export default function safeHTML( html ) {
	if ( typeof html !== 'string' ) {
		return '';
	}

	const { body } = document.implementation.createHTMLDocument( '' );
	body.innerHTML = html;
	const elements = body.getElementsByTagName( '*' );
	let elementIndex = elements.length;

	while ( elementIndex-- ) {
		const element = elements[ elementIndex ];

		if ( element.tagName === 'SCRIPT' ) {
			remove( element );
		} else {
			let attributeIndex = element.attributes.length;

			while ( attributeIndex-- ) {
				const { name: key } = element.attributes[ attributeIndex ];

				if ( key.startsWith( 'on' ) ) {
					element.removeAttribute( key );
				}
			}
		}
	}

	return body.innerHTML;
}
