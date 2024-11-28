import {Svg, G, Path, Rect} from 'react-native-svg'

type Props = {
    width: Number;
    height: Number;
    color: String
}

export const Event = (Props) => {
    return(
        <Svg width={Props.width} height={Props.height} fill={Props.color} viewBox="0 0 511 511">
            <G scale={1}>
            <Path d="M404.344,0H48.642C21.894,0,0,21.873,0,48.664v355.681c0,26.726,21.894,48.642,48.642,48.642
                h355.702c26.726,0,48.642-21.916,48.642-48.642V48.664C452.986,21.873,431.07,0,404.344,0z M148.429,33.629h156.043v40.337
                H148.429V33.629z M410.902,406.372H42.041v-293.88h368.86V406.372z"/>
            <Rect x="79.273" y="246.23" width="48.642" height="48.664"/>
            <Rect x="79.273" y="323.26" width="48.642" height="48.642"/>
            <Rect x="160.853" y="169.223" width="48.621" height="48.642"/>
            <Rect x="160.853" y="246.23" width="48.621" height="48.664"/>
            <Rect x="160.853" y="323.26" width="48.621" height="48.642"/>
            <Rect x="242.369" y="169.223" width="48.664" height="48.642"/>
            <Rect x="242.369" y="246.23" width="48.664" height="48.664"/>
            <Rect x="242.369" y="323.26" width="48.664" height="48.642"/>
            <Rect x="323.907" y="169.223" width="48.664" height="48.642"/>
            <Rect x="323.907" y="246.23" width="48.664" height="48.664"/>
            </G>
        </Svg>
    )
}