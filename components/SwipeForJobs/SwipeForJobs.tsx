import React from "react";
import Swiper from "react-native-deck-swiper";
import { View } from "react-native";
import { JobCard } from "../JobCard/JobCard";
import { styles, overlayLabels } from "./styles";
import { Job } from "../Job";

type SwipeForJobsProps = {
  jobs: Job[];
};

export const SwipeForJobs = ({ jobs }: SwipeForJobsProps) => {
  const [index, setIndex] = React.useState<number>(0);

  const onSwiped = (): void => {
    setIndex((index + 1) % jobs.length);
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={jobs}
        cardIndex={index}
        renderCard={(job) => <JobCard job={job} />}
        onSwiped={onSwiped}
        // stackSize={jobs.length} // how many items
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
  );
};
