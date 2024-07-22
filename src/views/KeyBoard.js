import Button from "@enact/sandstone/Button";
import { useEffect, useRef, useState } from "react";
import Slider from '@enact/sandstone/Slider';
import css from '../App/App.module.less'
import { Header, Panel } from "@enact/sandstone/Panels";
import Icon from '@enact/sandstone/Icon';
import Image from '@enact/sandstone/Image';
import Popup from '@enact/sandstone/Popup';
import axios from "axios";
import MediaPlayer from '@enact/sandstone/MediaPlayer';
import { MediaSlider } from '@enact/sandstone/MediaPlayer'
import keyboard from '@enact/webos/keyboard';
import Input from '@enact/sandstone/Input';


const KeyBoard = (props) => {

    // const keyboardShow = () => {
    //     keyboard.isShowing(true);
    // }




    return (
        <div {...props}>
            <Panel>
                <Header type="wizard" title="AI Sound Therapy" style={{ padding: '0px 0px' }} />
            </Panel>


            <form>
                <Input>

                </Input>
            </form>



        </div>


    );
};

export default KeyBoard;