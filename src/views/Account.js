import { Panel } from "@enact/sandstone/Panels";
import css from '../App/App.module.less'
import Dropdown from '@enact/sandstone/Dropdown';
import Input from '@enact/sandstone/Input';
import DatePicker from '@enact/sandstone/DatePicker';
import Icon from "@enact/sandstone/Icon";
import Button from '@enact/sandstone/Button';
import Checkbox from '@enact/sandstone/Checkbox';

export default function Account() {
    return (
        <div style={{ padding: '0px 50px' }}>
            <div className={css.head_title}>
                <h3 className={css.head_tit}>사용자 관리</h3>
            </div>

            <div className={css.search_cont}>

                <Dropdown width='small' size="small" inline defaultSelected={0} >
                    {['아이디', '이름']}
                </Dropdown>

                <Input size="small" placeholder="아이디 또는 이름" type="text" style={{ width: '400px' }} />
                <Input size="small" placeholder="날짜 입력" type="date" style={{ width: '300px' }} />
                <Icon>minus</Icon>
                <Input size="small" placeholder="날짜 입력" type="date" style={{ width: '300px' }} />


                <Button size="small" >
                    조회
                </Button>

            </div>

            <div className={css.line}></div>


            <div style={{ padding: '0' }}>
                <ul className={css.account_cont}>
                    <li className={css.account_check}>
                        <Checkbox />
                    </li>

                    <li className={css.account_id}>아이디</li>
                    <li className={css.account_name}>이름</li>
                    <li className={css.account_date}>가입날짜</li>
                    <li className={css.account_btn}>
                    </li>
                </ul>

                <ul className={css.account_data_cont}>
                    <li className={css.account_check}>
                        <Checkbox />
                    </li>

                    <li className={css.account_id}>admin</li>
                    <li className={css.account_name}>관리자</li>
                    <li className={css.account_date}>2024-07-26</li>
                    <li className={css.account_btn}>
                        <button className={css.account_edit_btn}>정보수정</button>
                    </li>
                </ul>

            </div>



        </div>
    )
}
