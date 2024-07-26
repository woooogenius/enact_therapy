import Input from "@enact/sandstone/Input";
import { Panel } from "@enact/sandstone/Panels";
import Popup from "@enact/sandstone/Popup";
import css from '../App/App.module.less'
import Button from "@enact/sandstone/Button";
import Icon from "@enact/sandstone/Icon";
import IconItem from "@enact/sandstone/IconItem";
export default function Login() {
    return (
        <Panel style={{ position: 'relative' }}>


            <div className={css.login_cont}>

                <h4 style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '45px' }}>LOGIN</h4>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Input type="text" size="small" style={{ width: '400px' }} placeholder="아이디 입력" />
                    <IconItem style={{ background: '#1b1b1b', borderRadius: '50%' }} bordered><Icon>arrowlargeright</Icon></IconItem>

                </div>

            </div>


        </Panel>
    )
}
