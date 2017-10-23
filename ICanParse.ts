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
/**
 * The start bit in IInstruction is the absolute start bit. This can be retrieved, if not available,
 * from the relative start bit information (Byte Index = BI and Start Bit = SB)
 * Intel:       startbit = (8 x BI) + SB
 * Motorola:    startbit = [8 x (BI + 1)] - SB
 * 
 * Example Intel:     
 *              7___________1_0
 *            0|0 0 0 0 0 0 | 0
 *             |0 0 0 0 0 0 | 0
 *            2|- - - - - - X 0
 *             |0 0 0 0 0 0 0 0
 *             |0 0 0 0 0 0 0 0
 *             |0 0 0 0 0 0 0 0
 *             |0 0 0 0 0 0 0 0
 *            7|0 0 0 0 0 0 0 0
 * 
 * X is placed in BI = 2 and SB = 1
 * startbit = (8 x 2) + 1 = 17
 * 
 * 
 * Example Motorola:
 *              7___________1_0
 *            0|0 0 0 0 0 0 | 0
 *             |0 0 0 0 0 0 | 0
 *             |0 0 0 0 0 0 | 0
 *             |0 0 0 0 0 0 | 0
 *             |0 0 0 0 0 0 | 0
 *            5|- - - - - - X 0
 *             |0 0 0 0 0 0 0 0
 *            7|0 0 0 0 0 0 0 0
 * 
 *  X is placed in BI = 5 and SB = 1
 * startbit = [8 x (5 + 1)] - 1 = 47
 */