import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';

import MainPanel from '../views/MainPanel';

import './attachErrorHandler';

import css from './App.module.less';
import MainView from '../views/MainView';
import KeyBoard from '../views/KeyBoard';
import AudioTest from '../views/AudioTest';
import AudioTest2 from '../views/AudioTest2';

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
				{/* <MainView /> */}
				{/* <AudioTest /> */}
				<AudioTest2 />
			</Panels>

		);

	}
});

export default ThemeDecorator(App);

