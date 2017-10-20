export enum enumEndianess {
    Intel = "Intel",
    Motorola = "Motorola"
}

export interface IInstruction {
    issigned:     boolean,
    startbit:     number,
    bitlen:       number,
    endianess:    enumEndianess,
    resolution:   number,
    offset:       number
}