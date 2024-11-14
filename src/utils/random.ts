let seed = new Date().getTime();

export function setSeed(value: number): void {
    seed = value;
}

/** 0 <= value < 1 */
export function getRandom(): number {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
}

/** 0 <= x < value */
export function getRandomUint(value: number): number {
    return Math.floor(getRandom() * value);
}