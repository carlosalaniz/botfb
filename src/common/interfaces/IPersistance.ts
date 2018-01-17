interface IPersistance {
    getAsync(key: string): Promise<any>;
    setAsync(key: string, value: any): Promise<any>;
}