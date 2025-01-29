import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants/data";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full w-full items-center justify-center bg-white">
   
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-in")}
        className="absolute top-5 py-2 px-5 rounded-xl right-5 z-10 bg-[#eae8e8]"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

    
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className=" w-[32px] z-20 mb-[10vh] h-[4px] mx-1 bg-[#E2E8F0] rounded-full " />}
        activeDot={
        <View className=" w-[32px] z-20 mb-[10vh] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        
    }
        onIndexChanged={(index) => setActiveIndex(index)}
        showsPagination={true}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex-1 items-start justify-center w-full p-5">
           
            <Text className="text-black text-3xl w-3/4 font-bold text-left mt-16 mx-5">
              {item.title}
            </Text>

            <Text className="text-md w-3/4 font-JakartaSemiBold text-left text-[#858585] mx-5 mt-3">
              {item.description}
            </Text>

     
            <Image
              source={item.image}
              className="w-full h-[65%] rounded-xl mt-auto"
              resizeMode="cover"
            />
          </View>
        ))}
      </Swiper>

      <TouchableOpacity
        onPress={() =>
          isLastSlide ? router.replace("/(auth)/sign-in") : swiperRef.current?.scrollBy(1)
        }
        className="absolute flex  w-1/2 flex-row justify-center bottom-10  z-10 bg-[#39de02] rounded-full py-3 items-center"
      >
        <Text className="text-lg text-centerfont-bold text-white">
          {isLastSlide ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Welcome;
