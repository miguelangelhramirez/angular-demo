export interface IViaje {
    id:          number,
    pais:        string;
    ciudad:      string;
    presupuesto: number;
    fecha:       string;
}

export interface ViajesResponse {
    status: number;
    data: IViaje[];
}