import { Test, TestingModule } from '@nestjs/testing';
import { PackagingController } from './packaging/packaging.controller';
import { PackagingService } from './packaging/packaging.service';
import { ApiKeyGuard } from './auth/api-key/api-key.guard';
import { ConfigService } from '@nestjs/config';

describe('PackagingController', () => {
  let controller: PackagingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackagingController],
      providers: [
        PackagingService,
        // 3. Adicione as dependências do Guard abaixo
        ApiKeyGuard,
        {
          provide: ConfigService,
          useValue: {
            // Criamos um mock simples para o ConfigService
            get: jest.fn().mockReturnValue('uma-chave-qualquer'),
          },
        },
      ],
    }).compile();

    controller = module.get<PackagingController>(PackagingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
