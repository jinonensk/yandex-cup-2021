var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Game_instances, _Game_data, _Game_height, _Game_width, _Game_delay, _Game_at, _Game_checkIsKnown, _Game_checkCanMove, _Game_markAsKnown;
const timer = (time) => new Promise(res => setTimeout(res, time * Math.random()));
export class Game {
    constructor(labyrinth, delay = 1000) {
        _Game_instances.add(this);
        _Game_data.set(this, void 0);
        _Game_height.set(this, void 0);
        _Game_width.set(this, void 0);
        _Game_delay.set(this, void 0);
        __classPrivateFieldSet(this, _Game_data, labyrinth.data, "f");
        __classPrivateFieldSet(this, _Game_height, labyrinth.height, "f");
        __classPrivateFieldSet(this, _Game_width, labyrinth.width, "f");
        __classPrivateFieldSet(this, _Game_delay, delay, "f");
    }
    up(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _Game_instances, "m", _Game_checkIsKnown).call(this, x, y);
            __classPrivateFieldGet(this, _Game_instances, "m", _Game_checkCanMove).call(this, x, y, 4 /* Top */);
            __classPrivateFieldGet(this, _Game_instances, "m", _Game_markAsKnown).call(this, x, y - 1);
        });
    }
    down(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _Game_instances, "m", _Game_checkIsKnown).call(this, x, y);
            __classPrivateFieldGet(this, _Game_instances, "m", _Game_checkCanMove).call(this, x, y, 16 /* Bottom */);
            __classPrivateFieldGet(this, _Game_instances, "m", _Game_markAsKnown).call(this, x, y + 1);
        });
    }
    left(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _Game_instances, "m", _Game_checkIsKnown).call(this, x, y);
            __classPrivateFieldGet(this, _Game_instances, "m", _Game_checkCanMove).call(this, x, y, 32 /* Left */);
            __classPrivateFieldGet(this, _Game_instances, "m", _Game_markAsKnown).call(this, x - 1, y);
        });
    }
    right(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _Game_instances, "m", _Game_checkIsKnown).call(this, x, y);
            __classPrivateFieldGet(this, _Game_instances, "m", _Game_checkCanMove).call(this, x, y, 8 /* Right */);
            __classPrivateFieldGet(this, _Game_instances, "m", _Game_markAsKnown).call(this, x + 1, y);
        });
    }
    state(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _Game_instances, "m", _Game_checkIsKnown).call(this, x, y);
            const state = __classPrivateFieldGet(this, _Game_instances, "m", _Game_at).call(this, x, y);
            return {
                top: !!(state & 4 /* Top */),
                bottom: !!(state & 16 /* Bottom */),
                left: !!(state & 32 /* Left */),
                right: !!(state & 8 /* Right */),
                start: !!(state & 1 /* Start */),
                finish: !!(state & 2 /* Finish */)
            };
        });
    }
}
_Game_data = new WeakMap(), _Game_height = new WeakMap(), _Game_width = new WeakMap(), _Game_delay = new WeakMap(), _Game_instances = new WeakSet(), _Game_at = function _Game_at(x, y) {
    if (x >= __classPrivateFieldGet(this, _Game_width, "f") || y >= __classPrivateFieldGet(this, _Game_height, "f") || x < 0 || y < 0) {
        throw 'out';
    }
    return __classPrivateFieldGet(this, _Game_data, "f")[x + y * __classPrivateFieldGet(this, _Game_width, "f")];
}, _Game_checkIsKnown = function _Game_checkIsKnown(x, y) {
    return __awaiter(this, void 0, void 0, function* () {
        yield timer(__classPrivateFieldGet(this, _Game_delay, "f"));
        const cell = __classPrivateFieldGet(this, _Game_instances, "m", _Game_at).call(this, x, y);
        if (cell & 64 /* Known */) {
            return;
        }
        throw 'access error';
    });
}, _Game_checkCanMove = function _Game_checkCanMove(x, y, dir) {
    const cell = __classPrivateFieldGet(this, _Game_instances, "m", _Game_at).call(this, x, y);
    if (cell & dir) {
        return;
    }
    throw 'wall';
}, _Game_markAsKnown = function _Game_markAsKnown(x, y) {
    __classPrivateFieldGet(this, _Game_instances, "m", _Game_at).call(this, x, y);
    __classPrivateFieldGet(this, _Game_data, "f")[x + y * __classPrivateFieldGet(this, _Game_width, "f")] |= 64 /* Known */;
};
