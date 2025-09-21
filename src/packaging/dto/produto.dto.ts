import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class ProdutoDto {
  @IsNotEmpty({ message: 'O ID do produto não pode ser vazio.' })
  id: string;

  @IsNumber({}, { message: 'A altura deve ser um número.' })
  @IsPositive({ message: 'A altura deve ser um número positivo.' })
  altura: number;

  @IsNumber({}, { message: 'A largura deve ser um número.' })
  @IsPositive({ message: 'A largura deve ser um número positivo.' })
  largura: number;

  @IsNumber({}, { message: 'O comprimento deve ser um número.' })
  @IsPositive({ message: 'O comprimento deve ser um número positivo.' })
  comprimento: number;
}
