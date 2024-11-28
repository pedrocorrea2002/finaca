import {Svg, G, Path} from 'react-native-svg'

type Props = {
    width: Number;
    height: Number;
    color: String
}

export const Manutention = (Props) => {
    return(
        <Svg width={Props.width} height={Props.height} viewBox="0 0 511 511">
            <G scale={0.5}>
                <Path
                    d="M556 397q20-64 4.5-130T497 152q-37-38-87-56.5T307 81q-16 1-25.5 12t-10 25.5T282 145q18 17 63 52.5t62 52.5 16.5 39.5T407 328l-79 79q-16 16-39 16.5T251 408L145 283q-12-11-26.5-11T93 281.5 81 307q-5 60 19.5 115.5t72 93T280 564t117-7q9-3 17.5-.5T428 566l242 311q28 30 66.5 41t77.5 1 67-38.5 38-67-1-77.5-41-66L566 428q-7-5-9.5-13.5T556 397zm252 411q-10 11-24.5 13.5t-28.5-3-22-17.5-8-27 8-27.5 22-18 28.5-2.5 24.5 13q14 14 14 34.5T808 808z"
                    fill={Props.color}
                />
            </G>
        </Svg>
    )
}