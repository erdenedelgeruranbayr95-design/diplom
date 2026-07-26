import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@medreh.mn' },
    update: {},
    create: {
      name: 'Админ',
      email: 'admin@medreh.mn',
      passwordHash: await bcrypt.hash('admin123', 10),
      role: Role.ADMIN,
    },
  });
  console.log('Seeded admin@medreh.mn / admin123');

  const therapist = await prisma.user.upsert({
    where: { email: 'therapist@medreh.mn' },
    update: {},
    create: {
      name: 'Эмчилгээч',
      email: 'therapist@medreh.mn',
      passwordHash: await bcrypt.hash('therapist123', 10),
      role: Role.THERAPIST,
    },
  });
  console.log('Seeded therapist@medreh.mn / therapist123');

  const demoUser = await prisma.user.upsert({
    where: { email: 'user@medreh.mn' },
    update: {},
    create: {
      name: 'Жишээ хэрэглэгч',
      email: 'user@medreh.mn',
      passwordHash: await bcrypt.hash('user123', 10),
      role: Role.USER,
    },
  });
  console.log('Seeded user@medreh.mn / user123');

  const parent = await prisma.user.upsert({
    where: { email: 'parent@medreh.mn' },
    update: {},
    create: {
      name: 'Эцэг эх',
      email: 'parent@medreh.mn',
      passwordHash: await bcrypt.hash('parent123', 10),
      role: Role.PARENT,
    },
  });
  console.log('Seeded parent@medreh.mn / parent123');

  await prisma.therapistAssignment.upsert({
    where: { therapistId_userId: { therapistId: therapist.id, userId: demoUser.id } },
    update: {},
    create: { therapistId: therapist.id, userId: demoUser.id },
  });
  await prisma.parentLink.upsert({
    where: { parentId_childUserId: { parentId: parent.id, childUserId: demoUser.id } },
    update: {},
    create: { parentId: parent.id, childUserId: demoUser.id },
  });
  console.log('Seeded demo TherapistAssignment + ParentLink (all pointing to user@medreh.mn)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
