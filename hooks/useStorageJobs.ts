import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageJob } from "../components/StorageJob";
import { JobStatus } from "../components/JobStatus";
import { Job } from "../components/Job";

// Helper Methods
const filterJobsFromStorage = (
  jobs: Job[],
  storageJobs: StorageJob[]
): Job[] => {
  let keys: string[] = [];
  storageJobs.forEach((storageJob) => {
    keys = keys.concat(Object.keys(storageJob));
  });

  const filteredJobs = jobs.filter((job) => {
    return keys.indexOf(job.id) < 0;
  });

  return filteredJobs;
};

const retrieveAllJobs = async (): Promise<StorageJob[] | void> => {
  try {
    const keyArray = await AsyncStorage.getAllKeys();
    const keyValArray = await AsyncStorage.multiGet(keyArray);
    const allStorageJobs: StorageJob[] = [];

    for (let keyVal of keyValArray) {
      const jobArray: Job[] = Object.values(JSON.parse(keyVal[1] || ""));

      jobArray.forEach((job) => {
        allStorageJobs.push(new StorageJob(job));
      });
    }
    return allStorageJobs;
  } catch (error) {
    console.log(error);
  }
};

const saveOrRejectCurrentJob = async (
  renderedJobs: Job[],
  key: string
): Promise<void> => {
  try {
    let jobObj = new StorageJob();

    const result = await AsyncStorage.getItem(key);

    if (result !== null) {
      jobObj = JSON.parse(result);
    } else {
      console.log("Data Not Found");
    }

    if (renderedJobs[0]?.id) {
      // once saved, latest card is top of deck (index 0)
      jobObj[renderedJobs[0].id] = renderedJobs[0];
    }

    await AsyncStorage.setItem(key, JSON.stringify(jobObj));
  } catch (error) {
    console.log(error);
  }
};

const retrieveSavedJobs = async (jobStatus: JobStatus): Promise<StorageJob> => {
  let storageJob = new StorageJob();
  try {
    const result = await AsyncStorage.getItem(jobStatus);

    if (result !== null) {
      storageJob = JSON.parse(result);
    }
  } catch (e) {
    console.log("failed to retrieve jobs data");
  }
  return storageJob;
};

// Exports
export const useRetrieveSavedOrRejectedJobs = (
  jobStatus: JobStatus,
  swiped?: boolean
): StorageJob => {
  const [data, setData] = useState<StorageJob>(new StorageJob());

  useEffect(() => {
    const retrieveSavedJobs = async () => {
      try {
        const result = await AsyncStorage.getItem(jobStatus);

        if (result !== null) {
          setData(JSON.parse(result));
        }
      } catch (e) {
        console.log("failed to retrieve jobs data");
      }
    };
    retrieveSavedJobs();
  }, [swiped]);

  return data;
};

type UseRenderedJobsDataProps = {
  renderedJobs: Job[];
  storageJob: StorageJob;
};

export const useRenderedJobsData = (
  jobs: Job[],
  jobStatus: JobStatus | null,
  swiped?: boolean,
  readOnly?: boolean
): UseRenderedJobsDataProps => {
  const [renderedJobs, setRenderedJobs] = useState<Job[]>([]);
  const [storageJob, setStorageJob] = useState<StorageJob>(new StorageJob());

  useEffect(() => {
    if (readOnly && jobStatus) {
      const retrieveSavedOrRejectedJobs = async (): Promise<void> => {
        try {
          const result = await retrieveSavedJobs(jobStatus);
          setStorageJob(result);
        } catch (error) {
          console.log(error);
        }
      };
      retrieveSavedOrRejectedJobs();
    }

    const retrieveAllJobsAndFilter = async (): Promise<void> => {
      try {
        const storageJobs = await retrieveAllJobs();
        if (storageJobs) {
          setRenderedJobs(filterJobsFromStorage(jobs, storageJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    retrieveAllJobsAndFilter();
  }, []);

  useEffect(() => {
    const saveRetrieveFilterJobs = async (): Promise<void> => {
      if (jobStatus) {
        try {
          await saveOrRejectCurrentJob(renderedJobs, jobStatus);
          const storageJob = await retrieveSavedJobs(jobStatus);
          setStorageJob(storageJob);
          const storageJobs = await retrieveAllJobs();
          if (storageJobs) {
            setRenderedJobs(filterJobsFromStorage(jobs, storageJobs));
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    saveRetrieveFilterJobs();
  }, [swiped]);

  return {
    renderedJobs,
    storageJob,
  };
};
