import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import DreamsStack from "./DreamsStack";
import { theme } from "../styles/theme";
import {
  Moon,
  CalendarBlank,
  User,
  Lightning,
  PenNib,
} from "phosphor-react-native";
import DejaVusStack from "./DejaVuStack";
import JournalStack from "./JournalStack";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(18, 10, 35, 0.95)",
          borderTopWidth: 0,
          position: "absolute",
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: theme.font.body,
        },
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Moon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Dreams"
        component={DreamsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CalendarBlank color={color} size={size} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Dreams", { screen: "DreamsList" });
          },
        })}
      />
      <Tab.Screen
        name="Déjà Vu"
        component={DejaVusStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Lightning color={color} size={size} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Déjà Vu", { screen: "DejaVusScreen" });
          },
        })}
      />

      <Tab.Screen
        name="Journal"
        component={JournalStack}
        options={{
          tabBarIcon: ({ color, size }) => <PenNib color={color} size={size} />,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Journal", { screen: "JournalsScreen" });
          },
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
