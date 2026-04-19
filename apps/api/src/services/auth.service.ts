import { prisma } from '../config/db';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export class AuthService {
  static async register(data: any) {
    const { name, email, password, role } = data;
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error('User already exists');

    const hashedPassword = await hashPassword(password);
    
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role }
    });

    const token = generateToken({ userId: user.id, role: user.role });
    return { user: { id: user.id, name, email, role }, token };
  }

  static async login(data: any) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const token = generateToken({ userId: user.id, role: user.role });
    return { user: { id: user.id, name: user.name, email, role: user.role }, token };
  }
}
