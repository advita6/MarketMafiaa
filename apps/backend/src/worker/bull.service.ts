import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BullService {
  private queue: Queue;

  constructor(private config: ConfigService) {
    const redisConfig = {
      connection: {
        host: this.config.get<string>('REDIS_HOST') || 'localhost',
        port: this.config.get<number>('REDIS_PORT') || 6379,
      },
    };

    this.queue = new Queue('tasks', redisConfig);
  }

  async enqueue(jobName: string, payload: any) {
    return this.queue.add(jobName, payload);
  }
}
