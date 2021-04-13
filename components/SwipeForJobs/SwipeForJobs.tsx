import React, { useState, useEffect } from "react";
import Swiper from "react-native-deck-swiper";
import { View, Text } from "react-native";
import { JobCard } from "../JobCard/JobCard";
import { styles, overlayLabels } from "./styles";
import { Job } from "../Job";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageJob } from "../StorageJob";
import { JobStatus } from "../JobStatus";

type SwipeForJobsProps = {
  jobs: Job[];
};

export const SwipeForJobs = (props: SwipeForJobsProps) => {
  const { jobs } = props;
  const [renderedJobs, setRenderedJobs] = useState<Job[]>(jobs);
  const [index, setIndex] = useState<number>(0);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [swiped, setSwiped] = useState<boolean>(false);

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

  useEffect(() => {
    const retrieveAllJobsAndFilter = async (): Promise<void> => {
      try {
        const storageJobs = await retrieveAllJobs();
        if (storageJobs) {
          setRenderedJobs(filterJobsFromStorage(storageJobs));
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
        await saveOrRejectCurrentJob(jobStatus);
        const storageJobs = await retrieveAllJobs();
        if (storageJobs) {
          setRenderedJobs(filterJobsFromStorage(storageJobs));
        }
      }
    };
    saveRetrieveFilterJobs();
  }, [swiped]);

  const filterJobsFromStorage = (storageJobs: StorageJob[]): Job[] => {
    let keys: string[] = [];
    storageJobs.forEach((storageJob) => {
      keys = keys.concat(Object.keys(storageJob));
    });

    const filteredJobs = jobs.filter((job) => {
      return keys.indexOf(job.id) < 0;
    });

    return filteredJobs;
  };

  const handleOnSwiped = (): void => {
    setIndex((index + 1) % renderedJobs.length);
    setSwiped(!swiped);
  };

  const saveOrRejectCurrentJob = async (key: string): Promise<void> => {
    try {
      let jobObj = new StorageJob();

      const result = await AsyncStorage.getItem(key);

      if (result !== null) {
        jobObj = JSON.parse(result);
      } else {
        console.log("Data Not Found");
      }
      // once saved, latest card is top of deck (index 0)
      jobObj[renderedJobs[0].id] = renderedJobs[0];

      await AsyncStorage.setItem(key, JSON.stringify(jobObj));
    } catch (error) {
      console.log(error);
    }
  };

  return renderedJobs.length ? (
    <View key={index} style={styles.container}>
      <Swiper
        cards={renderedJobs}
        cardIndex={0}
        renderCard={(job) => <JobCard job={job} />}
        onSwiped={handleOnSwiped}
        onSwipedRight={() => setJobStatus(JobStatus.SAVED)}
        onSwipedLeft={() => setJobStatus(JobStatus.REJECTED)}
        // stackSize={renderedJobs.length} // how many items
        // stackScale={10} // how much to shrink in percentage
        // stackSeparation={14} // spacing between each item
        disableTopSwipe
        disableBottomSwipe
        animateOverlayLabelsOpacity
        infinite // infinite scroll
        backgroundColor={"transparent"} // remove default background
        overlayLabels={overlayLabels}
      ></Swiper>
    </View>
  ) : (
    <Text>No more jobs</Text>
  );
};
