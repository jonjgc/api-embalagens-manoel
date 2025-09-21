import { Injectable, BadRequestException } from '@nestjs/common';
import { PedidoDto } from './dto/pedido.dto';
import { ProdutoDto } from './dto/produto.dto';

type Dimensao = { altura: number; largura: number; comprimento: number };
type CaixaDisponivel = { nome: string; dimensoes: Dimensao };
type CaixaUtilizada = { caixa: string; produtos: ProdutoDto[] };
type ResultadoPedido = { id_pedido: string; caixas: CaixaUtilizada[] };

@Injectable()
export class PackagingService {
  private readonly caixasDisponiveis: CaixaDisponivel[] = [
    {
      nome: 'Caixa 1',
      dimensoes: { altura: 30, largura: 40, comprimento: 80 },
    },
    {
      nome: 'Caixa 2',
      dimensoes: { altura: 50, largura: 50, comprimento: 40 },
    },
    {
      nome: 'Caixa 3',
      dimensoes: { altura: 50, largura: 80, comprimento: 60 },
    },
  ].sort((a, b) => this.getVolume(a.dimensoes) - this.getVolume(b.dimensoes));

  private getVolume(dimensoes: Dimensao): number {
    return dimensoes.altura * dimensoes.largura * dimensoes.comprimento;
  }

  private produtoCabeNaCaixa(produto: Dimensao, caixa: Dimensao): boolean {
    const p_dims = [produto.altura, produto.largura, produto.comprimento].sort(
      (a, b) => b - a,
    );
    const c_dims = [caixa.altura, caixa.largura, caixa.comprimento].sort(
      (a, b) => b - a,
    );
    return (
      p_dims[0] <= c_dims[0] && p_dims[1] <= c_dims[1] && p_dims[2] <= c_dims[2]
    );
  }

  processarPedidos(pedidos: PedidoDto[]): ResultadoPedido[] {
    const resultados: ResultadoPedido[] = [];

    for (const pedido of pedidos) {
      const caixasUtilizadas: CaixaUtilizada[] = [];
      const produtosOrdenados = [...pedido.produtos].sort(
        (a, b) => this.getVolume(b) - this.getVolume(a),
      );

      for (const produto of produtosOrdenados) {
        let produtoEncaixotado = false;

        for (const caixaUsada of caixasUtilizadas) {
          const caixaDisponivel = this.caixasDisponiveis.find(
            (c) => c.nome === caixaUsada.caixa,
          );

          if (caixaDisponivel) {
            const volumeCaixa = this.getVolume(caixaDisponivel.dimensoes);
            const volumeProdutosNaCaixa = caixaUsada.produtos.reduce(
              (acc, p) => acc + this.getVolume(p),
              0,
            );

            if (
              this.produtoCabeNaCaixa(produto, caixaDisponivel.dimensoes) &&
              volumeProdutosNaCaixa + this.getVolume(produto) <= volumeCaixa
            ) {
              caixaUsada.produtos.push(produto);
              produtoEncaixotado = true;
              break;
            }
          }
        }

        if (!produtoEncaixotado) {
          for (const caixaDisponivel of this.caixasDisponiveis) {
            if (this.produtoCabeNaCaixa(produto, caixaDisponivel.dimensoes)) {
              caixasUtilizadas.push({
                caixa: caixaDisponivel.nome,
                produtos: [produto],
              });
              produtoEncaixotado = true;
              break;
            }
          }
        }

        if (!produtoEncaixotado) {
          throw new BadRequestException(
            `O produto ${produto.id} do pedido ${pedido.id_pedido} é grande demais para qualquer caixa disponível.`,
          );
        }
      }
      resultados.push({
        id_pedido: pedido.id_pedido,
        caixas: caixasUtilizadas,
      });
    }
    return resultados;
  }
}
