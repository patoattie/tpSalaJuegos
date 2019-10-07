import { ESexo } from '../enums/e-sexo.enum';

export class Jugador 
{
	public idCollection: string;
	public usuario: string;
    public cuit: number;
    public sexo: ESexo;

	constructor(usuario?: string, cuit?: number, sexo?: ESexo)
	{
        this.usuario = usuario;
        this.cuit = cuit;
		this.sexo = sexo;
	}
}
