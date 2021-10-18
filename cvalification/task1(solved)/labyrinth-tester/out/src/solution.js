var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const visitedCoords = new Set();
let finishCoord = null;
const MoveDirection = {
    left: 'left',
    right: 'right',
    down: 'down',
    up: 'up',
};
const GameStateDirection = {
    left: 'left',
    right: 'right',
    top: 'top',
    bottom: 'bottom',
};
const convertGameStateToMoveDirection = (stateDir) => {
    if (stateDir === GameStateDirection.bottom)
        return MoveDirection.down;
    if (stateDir === GameStateDirection.top)
        return MoveDirection.up;
    return stateDir;
};
const makeCoordsId = ({ x, y }) => `${x}:${y}`;
const getNewCoords = (currentCoords, direction) => {
    const newCoords = Object.assign({}, currentCoords);
    if (direction === MoveDirection.right)
        newCoords.x += 1;
    if (direction === MoveDirection.left)
        newCoords.x -= 1;
    if (direction === MoveDirection.up)
        newCoords.y -= 1;
    if (direction === MoveDirection.down)
        newCoords.y += 1;
    return newCoords;
};
const main = (game, start) => __awaiter(void 0, void 0, void 0, function* () {
    console.time('test');
    yield makeStep(game, start);
    console.timeEnd('test');
    return finishCoord;
});
const makeStep = (game, coord) => __awaiter(void 0, void 0, void 0, function* () {
    if (finishCoord)
        return;
    const { finish, bottom, left, right, top } = yield game.state(coord.x, coord.y);
    if (finish)
        finishCoord = coord;
    const possibleDirection = { bottom, left, right, top };
    visitedCoords.add(makeCoordsId(coord));
    const awaitGroup = [];
    Object.entries(possibleDirection).forEach(([direction, isPossible]) => {
        if (!isPossible)
            return;
        const currentDirection = convertGameStateToMoveDirection(direction);
        const newCoord = getNewCoords(coord, currentDirection);
        const visitedCoodsId = makeCoordsId(newCoord);
        if (visitedCoords.has(visitedCoodsId))
            return;
        awaitGroup.push((() => __awaiter(void 0, void 0, void 0, function* () {
            yield game[currentDirection](coord.x, coord.y);
            yield makeStep(game, newCoord);
        }))());
    });
    yield Promise.all(awaitGroup);
});
export default main;
// Долгий классческий обход в с поворотом на право
// const main = async (game: Game, start: {x: number, y: number}) => {
//     let currentDir = 'right'
//     let coord = start
//     let state = await game.state(start.x, start.y);
//     console.log(state)
//     let i = 0;
//     while(!state.finish){
//         i++
//         let newDir = getNextDir(currentDir)
//         console.log(`new dir ${newDir}`)
//         console.log(`new dir ${coord.x} ${coord.y}`)
//         for(let dirIndex = 0; dirIndex < 4; dirIndex++){
//             let d = newDir[dirIndex]
//             if(state[mapStateName(d)]){
//                 await game[d](coord.x, coord.y)
//                 coord = getNewCoords(coord, d)
//                 currentDir = d;
//                 break
//             }
//         }
//         state = await game.state(coord.x, coord.y);
//     }
//     return { x: start.x, y: start.y }
// }
// const mapStateName = (direction) => {
//     if(direction === "up") return "top"
//     if(direction === "down") return "bottom"
//     return direction
// }
// const getNextDir = (currentDir) => {
//     if (currentDir === 'right') return ['down', "right", "up", "left"]
//     if (currentDir === 'down') return [ "left", 'down', "right", "up",]
//     if (currentDir === 'left') return ["up", "left", 'down', "right", ]
//     if (currentDir === 'up') return ["right", "up", "left", 'down',]
//   }
// const getNewCoords = (currentCoords, direction) => {
//     const newCoords = Object.assign({}, currentCoords)
//     if (direction === 'right') newCoords.x += 1
//     if (direction === 'left') newCoords.x -= 1
//     if (direction === 'up') newCoords.y -= 1
//     if (direction === 'down') newCoords.y += 1
//     return newCoords
//   }
// export default main
