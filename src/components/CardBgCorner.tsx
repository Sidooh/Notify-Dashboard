import { IMAGES } from '../constants/images';
import { memo } from "react";

const CardBgCorner = memo(({ corner }: { corner?: 1 | 2 | 3 | 4 | 5 }) => {
    const image = IMAGES.icons.spotIllustrations[`corner_${corner ?? 1}`];

    return <div className="bg-holder bg-card" style={{ backgroundImage: `url(${image})` }}/>;
});

export default CardBgCorner;
