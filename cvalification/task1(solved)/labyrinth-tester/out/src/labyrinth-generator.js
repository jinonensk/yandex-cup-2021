export function generateLabyrinth(width, height, start, finish) {
    const data = new Uint8Array(width * height);
    // Nulify inner borders for first row
    for (let cell = 0; cell < width; cell++) {
        if (cell !== 0) {
            data[cell] |= 32 /* Left */;
        }
        if (cell !== width - 1) {
            data[cell] |= 8 /* Right */;
        }
    }
    for (let line = 1; line < height; line++) {
        let pickedNum = 0;
        for (let cell = 0; cell < width; cell++) {
            const index = line * width + cell;
            const isPicked = Math.random() > 0.5;
            if (isPicked && cell !== width - 1) {
                data[index] |= 8 /* Right */;
                data[index + 1] |= 32 /* Left */;
                pickedNum++;
            }
            else {
                const bottomIndex = index - Math.round(pickedNum * Math.random());
                const topIndex = bottomIndex - width;
                data[topIndex] |= 16 /* Bottom */;
                data[bottomIndex] |= 4 /* Top */;
                pickedNum = 0;
            }
        }
    }
    data[start.x + start.y * width] |= (1 /* Start */ | 64 /* Known */);
    data[finish.x + finish.y * width] |= 2 /* Finish */;
    return { data, width, height };
}
