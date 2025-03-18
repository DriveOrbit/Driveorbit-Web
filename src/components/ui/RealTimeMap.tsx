'use client';

import React, {useEffect} from 'react';
import {Loader} from '@googlemaps/js-api-loader'; 

export default function GoogleMaps() {
    const mapRef =React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'quarterly',
            });

            const { Map} = await loader.importLibrary('maps');

            const locationMap ={
                lat:6.927079, 
                lng:79.861244,
            };
            //marker

            const options: google.maps.MapOptions = {
                center: locationMap,
                zoom: 15,
                mapId: 'NEXT_MAPS_Tuts',
        };
        const map = new Map(mapRef.current as HTMLDivElement, options);
    };

        initializeMap();
    }, []);

    return (
    <div className="h-[600px]" ref={mapRef}>
        
    </div>
    );
}
