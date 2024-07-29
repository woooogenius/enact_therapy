import Input from "@enact/sandstone/Input";
import { Panel } from "@enact/sandstone/Panels";
import Popup from "@enact/sandstone/Popup";
import css from '../App/App.module.less'
import Button from "@enact/sandstone/Button";
import Icon from "@enact/sandstone/Icon";
import IconItem from "@enact/sandstone/IconItem";
import { useState } from "react";
export default function Login({ loginSuccess }) {

    const [inputUserId, setInputUserId] = useState('')

    const onChangeUserId = () => {
        window.localStorage.setItem('userId', inputUserId);
        loginSuccess();
    }
    return (
        <Panel style={{ position: 'relative' }}>

            <div className={css.login_cont}>

                <h4 style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '45px' }}>LOGIN</h4>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Input type="text" size="small" style={{ width: '400px' }} placeholder="아이디 입력" onChange={(e) => setInputUserId(e.target)} />
                    <IconItem style={{ background: '#1b1b1b', borderRadius: '50%' }} bordered onClick={onChangeUserId}><Icon>arrowlargeright</Icon></IconItem>

                </div>

            </div>


        </Panel>
    )
}
