import { ClienteEntity } from 'src/entities/clientes.entity';

export abstract class ClientesRepository {
  abstract save(cliente: ClienteEntity): Promise<ClienteEntity>;
  abstract findAll(
    page: number,
    limit: number,
  ): Promise<{ clientes: ClienteEntity[]; total: number }>;
  abstract findByEmail(email: string): Promise<ClienteEntity | null>;
  abstract findById(id: string): Promise<ClienteEntity | null>;
  abstract update(
    id: string,
    cliente: Partial<ClienteEntity>,
  ): Promise<ClienteEntity>;
  abstract delete(id: string): Promise<void>;
}
