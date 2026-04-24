"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Clear existing data
        yield prisma.fieldUpdate.deleteMany();
        yield prisma.field.deleteMany();
        yield prisma.user.deleteMany();
        // Create Admin
        const adminPassword = yield bcryptjs_1.default.hash('admin123', 10);
        const admin = yield prisma.user.create({
            data: {
                name: 'System Admin',
                email: 'admin@demo.com',
                password: adminPassword,
                role: client_1.Role.ADMIN,
            },
        });
        // Create Agents
        const agentPassword = yield bcryptjs_1.default.hash('agent123', 10);
        const agent1 = yield prisma.user.create({
            data: {
                name: 'Agent One',
                email: 'agent1@demo.com',
                password: agentPassword,
                role: client_1.Role.AGENT,
            },
        });
        const agent2 = yield prisma.user.create({
            data: {
                name: 'Agent Two',
                email: 'agent2@demo.com',
                password: agentPassword,
                role: client_1.Role.AGENT,
            },
        });
        // Create Fields
        const field1 = yield prisma.field.create({
            data: {
                name: 'North Valley Plot',
                cropType: 'Maize',
                plantingDate: new Date('2024-03-01'),
                stage: client_1.FieldStage.PLANTED,
                assignedAgentId: agent1.id,
            },
        });
        const field2 = yield prisma.field.create({
            data: {
                name: 'East Ridge Farm',
                cropType: 'Wheat',
                plantingDate: new Date('2024-02-15'),
                stage: client_1.FieldStage.GROWING,
                assignedAgentId: agent2.id,
            },
        });
        const field3 = yield prisma.field.create({
            data: {
                name: 'South Basin Field',
                cropType: 'Rice',
                plantingDate: new Date('2023-11-20'),
                stage: client_1.FieldStage.HARVESTED,
                assignedAgentId: agent1.id,
            },
        });
        // Create Updates
        yield prisma.fieldUpdate.create({
            data: {
                note: 'Initial planting complete. Soil moisture is adequate.',
                stage: client_1.FieldStage.PLANTED,
                fieldId: field1.id,
                agentId: agent1.id,
                createdAt: new Date('2024-03-02'),
            },
        });
        yield prisma.fieldUpdate.create({
            data: {
                note: 'Propagating well. Applying standard nitrogen fertilizer.',
                stage: client_1.FieldStage.GROWING,
                fieldId: field2.id,
                agentId: agent2.id,
                createdAt: new Date('2024-03-10'),
            },
        });
        console.log('Seed data created successfully.');
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
