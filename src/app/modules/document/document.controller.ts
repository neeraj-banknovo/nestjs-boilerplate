import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsDefined, IsUUID } from 'class-validator';
import { DocumentService } from './document.service';
import { CreateCaseStudyPayload } from './dto/create-document.dto';

class ParamsDto {
  @ApiProperty({
    description: 'Document id',
    type: String,
    default: '47874e57-be7d-4da7-af07-aedab0220e25',
  })
  @IsUUID()
  @IsDefined()
  id: string;
}


@Controller('document')
@ApiTags('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('/upload/generate-signed-urls')
  generateUrls() {
    return this.documentService.generateSignedUrlRecord();
  }

  @Get()
  findAllDocuments() {
    return this.documentService.getAllDocuments();
  }

  @Get(':id')
  findOneDocument(@Param() params: ParamsDto) {
    return this.documentService.getDocumentById(params.id);
  }
}

@Controller('case-study')
@ApiTags('case-study')
export class CaseStudyController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  createCaseStudy(@Body() body: CreateCaseStudyPayload) {
    return this.documentService.createCaseStudy(body.data);
  }
}
