
// "music/LGRest_06_MusicPN(mix).wav",
//     "music/LGRest_05_BB432Only.wav",


import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@enact/sandstone/Button';
import Slider from '@enact/sandstone/Slider';
import css from '../App/App.module.less'
import Image from '@enact/sandstone/Image';
import Icon from '@enact/sandstone/Icon';
import { Header, Panel } from '@enact/sandstone/Panels';
import Popup from '@enact/sandstone/Popup';
import TabLayout, { Tab } from '@enact/sandstone/TabLayout';
import { useNavigate } from 'react-router-dom';


const AudioPlayer = () => {
    const audioContext = useRef(null);
    const audioBuffer1 = useRef(null);
    const audioBuffer2 = useRef(null);
    const source1 = useRef(null);
    const source2 = useRef(null);
    const gainNode1 = useRef(null);
    const gainNode2 = useRef(null);

    const [volume1, setVolume1] = useState(0.5);
    const [volume2, setVolume2] = useState(0.5);
    const [isPlaying, setIsPlaying] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [pauseTime, setPauseTime] = useState(0);
    const [mode, setMode] = useState('');

    const [showModePop, setShowModePop] = useState(false);
    const [showVolumePop, setShowVolumePop] = useState(false);
    const [showMenuPop, setShowMenuPop] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);

    const [audioFile, setAudioFile] = useState("music/LGRest_06_MusicPN(mix).wav");
    const [audioFile2, setAudioFile2] = useState("music/LGRest_05_BB432Only.wav");


    useEffect(() => {
        // 오디오 컨텍스트 생성
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();

        // 오디오 파일 로드 및 디코딩
        const loadAudioFile = async (url, bufferRef) => {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.current.decodeAudioData(arrayBuffer);
            bufferRef.current = audioBuffer;
        };

        loadAudioFile(audioFile, audioBuffer1);
        loadAudioFile(audioFile2, audioBuffer2);
        // loadAudioFile("https://sample-videos.com/audio/mp3/wave.mp3", audioBuffer2);

        return () => {
            // 컴포넌트가 언마운트될 때 오디오 컨텍스트를 종료
            if (audioContext.current) {
                audioContext.current.close();
            }
        };


    }, [audioFile, audioFile2]);


    //재생시간 업데이트 
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(audioContext.current.currentTime - startTime)
            }, 100)
        }
        return () => clearInterval(interval);
    }, [isPlaying, startTime])



    const playBoth = (mode) => {
        stopBoth();
        // postCommandProcessing();
        setMode(mode);

        if (audioBuffer1.current && audioBuffer2.current) {
            // 일시정지된 시간부터 재생 시작
            let offset = pauseTime - startTime;
            if (offset < 0) offset = 0;


            source1.current = audioContext.current.createBufferSource();
            source2.current = audioContext.current.createBufferSource();
            gainNode1.current = audioContext.current.createGain();
            gainNode2.current = audioContext.current.createGain();

            source1.current.buffer = audioBuffer1.current;
            source2.current.buffer = audioBuffer2.current;

            source1.current.connect(gainNode1.current);
            source2.current.connect(gainNode2.current);
            gainNode1.current.connect(audioContext.current.destination);
            gainNode2.current.connect(audioContext.current.destination);

            gainNode1.current.gain.value = volume1;
            gainNode2.current.gain.value = volume2;

            source1.current.start(0, offset);
            source2.current.start(0, offset);

            setStartTime(audioContext.current.currentTime - offset);
            setIsPlaying(true);
            setShowModePop(true);
            setTimeout(() => {
                setShowModePop(false);
            }, 1000);

            //음원이 끝났을때
            const handleEnded = () => {
                if (source1.current) source1.current.onended = null;
                if (source2.current) source2.current.onended = null;
                stopBoth();
                setIsPlaying(false);
            };

            source1.current.onended = handleEnded;
            source2.current.onended = handleEnded;
        }

    };
    // const pauseBoth = () => {
    //     if (source1.current && source2.current && isPlaying) {
    //         source1.current.stop(0);
    //         source2.current.stop(0);

    //         setPauseTime(audioContext.current.currentTime);
    //         setIsPlaying(false);
    //     }
    // };
    const pauseBoth = () => {
        if (source1.current && source2.current && isPlaying) {
            audioContext.current.suspend().then(() => {
                setPauseTime(audioContext.current.currentTime);
                setIsPlaying(false);
            });
        }
    };
    const resumeBoth = () => {
        if (audioContext.current.state === 'suspended') {
            audioContext.current.resume().then(() => {
                setIsPlaying(true);
            });
        } else if (!isPlaying && audioBuffer1.current && audioBuffer2.current) {
            let offset = pauseTime - startTime;
            if (offset < 0) offset = 0;

            source1.current = audioContext.current.createBufferSource();
            source2.current = audioContext.current.createBufferSource();
            gainNode1.current = audioContext.current.createGain();
            gainNode2.current = audioContext.current.createGain();

            source1.current.buffer = audioBuffer1.current;
            source2.current.buffer = audioBuffer2.current;

            source1.current.connect(gainNode1.current);
            source2.current.connect(gainNode2.current);
            gainNode1.current.connect(audioContext.current.destination);
            gainNode2.current.connect(audioContext.current.destination);

            gainNode1.current.gain.value = volume1;
            gainNode2.current.gain.value = volume2;

            source1.current.start(0, offset);
            source2.current.start(0, offset);

            setStartTime(audioContext.current.currentTime - offset);
            setIsPlaying(true);

            source1.current.onended = () => {
                stopBoth();
                setIsPlaying(false);
            };

            source2.current.onended = () => {
                stopBoth();
                setIsPlaying(false);
            };

            setMode(mode);
        }
    };



    const stopBoth = () => {
        if (source1.current) {
            source1.current.stop(0);
            source1.current.onended = null;
        }
        if (source2.current) {
            source2.current.stop(0);
            source2.current.onended = null;
        }

        setPauseTime(0);
        setStartTime(0);
        setIsPlaying(false);
        setMode('');
        setCurrentTime(0);

    };

    const handleVolumeChange1 = (event) => {
        const value = event.value;
        setVolume1(value);
        if (gainNode1.current) {
            gainNode1.current.gain.value = value;
        }
    };

    const handleVolumeChange2 = (event) => {
        const value = event.value;
        setVolume2(value);
        if (gainNode2.current) {
            gainNode2.current.gain.value = value;
        }
    };
    const formatTooltip = (value) => {
        return `${Math.round(value * 100)}`;
    };


    // async function postCommandProcessing() {
    //     try {
    //         const response = await fetch('http://13.124.72.117:10001/api/command', {
    //             method: 'POST',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 userId: "user100",
    //                 therapyCategory: mode,
    //                 speech: "SPEECH_COMMAND",
    //             })
    //         });

    //         if (!response.ok) {
    //             console.log('post command err')
    //         }

    //         const data = await response.json();
    //         setAudioFile(data.soundFile1)
    //         setAudioFile2(data.soundFile2)
    //         console.log(data);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    const navigate = useNavigate();


    return (
        <Panel>
            <Image src='images/light.jpg' style={{ width: '100%', height: '100%', position: 'absolute', top: '0px', left: '0', zIndex: '-1' }} />

            {/* <Header title={'AI Sound Therapy'} /> */}

            <div className={css.head_title}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div onClick={() => setShowMenuPop(true)} className={css.menu_btn}>
                        <Icon>list</Icon>
                    </div>
                </div>

                <button className={css.stt_btn}>
                    <Icon size={'small'}>voice</Icon>
                </button>
            </div>

            <Popup position='center' open={showMenuPop} style={{ width: '450px', height: '450px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '0', right: '-20px' }}>
                    <Icon onClick={() => setShowMenuPop(false)} style={{ width: '80px', height: '80px', fontSize: '30px', cursor: 'pointer' }} size={'tiny'}>closex</Icon>
                </div>
                <div className={css.menu_flex}>
                    <Button onClick={() => navigate('/')} size='small' style={{ width: '300px' }}>Home</Button>
                    <Button onClick={() => navigate('/dashboard')} size='small' style={{ width: '300px', marginTop: '30px' }}>Dashboard</Button>
                    <Button size='small' style={{ width: '300px', marginTop: '30px' }}>Account</Button>
                </div>
            </Popup>

            <Popup open={showModePop}>
                <div className={css.popup}>
                    {mode}
                </div>
            </Popup>


            <Popup open={showVolumePop} style={{ width: '50%', height: '250px', margin: '50px auto' }}>
                <div className={css.volume_pop}>

                    <div className={css.volume_tit}>
                        <div>Volume</div>
                        <div onClick={() => setShowVolumePop(false)} className={css.volume_close}><Icon size='tiny'>closex</Icon></div>
                    </div>
                    <div className={css.blank}></div>

                    <div className={css.volume_box}>
                        <div className={css.volume_flex}>
                            <div>Main</div>
                            <div className={css.slider}>
                                <Slider min={0} max={1} step={0.01} defaultValue={volume1} onChange={handleVolumeChange1} tooltip={() => (
                                    <div style={{ position: 'absolute', bottom: '-15px', left: '15px' }}>
                                        {formatTooltip(volume1)}
                                    </div>
                                )} />
                            </div>
                        </div>

                        <div className={css.volume_flex}>
                            <div>Binaural</div>
                            <div className={css.slider}>
                                <Slider min={0} max={1} step={0.01} defaultValue={volume2} onChange={handleVolumeChange2} tooltip={() => (
                                    <div style={{ position: 'absolute', bottom: '-15px', left: '15px' }}>
                                        {formatTooltip(volume2)}
                                    </div>
                                )} />
                            </div>
                        </div>
                    </div>

                </div>
            </Popup>



            <div className={css.mainView}>
                <div className={css.img_flex}>
                    <div onClick={() => playBoth('STRESS')} className={`${css.mode_box} ${isPlaying && mode === 'STRESS' ? css.pulseAnimation : ''}`}>
                        <div className={css.img_box}>
                            <Image src='images/stress_mode.jpg' className={css.mode_img} />
                        </div>
                        <div className={css.img_tit}>Stress Mode</div>
                    </div>

                    <div onClick={() => playBoth('FOCUS')} className={`${css.mode_box} ${isPlaying && mode === 'FOCUS' ? css.pulseAnimation : ''}`}>
                        <div className={css.img_box}>
                            <Image src='images/focus_mode.jpeg' className={css.mode_img} />
                        </div>
                        <div className={css.img_tit}>Focus Mode</div>
                    </div>

                    <div onClick={() => playBoth('SLEEP')} className={`${css.mode_box} ${isPlaying && mode === 'SLEEP' ? css.pulseAnimation : ''}`}>
                        <div className={css.img_box}>
                            <Image src='images/sleep_mode.jpeg' className={css.mode_img} />
                        </div>
                        <div className={css.img_tit}>Sleep Mode</div>
                    </div>

                    <div onClick={() => playBoth('MEDITATION')} className={`${css.mode_box} ${isPlaying && mode === 'MEDITATION' ? css.pulseAnimation : ''}`}>
                        <div className={`${css.img_box} `}>
                            <Image src='images/meditation_mode.png' className={css.mode_img} />
                        </div>
                        <div className={css.img_tit}>Meditaion Mode</div>
                    </div>

                </div>

                <div className={css.bar_cont}>
                    {isPlaying ? (
                        <div className={css.waveformAnimation}>
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className={css.bar}></div>
                            ))}
                        </div>
                    ) : ''}
                </div>




                <div className={css.bottomBox}>
                    <div className={css.bottomSliderBox}>

                        <div className={css.bottomTextFlex}>
                            <h2 >{mode ? mode : 'Therapy Mode'}</h2>
                            <Button size="small" className={css.volumeButton} onClick={() => setShowVolumePop(true)}>
                                Volume
                            </Button>
                        </div>

                        <div className={css.main_slider}>
                            {/* <Slider
                                min={0}
                                max={100}
                                disabled
                            /> */}
                            <div>
                                <Slider
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={currentTime / audioBuffer1.current?.duration || 0}
                                />
                                {/* <label>{formatTime(currentTime)}</label> */}
                            </div>
                        </div>

                        <div className={css.button_flex}>
                            <div className={css.musicPlayerButton}>
                                <button disabled={isPlaying || mode == ''} onClick={resumeBoth} className={css.buttonStyle}>
                                    {
                                        <Icon>play</Icon>
                                    }
                                </button>
                            </div>

                            <div className={css.musicPlayerButton} >
                                <button onClick={pauseBoth} className={css.buttonStyle}>
                                    {
                                        <Icon>pause</Icon>
                                    }
                                </button>
                            </div>
                            <div className={css.musicPlayerButton}>
                                <button onClick={stopBoth} className={css.buttonStyle} >
                                    <Icon>stop</Icon>
                                </button>
                            </div>

                        </div>

                    </div>

                </div>


            </div>
        </Panel>

    );
};

export default AudioPlayer;