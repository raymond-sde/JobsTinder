import { Job } from "./Job";

export class StorageJob {
  [key: string]: Job;

  constructor(job?: Job) {
    if (job) {
      this[job.id] = job;
    }
  }
}
