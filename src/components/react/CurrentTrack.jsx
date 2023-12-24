import React, { useEffect, useState } from 'react';

const CurrentTrack = () => {
  const [refreshCount, setRefreshCount] = useState(0);

  const createTrackElement = (id, display) => {
    const trackElement = document.createElement('div');
    trackElement.id = id;
    trackElement.className = 'spinitron-js-widget track';
    trackElement.style.display = display;
    trackElement.setAttribute('data-action', 'now-playing-v2');
    trackElement.setAttribute('data-station', 'wprb');
    trackElement.setAttribute('data-num', '0');
    trackElement.setAttribute('data-sharing', '0');
    trackElement.setAttribute('data-cover', '1');
    trackElement.setAttribute('data-player', '1');
    trackElement.setAttribute('data-merch', '0');
    trackElement.setAttribute('data-refresh-count', refreshCount.toString());
    return trackElement;
  };

  const compareCurrentTracks = () => {
    const currentTrackElement = document.getElementById('current_spinitron_track');
    const diffTrackElement = document.getElementById('diff_spinitron_track');
    // Get the <tr> elements from current_spinitron_track and diff_spinitron_track divs
    const currentTrackRow = currentTrackElement?.querySelector('.spin-item');
    const diffTrackRow = diffTrackElement?.querySelector('.spin-item');
    // Check if IDs are different
    const isNewSong = currentTrackRow?.id !== diffTrackRow?.id;
    return isNewSong;
  };

  const removeAndReaddComponent = () => {
    const currentTrackElement = document.getElementById('current_spinitron_track');
    const diffTrackElement = document.getElementById('diff_spinitron_track');
    const isNewSong = compareCurrentTracks();
    if (!isNewSong) {
      console.log('Current track is still playing. Updating diff track ...');
      // Remove the diff track element
      const parentElement = currentTrackElement?.parentNode;
      parentElement?.removeChild(diffTrackElement);

      // Create a new diff track element
      const newDiffTrackElement = createTrackElement('diff_spinitron_track', 'none');
      // Append the new diff track element to the parent
      parentElement?.appendChild(newDiffTrackElement);
    }
    if (isNewSong) {
      console.log('A new song is playing!  Updating current track ...');
      const parentElement = currentTrackElement?.parentNode;
      parentElement?.removeChild(diffTrackElement);
      parentElement?.removeChild(currentTrackElement);

      // Create new diff & current track elements
      const newDiffTrackElement = createTrackElement('diff_spinitron_track', 'none');
      const newCurrentTrackElement = createTrackElement('current_spinitron_track', '');

      // Append the new diff & current track elements to the parent
      parentElement?.appendChild(newDiffTrackElement);
      parentElement?.appendChild(newCurrentTrackElement);
    }

    // Load Spinitron widget script dynamically
    const script = document.createElement('script');
    script.src = 'https://spinitron.com/static/js/widget.js';
    script.async = true;

    script.onload = () => {
      // Initialize Spinitron widget after script is loaded
      console.log('Spinitron widget initialized.');
      window._spinitron_init();
    };

    document.head.appendChild(script);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshCount((prevCount) => prevCount + 1);
      removeAndReaddComponent();

      console.log('CurrentTrack: Removed and re-added to the DOM.');
    }, 4000);

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [refreshCount]);

  // Initial component render
  useEffect(() => {
    removeAndReaddComponent();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
  <>
      <h3 className="center">Current Track</h3>
      <div id="current_track">
        <div
            id="current_spinitron_track"
            className="spinitron-js-widget track"
            data-action="now-playing-v2"
            data-station="wprb"
            data-num="0"
            data-sharing="0"
            data-cover="1"
            data-player="1"
            data-merch="0"
            data-refresh-count={refreshCount}
          ></div>
         <div
            id="diff_spinitron_track"
            className="spinitron-js-widget track"
            data-action="now-playing-v2"
            data-station="wprb"
            data-num="0"
            data-sharing="0"
            data-cover="1"
            data-player="1"
            data-merch="0"
            data-refresh-count={refreshCount}
          ></div>
      </div>
  </>
  );
};

export default CurrentTrack;

