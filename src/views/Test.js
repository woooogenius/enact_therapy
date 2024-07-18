import { Header, Panel } from "@enact/sandstone/Panels";
const Test = kind({
    name: 'Test',

    render: function (props) {


        return (

            <Panel {...props}>
                <Header title="test!" />

            </Panel>

        );
    }
});