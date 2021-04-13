import ChromaKey from './ChromaKey.js';

document.addEventListener('DOMContentLoaded', function() {
    jsDemo.init();
});

let jsDemo = function() {
    let fn = {};

    fn.init = function() {

        const video = document.querySelector('#uiVideo');
        const canvas = document.querySelector('#uiCanvas');
        const ctx = canvas.getContext('2d');

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then((stream) => {
            video.srcObject = stream;
        });

        video.addEventListener('loadeddata', () => {

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            this.render(video, canvas, ctx);

            /*setInterval(() => {
                const ck = new ChromaKey(video, canvas, ctx);
                ck.fondo();
            }, 40);*/

        });
    };

    fn.setTimeoutAsync = function(fn, delay) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fn());
            }, delay);
        });
    };

    fn.render = async function(video, canvas, ctx) {
        for (;;) {
            await this.setTimeoutAsync(() => {
                const ck = new ChromaKey(video, canvas, ctx);
                ck.fondo();
            }, 40);
        }
    };

    return fn;

}();