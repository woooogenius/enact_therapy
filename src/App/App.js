import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';

import MainPanel from '../views/MainPanel';

import './attachErrorHandler';

import css from './App.module.less';
import MainView from '../views/MainView';
import KeyBoard from '../views/KeyBoard';
import Dashboard from '../views/Dashboard';
import AudioPlayer from '../views/AudioPlayer';
import Login from '../views/Login';
const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => {

		return (
			<Panels {...props}>
				<MainPanel />
				{/* <Login /> */}

			</Panels>

		);

	}
});

export default ThemeDecorator(App);

