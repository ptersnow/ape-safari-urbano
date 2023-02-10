import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";

import * as Location from 'expo-location';

const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = 0.005;

export function Map() {
    const [location, setLocation] = useState<Region>();
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return
            }

            let mlocation = await Location.getCurrentPositionAsync({});
            let region = {
                "latitude": mlocation.coords.latitude,
                "longitude": mlocation.coords.longitude,
                "latitudeDelta": LATITUDE_DELTA,
                "longitudeDelta": LONGITUDE_DELTA
            }
            setLocation(region as Region);
        })()
    }, [])

    return (
        <MapView
            style={{ height: '60%', width: '100%' }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            region={location}
        >

        </MapView>
    )
}