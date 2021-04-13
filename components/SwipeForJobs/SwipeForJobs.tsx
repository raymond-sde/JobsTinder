import React, { useState } from "react";
import Swiper from "react-native-deck-swiper";
import { View, Text } from "react-native";
import { JobCard } from "../JobCard/JobCard";
import { styles, overlayLabels } from "./styles";
import { Job } from "../Job";
import { JobStatus } from "../JobStatus";
import { useRenderedJobsData } from "../../hooks/useStorageJobs";

type SwipeForJobsProps = {
  jobs: Job[];
};

export const SwipeForJobs = (props: SwipeForJobsProps) => {
  const { jobs } = props;
  const [index, setIndex] = useState<number>(0);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [swiped, setSwiped] = useState<boolean>(false);
  const { renderedJobs } = useRenderedJobsData(jobs, jobStatus, swiped, false);

  const handleOnSwiped = (): void => {
    setIndex((index + 1) % renderedJobs.length);
    setSwiped(!swiped);
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
