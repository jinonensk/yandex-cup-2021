const CELL_SIZE = 20;
const PADDING = 20;
export function render(labyrinth) {
    const canvas = document.getElementById('visualization');
    canvas.width = labyrinth.width * CELL_SIZE + 2 * PADDING;
    canvas.height = labyrinth.height * CELL_SIZE + 2 * PADDING;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const drawLine = (x1, y1, x2, y2) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };
    const fillCell = (x, y, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
    };
    for (let line = 0; line < labyrinth.height; line++) {
        for (let cell = 0; cell < labyrinth.width; cell++) {
            const index = line * labyrinth.width + cell;
            const data = labyrinth.data[index];
            const x = PADDING + cell * CELL_SIZE;
            const y = PADDING + line * CELL_SIZE;
            if (data & 2 /* Finish */) {
                fillCell(x, y, 'red');
            }
            if (data & 64 /* Known */) {
                fillCell(x, y, 'gray');
            }
            if (data & 1 /* Start */) {
                fillCell(x, y, 'green');
            }
            if ((data & 4 /* Top */) === 0) {
                drawLine(x, y, x + CELL_SIZE, y);
            }
            if ((data & 8 /* Right */) === 0) {
                drawLine(x + CELL_SIZE, y, x + CELL_SIZE, y + CELL_SIZE);
            }
            if ((data & 16 /* Bottom */) === 0) {
                drawLine(x, y + CELL_SIZE, x + CELL_SIZE, y + CELL_SIZE);
            }
            if ((data & 32 /* Left */) === 0) {
                drawLine(x, y, x, y + CELL_SIZE);
            }
        }
    }
}
