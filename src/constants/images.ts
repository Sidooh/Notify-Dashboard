//  generic
import bg_navbar from 'assets/images/generic/bg-navbar.png';
import sidooh from 'assets/images/logos/sidooh.png';
import card from 'assets/images/generic/card.png';
import genericDefault from 'assets/images/generic/default.png';
import inverted from 'assets/images/generic/inverted.png';
import vibrant from 'assets/images/generic/vibrant.png';
import falconModeDefault from 'assets/images/generic/falcon-mode-default.jpg';
import falconModeDark from 'assets/images/generic/falcon-mode-dark.jpg';

//  icons
import arrowsH from 'assets/images/icons/arrows-h.svg';
import paragraph from 'assets/images/icons/paragraph.svg';
import weather_sm from 'assets/images/icons/weather-sm.jpg';
//  spot illustrations
import auth_corner from 'assets/images/icons/spot-illustrations/authentication-corner.png';
import bg_shape from 'assets/images/icons/spot-illustrations/bg-shape.png';
import corner_1 from 'assets/images/icons/spot-illustrations/corner-1.png';
import corner_2 from 'assets/images/icons/spot-illustrations/corner-2.png';
import corner_3 from 'assets/images/icons/spot-illustrations/corner-3.png';
import corner_4 from 'assets/images/icons/spot-illustrations/corner-4.png';
import corner_5 from 'assets/images/icons/spot-illustrations/corner-5.png';
import shape_1 from 'assets/images/icons/spot-illustrations/shape-1.png';

//  products
import threeThumb from 'assets/images/products/3-thumb.png';

//  team
import one from 'assets/images/team/1.jpg';
import two from 'assets/images/team/2.jpg';
import three from 'assets/images/team/3.jpg';
import ten from 'assets/images/team/10.jpg';

export const IMAGES = {
    generic: {
        bg_navbar,
        card,
        default: genericDefault,
        inverted,
        vibrant,
        falconModeDefault,
        falconModeDark,
    },
    icons: {
        arrowsH,
        paragraph,
        weather_sm,

        spotIllustrations: {
            auth_corner,
            bg_shape,
            corner_1,
            corner_2,
            corner_3,
            corner_4,
            corner_5,
            shape_1,
        }
    },
    logos: {
        sidooh,
    },
    products: {
        '3-thumb': threeThumb
    },
    team: {
        1: one,
        2: two,
        3: three,
        10: ten,
    }
};