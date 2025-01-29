import {
    Client,
    Account,
    ID,
    Databases,
    OAuthProvider,
    Avatars,
    Query,
    Storage,
  } from "react-native-appwrite";
  import * as Linking from "expo-linking";
  import { openAuthSessionAsync } from "expo-web-browser";
export const config={
    platform: 'com.restate',
    endpoint:'https://cloud.appwrite.io/v1',
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  bookmarkCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_BOOKMARK_COLLECTION_ID,
    propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
};


export const client = new Client();
client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export async function login() {
    try {
      const redirectUri = Linking.createURL("/");
  
      const response = await account.createOAuth2Token(
        OAuthProvider.Google,
        redirectUri
      );
      if (!response) throw new Error("Create OAuth2 token failed");
  
      const browserResult = await openAuthSessionAsync(
        response.toString(),
        redirectUri
      );
      if (browserResult.type !== "success")
        throw new Error("Create OAuth2 token failed");
  
      const url = new URL(browserResult.url);
      const secret = url.searchParams.get("secret")?.toString();
      const userId = url.searchParams.get("userId")?.toString();
      if (!secret || !userId) throw new Error("Create OAuth2 token failed");
  
      const session = await account.createSession(userId, secret);
      if (!session) throw new Error("Failed to create session");
  
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  export async function logout() {
    try {
      const result = await account.deleteSession("current");
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  export async function getCurrentUser() {
    try {
      const result = await account.get();
      if (result.$id) {
        const userAvatar = avatar.getInitials(result.name);
  
        return {
          ...result,
          avatar: userAvatar.toString(),
        };
      }
  
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  


  
export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );

    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All")
      buildQuery.push(Query.equal("type", filter));

    if (query)
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );

    if (limit) buildQuery.push(Query.limit(limit));

    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );

    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// write function to get property by id
export async function getPropertyById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      id
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}


export const checkBookmark = async (userId:string, itemId:string) => {
  try {
    
    const response = await databases.listDocuments(
      config.databaseId!,
      config.bookmarkCollectionId!, [
      Query.equal("userID", userId),
    ]);

    if (response.documents.length > 0) {
      const bookmarkedIds = response.documents[0].propertiesID;
      return bookmarkedIds.includes(itemId);
    }
    
    return false;
  } catch (error) {
    console.error("Error checking bookmark:", error);
    return false;
  }
}
export const addBookmark = async (userId:string, itemId:string) => {
  try {
    
    const response = await databases.listDocuments(
      config.databaseId!,
      config.bookmarkCollectionId!, [
      Query.equal("userID", userId),
    ]);
 

    if (response.documents.length > 0) {
      const doc = response.documents[0];
      const updatedItemIds = [...doc.propertiesID, itemId];

      await databases.updateDocument(
        config.databaseId!,
      config.bookmarkCollectionId!, doc.$id, {
        propertiesID: updatedItemIds,
      });
    } else {
      await databases.createDocument(
        config.databaseId!,
      config.bookmarkCollectionId!, ID.unique(), {
        userID:userId,
        propertiesID: [itemId],
      });
    }
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};

export const removeBookmark = async (userId:string, itemId:string) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId!,
      config.bookmarkCollectionId!, [
      Query.equal("userID", userId),
    ]);

    if (response.documents.length > 0) {
      const doc = response.documents[0];
      console.log(doc);
      const updatedItemIds = doc.propertiesID.filter((id:string) => id !== itemId);

      await databases.updateDocument(
        config.databaseId!,
      config.bookmarkCollectionId!,doc.$id, {
        propertiesID: updatedItemIds,
      });
    }
  } catch (error) {
    console.error("Error removing bookmark:", error);
  }
};

export const getBookmarks = async (userId:string) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId!,
      config.bookmarkCollectionId!,[
      Query.equal("userID", userId),
    ]);

    return response.documents.length > 0 ? response.documents[0].propertiesID : [];
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return [];
  }
};

export const getUserBookmarks = async (userId:string) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId!,
      config.bookmarkCollectionId!, [
      Query.equal("userID", userId),
    ]);

    return response.documents.length > 0 ? response.documents[0].propertiesID: [];
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return [];
  }
};

export const getBookmarkedProperties = async (userId:string) => {
  try {
    const itemIds = await getUserBookmarks(userId);
    
    if (itemIds.length === 0) return [];

    const response = await databases.listDocuments(config.databaseId!,
      config.propertiesCollectionId!, [
      Query.equal("$id", itemIds), // Fetch properties matching these IDs
    ]);

    return response.documents;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};