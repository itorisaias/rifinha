import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { prisma } from "~/config/database";

await prisma.user.create({
  data: {
    name: 'jhon doe',
    password: '123456789',
    contacts: {
      createMany: {
        data: [
          {
            type: 'EMAIL',
            value: 'jhon.doe@mail.com',
            confirmed_token: randomUUID(),
            confirmed_token_expierd_at: dayjs().toDate()
          },
          {
            type: 'PHONE',
            value: '+5516996076709',
            confirmed_token: randomUUID(),
            confirmed_token_expierd_at: dayjs().toDate()
          }
        ]
      }
    },
    // raffle: {
    //   create: {
    //     slug: 'jhon_doe_pix_10K',
    //     title: 'Rifa de 10K no PIX',
    //     finish_at: dayjs().add(7, 'days').toDate(),
    //     start_at: dayjs().toDate(),
    //     reward: {
    //       create: {
    //         price: 10_000,
    //         description: 'pix de 10K 🤑🤑🤑'
    //       }
    //     },
    //     yield: {
    //       create: {
    //         estimated_roi_percent: 100,
    //         quota_price: 0.15
    //       }
    //     }
    //   }
    // }
  }
})