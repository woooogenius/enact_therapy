
// "music/LGRest_06_MusicPN(mix).wav",
//     "music/LGRest_05_BB432Only.wav",


import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@enact/sandstone/Button';
import Slider from '@enact/sandstone/Slider';
import css from '../App/App.module.less'
import Image from '@enact/sandstone/Image';
import Icon from '@enact/sandstone/Icon';
import { Panel } from '@enact/sandstone/Panels';
import Popup from '@enact/sandstone/Popup';
import Input from '@enact/sandstone/Input';


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
    const [showViocePop, setShowVoicePop] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);

    const [audioFile, setAudioFile] = useState("music/LGRest_06_MusicPN(mix).wav");
    const [audioFile2, setAudioFile2] = useState("music/LGRest_05_BB432Only.wav");



    //login localstorage

    // window.localStorage.setItem('userId', 'admin');
    // const userIdValue = window.localStorage.getItem('userId');
    // console.log(userIdValue);

    //데이터 삭제
    // window.localStorage.removeItem('userId');

    //로컬스토리지 비우기
    // localStorage.claer();




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


    // const getVolumeInerval = setInterval(() => {
    //     getVolume('user100')
    // }, 60000);


    const playBoth = (mode) => {
        stopBoth();

        // postCommandProcessing('user100', mode, null);
        // getVolumeInerval();




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


        //getvolume 정지
        // clearInterval(getVolumeInerval);

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

    //commandProcessing api
    // async function postCommandProcessing(userId, therapyMode, speechWord) {
    //     try {
    //         const response = await fetch('http://13.124.72.117:10001/api/command', {
    //             method: 'POST',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 userId: userId,
    //                 therapyCategory: therapyMode,
    //                 speech: speechWord,
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



    //get volume api
    // async function getVolume(userId) {
    //     try {
    //         const response = await fetch(`http://13.124.72.117:10001/api/volume?userId=${userId}`, {
    //             method: 'GET',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },


    //         })
    //         if (!response.ok) {
    //             console.log('get volume api err')
    //         }
    //         const data = await response.json();
    //         setVolume1(data.volumeLevel1);
    //         setVolume2(data.volumeLevel2);
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


    return (
        <Panel>
            <Image src='images/backimg2.jpeg' style={{ width: '100vw', height: '100vh', position: 'absolute', top: '0px', left: '0px', zIndex: '-1', opacity: 0.5 }} />

            {/* <Header title={'AI Sound Therapy'} /> */}

            <div className={css.head_title}>
                <h3 className={css.head_tit}>AI Sound Therapy</h3>

            </div>
            <span>{window.localStorage.getItem('userId') ? `Welcome ${window.localStorage.getItem('userId')}` : 'Unknown User'}</span>

            {/* stt popup */}
            <Popup open={showViocePop} position='center' style={{ width: '800px', height: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '0', right: '-20px' }}>
                    <Icon onClick={() => setShowVoicePop(false)} style={{ width: '80px', height: '80px', fontSize: '30px', cursor: 'pointer' }} size={'tiny'}>closex</Icon>
                </div>
                <div className={css.stt_pop}>
                    <Input type='text' placeholder='Voice Input' style={{ width: '500px', height: '70px', fontSize: '50px' }} />
                    <Button size='small' style={{ height: '70px', width: '150px' }}>전송</Button>
                </div>

            </Popup>

            <Popup open={showModePop}>
                <div className={css.popup}>
                    {mode}
                </div>
            </Popup>



            {/* volume popup */}
            <Popup open={showVolumePop} position='center' style={{ width: '40%', height: '260px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '10px', right: '-15px' }}>
                    <Icon onClick={() => setShowVolumePop(false)} style={{ width: '80px', height: '80px', fontSize: '30px', cursor: 'pointer' }} size={'tiny'}>closex</Icon>
                </div>
                <div className={css.volume_pop} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} >

                    {/* <div className={css.volume_tit}>
                        <div onClick={() => setShowVolumePop(false)} className={css.volume_close}><Icon size='tiny'>closex</Icon></div>
                    </div> */}
                    <div className={css.blank}></div>

                    <div className={css.volume_box}>
                        <div className={css.volume_flex}>
                            <div >Main</div>
                            <div className={css.slider}>
                                <Slider min={0} max={1} step={0.01} defaultValue={volume1} onChange={handleVolumeChange1} tooltip={() => (
                                    <div style={{ position: 'absolute', bottom: '-20px', left: '15px' }}>
                                        {formatTooltip(volume1)}
                                    </div>
                                )} />
                            </div>
                        </div>

                        <div className={css.volume_flex}>
                            <div>Binaural</div>
                            <div className={css.slider}>
                                <Slider min={0} max={1} step={0.01} defaultValue={volume2} onChange={handleVolumeChange2} tooltip={() => (
                                    <div style={{ position: 'absolute', bottom: '-20px', left: '15px' }}>
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
                            <Image src='images/tree.jpg' className={css.mode_img} />
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


                {/* <div>
                    <div className={css.circle}></div>
                    <div className={css.circle}></div>
                    <div className={css.circle}></div>
                    <div className={css.circle}></div>
                    <div className={css.circle}></div>
                    <div className={css.circle}></div>
                    <div className={css.circle}></div>
                    <div className={css.circle}></div>
                    <div className={css.circle}></div>
                </div> */}


                <div className={css.bottomBox}>
                    <div className={css.bottomSliderBox}>

                        <div className={css.bottomTextFlex}>
                            <h2 >{mode ? mode : 'Therapy Mode'}</h2>
                            <div>
                                <Button size="small" className={css.volumeButton} onClick={() => setShowVoicePop(true)}>
                                    <Icon size={'small'}>voice</Icon>
                                </Button>
                                <Button size="small" className={css.volumeButton} onClick={() => setShowVolumePop(true)}>
                                    <Icon size={'small'}>sound</Icon>
                                </Button>
                            </div>

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
        </Panel >

    );
};

export default AudioPlayer;