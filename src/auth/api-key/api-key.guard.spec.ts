import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyGuard } from './api-key.guard';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
const MOCK_API_KEY = 'minha-chave-de-teste';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyGuard,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'API_KEY') {
                return MOCK_API_KEY;
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    guard = module.get<ApiKeyGuard>(ApiKeyGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true when a valid api key is provided', () => {
    const mockContext = new ExecutionContextHost([
      {
        headers: {
          'x-api-key': MOCK_API_KEY,
        },
      },
    ]);

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should throw UnauthorizedException when an invalid api key is provided', () => {
    const mockContext = new ExecutionContextHost([
      {
        headers: {
          'x-api-key': 'chave-errada',
        },
      },
    ]);

    expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException when no api key is provided', () => {
    const mockContext = new ExecutionContextHost([
      {
        headers: {},
      },
    ]);

    expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
  });
});
