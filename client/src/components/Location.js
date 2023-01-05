import React from 'react';

export default function Location({lat, lon, setLocation}) {
    const [text, setText] = React.useState("");
    
    function handleSubmit(e) {
        e.preventDefault()

        if (!text){
            alert("Enter Location");
            return;
        }

        fetch(`https://api.geoapify.com/v1/geocode/search?text=${text}&format=json&apiKey=${process.env.REACT_APP_GEOCODING_KEY}`)
        .then(res => res.json())
        .then(data => setLocation(prevState => ({...prevState, "Latitude": data.results[0].lat, "Longitude": data.results[0].lon})));
    }

    return(
        <div className="Location">
            <form onSubmit={handleSubmit} className="locationForm">
                <input placeholder="Enter Location" onChange={e => setText(e.target.value)} value={text}/>
                <button type="submit"> Send </button>
            </form>
            <div className="Latitude">Latitude: {lat}</div>
            <div className="Longitude">Longitude: {lon}</div>
        </div>
    )
}