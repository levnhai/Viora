import { Controller, Get } from '@nestjs/common';
import { TemplatesService } from './templates.service';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  async findAll() {
    const templates = await this.templatesService.findAll();
    return {
      success: true,
      data: templates,
    };
  }
}
