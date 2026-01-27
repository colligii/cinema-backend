import { Test, TestingModule } from '@nestjs/testing';
import { IndicativeRatingService } from './indicative_rating.service';

describe('IndicativeRatingService', () => {
  let service: IndicativeRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndicativeRatingService],
    }).compile();

    service = module.get<IndicativeRatingService>(IndicativeRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
