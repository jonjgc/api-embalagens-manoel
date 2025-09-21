import { Test, TestingModule } from '@nestjs/testing';
import { PackagingService } from './packaging.service';
import { PedidoDto } from './dto/pedido.dto';
import { BadRequestException } from '@nestjs/common';

describe('PackagingService', () => {
  let service: PackagingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackagingService],
    }).compile();

    service = module.get<PackagingService>(PackagingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve empacotar um produto pequeno na menor caixa possível (Caixa 1)', () => {
    const pedido: PedidoDto[] = [
      {
        id_pedido: 'p1',
        produtos: [{ id: 'prod1', altura: 10, largura: 10, comprimento: 10 }],
      },
    ];
    const resultado = service.processarPedidos(pedido);
    expect(resultado[0].caixas.length).toBe(1);
    expect(resultado[0].caixas[0].caixa).toBe('Caixa 1');
  });

  it('deve usar duas caixas diferentes para dois produtos de tamanhos distintos', () => {
    const pedido: PedidoDto[] = [
      {
        id_pedido: 'p2',
        produtos: [
          { id: 'prod-pequeno', altura: 1, largura: 1, comprimento: 1 },
          { id: 'prod-grande', altura: 45, largura: 70, comprimento: 55 },
        ],
      },
    ];
    const resultado = service.processarPedidos(pedido);
    expect(resultado[0].caixas.length).toBe(1);
    expect(resultado[0].caixas[0].caixa).toBe('Caixa 3');
  });

  it('deve lançar um erro para um produto maior que todas as caixas', () => {
    const pedido: PedidoDto[] = [
      {
        id_pedido: 'p3',
        produtos: [
          { id: 'prod-gigante', altura: 100, largura: 100, comprimento: 100 },
        ],
      },
    ];

    expect(() => service.processarPedidos(pedido)).toThrow(BadRequestException);
  });
});
