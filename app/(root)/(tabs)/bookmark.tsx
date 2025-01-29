import { BookmarkCard, Card } from "@/components/Cards";
import { getBookmarkedProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, FlatList, SafeAreaView } from "react-native";
import { Models } from "react-native-appwrite";



const BookmarkedProperties = () => {
    const { user, refetch } = useGlobalContext();
  const [properties, setProperties] = useState<Models.Document[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        if(user?.$id){
      const data = await getBookmarkedProperties(user?.$id);
     
      setProperties(data);
        }
    };

    fetchData();
  }, [user]);

   const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="h-full bg-white">
    <View>
      <Text className="text-xl m-4 font-bold">Bookmarks</Text>
      <FlatList
        data={properties}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <BookmarkCard item={item} onPress={() => handleCardPress(item.$id)}/>
        )}
      />
    </View>
    </SafeAreaView>
  );
};

export default BookmarkedProperties;
