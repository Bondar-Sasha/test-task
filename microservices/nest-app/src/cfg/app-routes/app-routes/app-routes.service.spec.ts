import { Test, TestingModule } from '@nestjs/testing';
import { AppRoutesService } from './app-routes.service';

describe('AppRoutesService', () => {
  let service: AppRoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppRoutesService],
    }).compile();

    service = module.get<AppRoutesService>(AppRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
