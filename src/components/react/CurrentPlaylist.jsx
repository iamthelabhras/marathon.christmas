import React, { useEffect, useState } from 'react';

const CurrentPlaylist = () => {
  const [refreshCount, setRefreshCount] = useState(0);

  const createPlaylistDiv = (id, display) => {
    const playlistDiv = document.createElement('div');
    playlistDiv.id = id;
    playlistDiv.className = 'spinitron-js-widget track';
    playlistDiv.style.display = display;
    playlistDiv.setAttribute('data-action', 'current-playlist');
    playlistDiv.setAttribute('data-station', 'wprb');
    playlistDiv.setAttribute('data-num', '5');
    playlistDiv.setAttribute('data-sharing', '0');
    playlistDiv.setAttribute('data-cover', '1');
    playlistDiv.setAttribute('data-player', '1');
    playlistDiv.setAttribute('data-merch', '0');
    playlistDiv.setAttribute('data-refresh-playlist-count', refreshCount.toString());
    return playlistDiv;
  };

  const compareCurrentAndDiffPlaylists = () => {
    const currentPlaylistDiv = document.getElementById('current_playlist_div');
    const diffPlaylistDiv = document.getElementById('diff_playlist_div');
    // Get the <tr> elements from current_playlist and diff_playlist divs
    const currentPlaylistRow = currentPlaylistDiv?.querySelector('.spin-item');
    const diffPlaylistRow = diffPlaylistDiv?.querySelector('.spin-item');
    // Check if IDs are different
    const isNewPlaylist = currentPlaylistRow?.id !== diffPlaylistRow?.id;
    return isNewPlaylist;
  };

  const removeAndReaddPlaylist = () => {
    const currentPlaylistDiv = document.getElementById('current_playlist_div');
    const diffPlaylistDiv = document.getElementById('diff_playlist_div');
    const isNewPlaylist = compareCurrentAndDiffPlaylists();
    if (!isNewPlaylist) {
      console.log('Current playlist track is still playing. Updating diff playlist track ...');
      // Remove the diff track element
      const parentElement = currentPlaylistDiv?.parentNode;
      parentElement?.removeChild(diffPlaylistDiv);

      // Create a new diff track element
      const newDiffPlaylistDiv = createPlaylistDiv('diff_playlist_div', 'none');
      // Append the new diff track element to the parent
      parentElement?.appendChild(newDiffPlaylistDiv);
    }
    if (isNewPlaylist) {
      console.log('A new playlist track is playing!  Updating current playlist...');
      const parentElement = currentPlaylistDiv?.parentNode;
      parentElement?.removeChild(diffPlaylistDiv);
      parentElement?.removeChild(currentPlaylistDiv);

      // Create new diff & current track elements
      const newDiffPlaylistDiv = createPlaylistDiv('diff_playlist_div', 'none');
      const newCurrentPlaylistDiv = createPlaylistDiv('current_playlist_div', 'block');

      // Append the new diff & current track elements to the parent
      parentElement?.appendChild(newDiffPlaylistDiv);
      parentElement?.appendChild(newCurrentPlaylistDiv);
    }

//    // Load Spinitron widget script dynamically
//    const script = document.createElement('script');
//    script.src = 'https://spinitron.com/static/js/widget.js';
//    script.async = true;
//
//    script.onload = () => {
//      // Initialize Spinitron widget after script is loaded
//      console.log('Spinitron widget (PLAYLIST) initialized.');
//      window._spinitron_init();
//    };
//
//    document.head.appendChild(script);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshCount((prevCount) => prevCount + 1);
      removeAndReaddPlaylist();

      console.log('CurrentPlaylist: Removed and re-added to the DOM.');
    }, 4000);

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [refreshCount]);

  // Initial component render
  useEffect(() => {
    removeAndReaddPlaylist();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <h3 className="center">Current Playlist</h3>
      <details id="current_playlist">
        <summary>Click here to scroll the current playlist!</summary>
        <div
          className="spinitron-js-widget track"
          id="current_playlist_div"
          data-action="current-playlist"
          data-station="wprb"
          data-num="5"
          data-sharing="0"
          data-cover="1"
          data-player="1"
          data-merch="0"
          data-refresh-playlist-count={refreshCount}
        ></div>
        <div
          className="spinitron-js-widget track"
          id="diff_playlist_div"
          data-action="current-playlist"
          data-station="wprb"
          data-num="5"
          data-sharing="0"
          data-cover="1"
          data-player="1"
          data-merch="0"
          data-refresh-playlist-count={refreshCount}
        ></div>
      </details>
    </div>
  );
};

export default CurrentPlaylist;

