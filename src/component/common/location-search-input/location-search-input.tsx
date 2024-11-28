'use client'
import { useRef } from 'react'
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'

const LocationSearchInput = () => {
    const inputRef = useRef<any>(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDdZEUKpaOMCN5mImqP70g5n90WhOMJSsM',
        libraries: ['places'],
    })

    function handleOnPlaceChange() {
        console.log('mtf!')
    }

    return (
        isLoaded && (
            <StandaloneSearchBox onLoad={ref => (inputRef.current = ref)} onPlacesChanged={handleOnPlaceChange}>
                <input ref={inputRef} type="text" />
            </StandaloneSearchBox>
        )
    )
}

export default LocationSearchInput

// AIzaSyDdZEUKpaOMCN5mImqP70g5n90WhOMJSsM
