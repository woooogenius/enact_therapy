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
    const [inputUserPasswd, setInputUserPasswd] = useState('')

    const submitUserId = () => {
        if (inputUserId == '' || inputUserPasswd == '') return;

        window.localStorage.setItem('userId', inputUserId);
        window.localStorage.setItem('userPasswd', inputUserPasswd);

        loginSuccess();
    }

    return (
        <Panel style={{ position: 'relative' }}>

            <div className={css.login_cont}>

                <h4 style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '60px' }}>LOGIN</h4>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <Input type="text" size="small" style={{ width: '600px' }} placeholder="아이디 입력" onChange={(e) => setInputUserId(e.target)} />
                        <Input type="text" size="small" style={{ width: '600px', marginTop: '10px' }} placeholder="패스워드 입력" onChange={(e) => setInputUserPasswd(e.target)} />
                    </form>

                    <Button size="small" style={{ marginTop: '20px' }} onClick={submitUserId}>로그인</Button>

                </div>

            </div>


        </Panel>
    )
}
