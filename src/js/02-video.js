import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const player = new Player('vimeo-player');
const throttled = throttle((saveViewPosition), 1000);

player.on('timeupdate', throttled)

function saveViewPosition({seconds}) {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(seconds))
}

const currentTime = localStorage.getItem("videoplayer-current-time") || 0

player.setCurrentTime(currentTime).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            console.log(`${error.name}: the time was less than 0 or greater than the video’s duration`)
            break;
        default:
            console.log(`${error.name}: some other error occurred`)
            break;
    }
});