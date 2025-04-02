import React from 'react';
import '../../styles/BackgroundVideo.css'; // Importera CSS för styling

const BackgroundVideo = () => {
    return (
        <div className="video-container">
            <video autoPlay loop muted className="background-video">
                <source src="../public/Halo-1743078357103.mp4" type="video/mp4" />
                Din webbläsare stöder inte video-taggen.
            </video>
            <div className="content">
                <h1>Välkommen till min sida!</h1>
                <p>Här är lite innehåll ovanpå videon.</p>
            </div>
        </div>
    );
};

export default BackgroundVideo;