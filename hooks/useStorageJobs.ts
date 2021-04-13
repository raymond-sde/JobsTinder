import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageJob } from "../components/StorageJob";
import { JobStatus } from "../components/JobStatus";
import { Job } from "../components/Job";

export const useRetrieveSavedOrRejectedJobs = (
  jobStatus: JobStatus
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
  }, []);

  return data;
};

export const useRetrieveAllJobs = (index: number): StorageJob[] => {
  const [data, setData] = useState<StorageJob[]>([]);

  useEffect(() => {
    const retrieveAllJobs = async () => {
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
        setData(allStorageJobs);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveAllJobs();
  }, [index]);

  return data;
};
