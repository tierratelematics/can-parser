export enum enumEndianess {
    Intel = "Intel",
    Motorola = "Motorola"
}

export type IInstruction = {
    issigned:     boolean,
    startbit:     number,
    bitlen:       number,
    endianess:    enumEndianess,
    resolution:   number,
    offset:       number
}