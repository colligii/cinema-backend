import { Test, TestingModule } from '@nestjs/testing';
import { IndicativeRatingResolver } from './indicative_rating.resolver';

describe('IndicativeRatingResolver', () => {
  let resolver: IndicativeRatingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndicativeRatingResolver],
    }).compile();

    resolver = module.get<IndicativeRatingResolver>(IndicativeRatingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
