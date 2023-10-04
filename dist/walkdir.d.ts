export declare const walkDir: ({ initPath, fileList, callback, blockSize, }: {
    initPath: string;
    fileList?: any[] | undefined;
    callback?: ((a: any) => void) | undefined;
    blockSize?: number | undefined;
}) => Promise<any[]>;
