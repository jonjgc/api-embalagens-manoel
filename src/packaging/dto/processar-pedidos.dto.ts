import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { PedidoDto } from './pedido.dto';

export class ProcessarPedidosDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoDto)
  pedidos: PedidoDto[];
}
