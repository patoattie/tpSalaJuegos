import { ESexo } from '../enums/e-sexo.enum';

export class Jugador 
{
	public idCollection: string;
	public id: number;
	public usuario: string;
    public cuit: number;
    public sexo: ESexo;

	constructor(id?: number, usuario?: string, cuit?: number, sexo?: ESexo)
	{
		this.id = id;
        this.usuario = usuario;
        this.cuit = cuit;
		this.sexo = sexo;
	}
}
