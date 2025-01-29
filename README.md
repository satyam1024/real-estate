# Real Estate App

A modern and user-friendly real estate mobile application built with **React Native** and **Appwrite**. This app allows users to browse, bookmark, and book properties seamlessly.

## 🚀 Features
- **User Authentication** (Sign Up, Login) using **Appwrite**
- **Property Listings** (View properties with images, details, and pricing)
- **Bookmark Properties** (Save favorite properties)
- **Search & Filter** (Find properties based on location, price, and other criteria)
- **Seamless UI** (Smooth navigation and modern UI design with NativeWind)

## 🛠 Tech Stack
- **Frontend:** React Native, TypeScript, NativeWind
- **Backend & Database:** Appwrite
- **State Management:** React Hooks & Context API
- **Navigation:** Expo Router
- **Image Handling:** Cloud storage via Appwrite

## 📦 Installation & Setup

### Prerequisites
- Node.js & npm installed
- Expo CLI installed (`npm install -g expo-cli`)
- Appwrite instance set up

### Steps to Run the Project
```sh
# Clone the repository
git clone https://github.com/your-username/real-estate-app.git
cd real-estate-app

# Install dependencies
npm install

# Set up environment variables (Appwrite project details)
touch .env.local
# Add your Appwrite credentials inside .env.local

# Start the development server
npx expo start
```

## 📂 Folder Structure
```
real-estate-app/
│-- src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # App screens (Home, Details, Bookmarks, etc.)
│   ├── navigation/      # App navigation setup
│   ├── constants/       # Assets, icons, images
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│-- app.json             # Expo configuration
│-- .env.local           # Environment variables
│-- package.json         # Dependencies & scripts
```

## 🔗 API & Database Structure
This app uses **Appwrite** for user authentication and database storage. The main collections are:
- **users**: Stores user details
- **properties**: Stores property listings with images, location, price, etc.
- **bookmarks**: Stores user-specific bookmarked properties

## 📌 Future Enhancements
- **In-app Messaging** (Chat between buyers and sellers)
- **Map Integration** (View properties on a map)
- **Payment Gateway** (For secure property bookings)


Happy Coding! 🚀

