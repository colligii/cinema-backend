import { Test, TestingModule } from '@nestjs/testing';
import { GenresResolver } from './genres.resolver';

describe('GenresResolver', () => {
  let resolver: GenresResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenresResolver],
    }).compile();

    resolver = module.get<GenresResolver>(GenresResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
