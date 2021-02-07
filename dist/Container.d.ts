/**
 * Used for the main logic of replacing placeholders in an object.
 */
export declare class Container {
    private definition;
    private graph;
    constructor(definition: object);
    getOutput(): object;
    replacePlaceholders(): void;
}
