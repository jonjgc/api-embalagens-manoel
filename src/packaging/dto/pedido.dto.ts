import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { ProdutoDto } from './produto.dto';

export class PedidoDto {
  @IsNotEmpty({ message: 'O id_pedido não pode ser vazio.' })
  id_pedido: string;

  @IsArray({ message: 'A lista de produtos deve ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto)
  produtos: ProdutoDto[];
}
