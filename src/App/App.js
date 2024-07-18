import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';

import MainPanel from '../views/MainPanel';

import './attachErrorHandler';

import css from './App.module.less';
import MainView from '../views/MainView';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: function (props) {
		// <Panels {...props} className={css.App}>
		// 	<MainPanel />
		// </Panels>
		return (
			<Panels {...props}>
				{/* <MainPanel /> */}
				<MainView />
			</Panels>

		);

	}
});

export default ThemeDecorator(App);

