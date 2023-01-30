import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_CURRENT_TIME = 'videoplayer-current-time';


const onTimeupdate = function (data) {
    localStorage.setItem(KEY_CURRENT_TIME, data.seconds);
};

player.on('timeupdate', throttle(onTimeupdate, 1000));


const savedTime = localStorage.getItem(KEY_CURRENT_TIME);


player.setCurrentTime(savedTime || 0);