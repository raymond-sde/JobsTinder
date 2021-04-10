import React from "react";
import Swiper from "react-native-deck-swiper";
import { View } from "react-native";
import { JobCard } from "../JobCard/JobCard";
import { styles, overlayLabels } from "./styles";
import { Job } from "../Job";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SwipeForJobsProps = {
  jobs: Job[];
};

export const SwipeForJobs = ({ jobs }: SwipeForJobsProps) => {
  const [index, setIndex] = React.useState<number>(0);
  const onSwiped = (): void => {
    setIndex((index + 1) % jobs.length);
  };

  const saveOrRejectCurrentJob = (key: string, index: number) => {
    AsyncStorage.getItem(key, (err, result) => {
      let obj = {};
      if (result !== null) {
        console.log("Data Found");
        obj = JSON.parse(result);
      } else {
        console.log("Data Not Found");
      }
      obj[jobs[index].id] = jobs[index];
      AsyncStorage.setItem(key, JSON.stringify(obj));
    });
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={jobs}
        cardIndex={index}
        renderCard={(job) => <JobCard job={job} />}
        onSwiped={onSwiped}
        onSwipedRight={() => saveOrRejectCurrentJob("savedJobs", index)}
        onSwipedLeft={() => {
          saveOrRejectCurrentJob("rejectedJobs", index);
          // AsyncStorage.clear(); 
          // use AsyncStorage.clear() to clear storage. 
        }}
        stackSize={jobs.length} // how many items
        stackScale={10} // how much to shrink in percentage
        stackSeparation={14} // spacing between each item
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
