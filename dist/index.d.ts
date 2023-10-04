export { walkDir } from "./walkdir";
export { getOutfit } from "./getOutfit";
export declare const indexMovie: ({ initPath, blockSize, callback, }: {
    initPath: string;
    blockSize?: number | undefined;
    callback?: any;
}) => Promise<{
    complete: any;
    unComplete: any;
}>;
export declare const indexMovies: ({ initPath, blockSize, onIndex, }: {
    initPath: string;
    blockSize?: number | undefined;
    onIndex?: any;
}) => Promise<{
    complete: any;
    unComplete: any;
}>;
