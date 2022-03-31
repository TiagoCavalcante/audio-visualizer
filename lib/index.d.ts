import { RefObject } from 'react';

declare type EqualizerProps = {
    audio: RefObject<HTMLAudioElement>;
    height: number;
    width: number;
};
declare function Equalizer({ audio, height, width }: EqualizerProps): JSX.Element;

export { EqualizerProps, Equalizer as default };
