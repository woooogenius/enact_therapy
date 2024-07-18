import Button, { ButtonBase } from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import Panels, { Panel, Header } from '@enact/sandstone/Panels';
import { TabLayout, Tab } from "@enact/sandstone/TabLayout";
// import css from '../App/App.module.less'


const MainPanel = kind({
	name: 'MainPanel',

	render: function (props) {

		const Test = () => <Test />;

		return (

			<Panels>
				<Panel {...props}>
					<Header title="Hello world!" />

					<ButtonBase >
						<Button>button1</Button>
					</ButtonBase>
					<ButtonBase >
						<Button>button2</Button>
					</ButtonBase>
				</Panel>

			</Panels>
		);
	}
});

export default MainPanel;
