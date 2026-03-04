import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import FormData from 'form-data';
import { IRavexRepository } from './ravex.repository.js';
import { TokenRavexDto } from './model/token.schema.js';
import { AnomaliasViagemResponseDto } from './model/anomalias-viagem.schema.js';
import { RavexResponseViagemDto } from './model/viagem.schema.js';

@Injectable()
export class RavexRepository implements IRavexRepository {
  constructor(private readonly axios: HttpService) {}

  async authRavex(): Promise<TokenRavexDto | undefined> {
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', process.env.RAVEX_USERNAME);
    formData.append('password', process.env.RAVEX_PASSWORD);
    const response = await this.axios.post<TokenRavexDto>(
      `/usuario/autenticar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.toPromise().then((res) => res?.data);
  }

  getAnomaliasByViagemId(
    viagemId: string,
    token: string,
  ): Promise<AnomaliasViagemResponseDto | undefined> {
    const response = this.axios.get<AnomaliasViagemResponseDto>(
      `/api/viagem-faturada/${viagemId}/anomalias-registradas`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.toPromise().then((res) => res?.data);
  }

  getByViagemId(
    viagemId: string,
    token: string,
  ): Promise<RavexResponseViagemDto | undefined> {
    const response = this.axios.get<RavexResponseViagemDto>(
      `/api/viagem-faturada/${viagemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.toPromise().then((res) => res?.data);
  }
}
