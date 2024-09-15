import { UserEntity } from "../../domain/entities/user.entity";
import { UsersRepository } from '../../domain/repositories/users.repository';

export class UserSession {
    constructor(
        private readonly _repository: UsersRepository
    ) { }

    async authentication(nickname: string, password: string): Promise<UserEntity | null> {
        try {
            const user = await this._repository.getByNickname(nickname);
            user!.password = '';
            return user;
        } catch (e) {
            console.debug('---> login', e);
            return null;
        }
    }
}