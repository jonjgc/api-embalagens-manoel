import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PackagingService } from './packaging.service';
import { ProcessarPedidosDto } from './dto/processar-pedidos.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '../auth/api-key/api-key.guard';
import { ApiSecurity } from '@nestjs/swagger';

@ApiTags('packaging')
@ApiSecurity('x-api-key')
@UseGuards(ApiKeyGuard)
@Controller('packaging')
export class PackagingController {
  constructor(private readonly packagingService: PackagingService) {}

  @Post('process')
  @ApiOperation({
    summary: 'Processa uma lista de pedidos e retorna o plano de embalagem.',
  })
  @ApiResponse({ status: 200, description: 'Pedidos processados com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos ou produto muito grande.',
  })
  processar(@Body() processarPedidosDto: ProcessarPedidosDto) {
    return this.packagingService.processarPedidos(processarPedidosDto.pedidos);
  }
}
