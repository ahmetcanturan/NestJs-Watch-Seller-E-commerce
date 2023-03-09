import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { hashing } from 'src/utils/hashing';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && user.password === hashing(password)) {
      // user verisi içinde userId, username ve password bulunuyor.
      // Bu tanımlama ile result verisi içinde userId ve username olmasını sağlıyoruz.
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async loginWithCredentials(user: any) {
    // Jwt oluştururken payload verisi gerekiyor.
    // Bunu da kullanıcıya özel yapabilmek adına username ve userId verilerini kullandık.
    const payload = { sub: user?._doc?._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
