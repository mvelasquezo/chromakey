export default class ChromaKey {
    constructor(video, canvas, ctx) {
        this.video = video;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    fondo() {
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        const imgDt = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const dtLen = imgDt.data.length / 4;
        for (let i = 0; i < dtLen; i++) {
            const offset = i * 4;
            const rojo = imgDt.data[offset + 0];
            const verde = imgDt.data[offset + 1];
            const azul = imgDt.data[offset + 2];

            if (verde > 90 && verde > rojo && verde > azul)
                imgDt.data[offset + 3] = 0;
        }

        this.ctx.putImageData(imgDt, 0, 0);
    }
}