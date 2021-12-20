import { Controller} from '@nestjs/common';
import { ClientDataService } from './client-data.service';

@Controller('client-data')
export class ClientDataController {
  constructor(private readonly clientDataService: ClientDataService) {}
}
