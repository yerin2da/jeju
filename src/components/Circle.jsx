import React from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

const Circle = (props) => {
    const map = useMap();
    const maps = useMapsLibrary('maps');

    const circleRef = React.useRef(null);

    React.useEffect(() => {
        if (!map || !maps) return;

        if (circleRef.current) {
            circleRef.current.setMap(null);
        }

        if (props.center) {
            const circle = new maps.Circle({
                ...props,
                map,
            });
            circleRef.current = circle;
        }

        return () => {
            if (circleRef.current) {
                circleRef.current.setMap(null);
            }
        };
    }, [map, maps, props]);

    return null;
};

export default Circle;
