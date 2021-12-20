import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsDefined, IsBoolean } from "class-validator";
import { GenericPayload } from "../../../shared/base.dto";

export class CreateCaseStudyDto {
    @ApiProperty({ description: 'document id' })
    @IsUUID()
    @IsDefined()
    document_id: string;

    @ApiProperty({ description: 'document id' })
    @IsBoolean()
    @IsDefined()
    uploadSuccess: boolean;
}

export class CreateCaseStudyPayload extends GenericPayload<CreateCaseStudyDto> {
    @ApiProperty({ description: 'Create case-study payload' })
    // @ValidateType(() => CreateCaseStudyDto)
    public data!: CreateCaseStudyDto;
}
