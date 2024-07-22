import React, { useRef } from 'react';
import { Button } from '@enact/sandstone/Button';
import kind from '@enact/core/kind';

// const AudioPlayer = kind({
//     name: 'AudioPlayer',

//     render: ({ audioRef, src, ...rest }) => (
//         <audio ref={audioRef} src={src} {...rest} />
//     )
// });

const AudioTest = () => {
    const audioRef1 = useRef(null);
    const audioRef2 = useRef(null);

    const playBoth = async () => {
        audioRef1.current.currentTime = 0;
        audioRef2.current.currentTime = 0;
        await audioRef1.current.play();
        await audioRef2.current.play();
    };

    const pauseBoth = () => {
        if (audioRef1.current && audioRef2.current) {
            audioRef1.current.pause();
            audioRef2.current.pause();
        }
    };

    return (
        <div>
            <audio audioRef={audioRef1} src="music/LGRest_06_MusicPN(mix).wav" controls />
            <audio audioRef={audioRef2} src="music/LGRest_05_BB432Only.wav" controls />
            <Button onClick={playBoth}>Play Both</Button>
            <Button onClick={pauseBoth}>Pause Both</Button>
        </div>
    );
};

export default AudioTest;
