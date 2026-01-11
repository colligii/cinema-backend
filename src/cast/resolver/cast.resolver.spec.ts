import { Test, TestingModule } from '@nestjs/testing';
import { CastResolver } from './cast.resolver';

describe('CastResolver', () => {
  let resolver: CastResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CastResolver],
    }).compile();

    resolver = module.get<CastResolver>(CastResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
