import { ESexo } from '../enums/e-sexo.enum';

export class Jugador 
{
	public idCollection: string;
	public usuario: string;
    public cuit: number;
    public sexo: ESexo;

	constructor(usuario?: string, cuit?: number, sexo?: ESexo, idCollection?: string)
	{
        this.usuario = usuario;
        this.cuit = cuit;
		this.sexo = sexo;
		this.idCollection = idCollection;
	}
}
