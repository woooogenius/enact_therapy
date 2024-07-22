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
import Input, { InputFieldDecorator } from '@enact/sandstone/Input';



const MainView = (props) => {

    // const keyboardShow = () => {
    //     keyboard.isShowing(true);
    // }
    const keyfun = (event) => {
        window.alert(event.keyCode);
    };
    const sounds = [
        "music/LGRest_06_MusicPN(mix).wav",
        "music/LGRest_05_BB432Only.wav",
    ]



    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);

    const audioRef2 = useRef(null);
    const [playing2, setPlaying2] = useState(false);
    const [currentTime2, setCurrentTime2] = useState(0);
    const [duration2, setDuration2] = useState(0);
    const [volume2, setVolume2] = useState(0.5);

    const [isPlayingMode, setIsPlayingMode] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [showVolumePopup, setShowVolumePopup] = useState(false);


    //stt
    const [recognizedText, setRecognizedText] = useState('');
    const handleVoiceInput = () => {
        if (window.webOS && window.webOS.service) {
            window.webOS.service.webOS.service.request('luna://com.webos.service.voice', {
                method: 'start',
                parameters: {
                    subscribe: true,
                    mode: 'continuous'
                },
                onSuccess: (res) => {
                    if (res.event === 'final') {
                        setRecognizedText(res.text);
                    }
                },
                onFailure: (err) => {
                    console.error(err)
                },
            });
        }
    }


    // const playMode = (mode) => {
    //     setIsPlayingMode(mode);
    //     setShowPopup(true);

    //     onClickStop();

    //     audioRef.current.play();
    //     audioRef2.current.play();
    //     setPlaying(true);
    //     setPlaying2(true);

    //     setTimeout(() => {
    //         setShowPopup(false);
    //     }, 1000);
    // };

    const playMode = async (mode) => {
        setIsPlayingMode(mode);
        setShowPopup(true);
        onClickStop();

        try {
            await audioRef.current.play();
            await audioRef2.current.play();
            setPlaying(true);
            setPlaying2(true);

        } catch (error) {
            console.log(error);
        }

        setTimeout(() => {
            setShowPopup(false);
        }, 1000);
    };


    const resumeMode = () => {
        if (!playing) {
            audioRef.current.play();
            setPlaying(true);
        }

        if (!playing2) {
            audioRef2.current.play();
            setPlaying2(true);
        }
    }


    const onTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const onLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };
    const onSliderChange = (event) => {
        const time = event.value;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const onTimeUpdate2 = () => {
        setCurrentTime2(audioRef2.current.currentTime);
    };

    const onLoadedMetadata2 = () => {
        setDuration2(audioRef2.current.duration);
    };
    const onSliderChange2 = (event) => {
        const time = event.value;
        audioRef2.current.currentTime = time;
        setCurrentTime2(time);
    };

    const onClickStop = async () => {
        await audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
        setPlaying(false);

        await audioRef2.current.pause();
        audioRef2.current.currentTime = 0;
        setCurrentTime2(0);
        setPlaying2(false);
    }
    const onClickPause = async () => {
        await audioRef.current.pause()
        await audioRef2.current.pause()
        setPlaying(false)
        setPlaying2(false)
    }

    const onClickVolumeControl = () => {
        setShowVolumePopup(true);
    }
    const onCloseVolumeControl = () => {
        setShowVolumePopup(false);
    }

    const onVolumeChange = (e) => {
        const getVolume = e.value / 100;
        audioRef.current.volume = getVolume;
        setVolume(getVolume);
    }
    const onVolumeChange2 = (e) => {
        const getVolume = e.value / 100;
        audioRef2.current.volume = getVolume;
        setVolume2(getVolume);
    }

    const onEnded = () => {
        setPlaying(false);
        setCurrentTime(0);
    };

    const onEnded2 = () => {
        setPlaying2(false);
        setCurrentTime2(0);
    };
    // useEffect(() => {
    //     if (playing) {
    //         audioRef.current.play();
    //     } else {
    //         audioRef.current.pause();
    //     }
    // }, [playing])

    // useEffect(() => {
    //     if (playing2) {
    //         audioRef2.current.play();
    //     } else {
    //         audioRef2.current.pause();
    //     }
    // }, [playing2])



    // async function getVolume() {
    //     try {
    //         const response = await axios.get(`https://cors-anywhere.herokuapp.com/http://13.124.72.117:10001/api/volume`, {
    //             params: { userId: 'user100' }
    //         });
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // async function postCommandProcessing() {
    //     try {
    //         const response = await axios.post(`https://cors-anywhere.herokuapp.com/http://13.124.72.117:10001/api/command`, {
    //             params: {
    //                 userId: "user100",
    //                 therapyCategory: "STRESS",
    //                 speech: "SPEECH_COMMAD",
    //             },
    //         })
    //         console.log(response.data);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    // useEffect(() => {
    //     getVolume();
    //     postCommandProcessing();
    // }, []);


    return (
        <div {...props} className={css.mainView}>
            <Panel>
                <Header type="wizard" title="AI Sound Therapy" style={{ padding: '0px 0px' }} />
            </Panel>


            <Popup open={showPopup}>
                <div className={css.popup}>
                    {isPlayingMode}
                </div>
            </Popup>


            <Popup open={showVolumePopup} style={{ width: '50%', height: '250px', margin: '50px auto' }}>
                <div className={css.volume_pop}>

                    <div className={css.volume_tit}>
                        <div>Volume</div>
                        <button className={css.volume_close} onClick={onCloseVolumeControl}>x</button>
                    </div>
                    <div className={css.blank}></div>

                    <div className={css.volume_box}>
                        <div className={css.volume_flex}>
                            <div>Main</div>
                            <div className={css.slider}>
                                <Slider
                                    min={0}
                                    max={100}
                                    value={volume * 100}
                                    onChange={onVolumeChange}
                                    backgroundProgress={volume * 100}
                                    tooltip
                                />
                            </div>
                        </div>


                        <div className={css.volume_flex}>
                            <div>Binaural</div>
                            <div className={css.slider}>
                                <Slider
                                    min={0}
                                    max={100}
                                    value={volume2 * 100}
                                    onChange={onVolumeChange2}
                                    backgroundProgress={volume2 * 100}
                                    tooltip
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </Popup>



            <div className={css.img_flex}>
                <div onClick={() => playMode('STRESS MODE')} className={`${css.mode_box} ${playing && isPlayingMode === 'STRESS MODE' ? css.pulseAnimation : ''}`}>
                    <div className={css.img_box}>
                        <Image src='images/stress_mode.jpg' className={css.mode_img} />
                    </div>
                    <div className={css.img_tit}>Stress Mode</div>
                </div>

                <div onClick={() => playMode('FOCUS MODE')} className={`${css.mode_box} ${playing && isPlayingMode === 'FOCUS MODE' ? css.pulseAnimation : ''}`}>
                    <div className={css.img_box}>
                        <Image src='images/focus_mode.jpeg' className={css.mode_img} />
                    </div>
                    <div className={css.img_tit}>Focus Mode</div>
                </div>

                <div onClick={() => playMode('SLEEP MODE')} className={`${css.mode_box} ${playing && isPlayingMode === 'SLEEP MODE' ? css.pulseAnimation : ''}`}>
                    <div className={css.img_box}>
                        <Image src='images/sleep_mode.jpeg' className={css.mode_img} />
                    </div>
                    <div className={css.img_tit}>Sleep Mode</div>
                </div>

                <div onClick={() => playMode('MEDITATION MODE')} className={`${css.mode_box} ${playing && isPlayingMode === 'MEDITATION MODE' ? css.pulseAnimation : ''}`}>
                    <div className={css.img_box}>
                        <Image src='images/meditation_mode.png' className={css.mode_img} />
                    </div>
                    <div className={css.img_tit}>Meditaion Mode</div>
                </div>
            </div>



            <audio
                ref={audioRef}
                // src="music/LGRest_06_MusicPN(mix).wav"
                // src="music/longnight.mp3"
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={onEnded}
                controls
            >
                <source src="music/LGRest_06_MusicPN(mix).wav" type="audio/wav" />
            </audio>


            <audio
                ref={audioRef2}
                // src="music/LGRest_05_BB432Only.wav"
                // src="music/sleepless.mp3"
                onTimeUpdate={onTimeUpdate2}
                onLoadedMetadata={onLoadedMetadata2}
                onEnded={onEnded2}
                controls
            >
                <source src="music/LGRest_05_BB432Only.wav" type="audio/wav" />
            </audio>



            <div className={css.blank}></div>

            {/* <div className={css.slider_text}>Main Audio</div>
            <div className={css.slider}>
                <Slider
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={onSliderChange}
                    disabled
                />
            </div>

            <div className={css.icon_flex}>
                <Icon>soundmute</Icon>
                <div className={css.slider}>
                    <Slider
                        min={0}
                        max={100}
                        value={volume * 100}
                        onChange={onVolumeChange}
                        backgroundProgress={volume * 100}
                        tooltip
                    />
                </div>
                <Icon>sound</Icon>
            </div> */}



            {/* <div className={css.slider_text}>Binaural Audio</div>
            <div className={css.slider}>
                <Slider
                    min={0}
                    max={duration2}
                    value={currentTime2}
                    onChange={onSliderChange2}
                    disabled
                />
            </div>
            <div className={css.icon_flex}>
                <Icon>soundmute</Icon>
                <div className={css.slider}>
                    <Slider
                        min={0}
                        max={100}
                        value={volume2 * 100}
                        onChange={onVolumeChange2}
                        backgroundProgress={volume2 * 100}
                        tooltip
                    />
                </div>
                <Icon>sound</Icon>
            </div> */}

            <div className={css.bottomBox}>
                <div className={css.bottomSliderBox}>

                    <div className={css.bottomTextFlex}>
                        <h2 >{isPlayingMode ? isPlayingMode : 'Therapy Mode'}</h2>
                        <Button size="small" className={css.volumeButton} onClick={onClickVolumeControl}>
                            Volume
                        </Button>
                    </div>

                    <div className={css.main_slider}>
                        <Slider
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={onSliderChange}
                            disabled
                        />
                    </div>

                    <div className={css.button_flex}>
                        <div className={css.musicPlayerButton}>
                            <button disabled={playing && playing2} onClick={resumeMode} className={css.buttonStyle}>
                                {
                                    <Icon>play</Icon>
                                }
                            </button>
                        </div>

                        <div className={css.musicPlayerButton} >
                            <button onClick={onClickPause} className={css.buttonStyle}>
                                {
                                    <Icon>pause</Icon>
                                }
                            </button>
                        </div>
                        <div className={css.musicPlayerButton}>
                            <button onClick={onClickStop} className={css.buttonStyle} >
                                <Icon>stop</Icon>
                            </button>
                        </div>

                    </div>

                </div>

            </div>

            {/* <div className={css.stt}>
                <Button size="small" onClick={handleVoiceInput}>Voice Input</Button>
                <div>
                    <p>Recognized Text:{recognizedText}</p>
                </div>
            </div> */}

            {/* <Button size="small" onClick={keyboardShow} >
                key
            </Button> */}

            <form>
                <Input className={css.input} onChange={keyfun} onFocus={handleVoiceInput} value={'test'} />
            </form>












        </div >
    );
};

export default MainView;