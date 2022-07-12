import { CSSProperties, memo } from 'react';
import classNames from 'classnames';

type BackgroundType = {
    image: string | undefined,
    overlay?: boolean | string,
    position?: string | {
        x?: string,
        y?: string
    }
    video?: string[],
    className?: string,
    style?: CSSProperties
};

const Background = ({image, overlay, position, video, className, style}: BackgroundType) => {
    const bgStyle = {backgroundImage: `url(${image})`, ...style};

    if (typeof position === 'string') {
        bgStyle.backgroundPosition = position;
    } else if (typeof position === 'object') {
        position.x && (bgStyle.backgroundPositionX = position.x);
        position.y && (bgStyle.backgroundPositionY = position.y);
    }

    return (
        <div
            className={classNames(
                'bg-holder',
                {
                    overlay: overlay,
                    [`overlay-${overlay}`]: typeof overlay === 'string'
                },
                className
            )}
            style={bgStyle}
        >
            {video && (
                <video className="bg-video" autoPlay loop muted playsInline>
                    {video.map((src, index) => (
                        <source
                            key={index}
                            src={src}
                            type={`video/${src.split('.').pop()}`}
                        />
                    ))}
                </video>
            )}
        </div>
    );
};

export default memo(Background);
