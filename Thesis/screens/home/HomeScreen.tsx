import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenContainer from "../../layouts/ScreenContainer";
import WidgetBox from "../../components/widgets/WidgetBox";
import QuoteBlock from "../../components/widgets/QuoteBlock";
import SearchField from "../../components/inputs/SearchField";
import VoiceInputField from "../../components/inputs/VoiceInputField";
import ReviewCardModal from "../../components/cards/ReviewCard";
import { theme } from "../../styles/theme";
import { useAuth } from "../../contexts/AuthContext";
import {
  getAllDreams,
  getAllDejaVus,
  logDream,
  logDejaVu,
} from "../../services/homeService";
import { getDailyQuote } from "../../services/quoteService";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useReviewModal } from "../../hooks/useReviewModal";

import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import Fuse from "fuse.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Animated } from "react-native";
import { useRef } from "react";

import {
  createSearchIndex,
  searchInIndex,
  SearchResult,
} from "../../utils/searchUtils";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Dream } from "../../types/Dream";
import { DejaVu } from "../../types/DejaVu";
import { Feather } from "@expo/vector-icons";
import JournalEntryWidget from "../../components/widgets/JournalEntryWidget";

type TabParamList = {
  Home: undefined;
  Dreams: {
    screen: "DreamDetail";
    params: { dreamId: string };
  };
  "Déjà Vu": {
    screen: "DejaVuDetail";
    params: { dejaVuId: string };
  };
  Profile: undefined;
};

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<any>
>;

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const username = user?.email?.split(/[@.]/)[0] || "dreamer";
  const navigation = useNavigation<NavigationProp>();
  const { showMessage } = useSnackbar();

  const [loading, setLoading] = useState(true);
  const [dreamCount, setDreamCount] = useState(0);
  const [dejaVuCount, setDejaVuCount] = useState(0);
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [allDreams, setAllDreams] = useState<Dream[]>([]);
  const [allDejaVus, setAllDejaVus] = useState<DejaVu[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchActive, setSearchActive] = useState(false);
  const [fuse, setFuse] = useState<Fuse<SearchResult> | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (searchActive) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [searchActive]);

  const {
    showReview,
    reviewText,
    selectedType,
    setReviewText,
    setSelectedType,
    open,
    close,
  } = useReviewModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dreams = await getAllDreams();
        const dejaVus = await getAllDejaVus();
        const dailyQuote = await getDailyQuote();

        setDreamCount(dreams.length);
        setDejaVuCount(dejaVus.length);
        setQuote(dailyQuote);

        setAllDreams(dreams);
        setAllDejaVus(dejaVus);
        setFuse(createSearchIndex(dreams, dejaVus));
      } catch (error) {
        console.warn("Failed to fetch home screen data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLog = async (type: "dream" | "dejavu", text: string) => {
    close();

    try {
      const response =
        type === "dream" ? await logDream(text) : await logDejaVu(text);

      if (!response || !response.id) {
        throw new Error("Invalid response from log API");
      }

      showMessage(type === "dream" ? "Dream saved ✨" : "Déjà vu saved 🌀");

      if (type === "dream") {
        navigation.navigate("Dreams", {
          screen: "DreamDetail",
          params: { dreamId: response.id },
        });
      } else {
        navigation.navigate("Déjà Vu", {
          screen: "DejaVuDetail",
          params: { dejaVuId: response.id },
        });
      }
    } catch (err) {
      console.error("Logging failed:", err);
      showMessage("Something went wrong while saving.");
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (!text || !fuse) {
      setSearchResults([]);
      return;
    }
    const results = searchInIndex(fuse, text);
    setSearchResults(results);
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      {searchActive && (
        <Animated.View style={[styles.searchOverlay, { opacity: fadeAnim }]}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search dreams or déjà vus..."
                value={searchQuery}
                onChangeText={handleSearch}
                placeholderTextColor={theme.colors.textMuted}
                autoFocus
              />
              <TouchableOpacity
                onPress={() => {
                  setSearchActive(false);
                  setSearchQuery("");
                  setSearchResults([]);
                }}
              >
                <Feather
                  name="x"
                  size={24}
                  color={theme.colors.textLight}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSearchActive(false);
                    setSearchQuery("");
                    setSearchResults([]);
                    if (item.type === "dream") {
                      navigation.navigate("Dreams", {
                        screen: "DreamDetail",
                        params: { dreamId: item.id },
                      });
                    } else {
                      navigation.navigate("Déjà Vu", {
                        screen: "DejaVuDetail",
                        params: { dejaVuId: item.id },
                      });
                    }
                  }}
                  style={styles.resultItem}
                >
                  <Text style={styles.resultText}>
                    {item.content.slice(0, 80)}...
                  </Text>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </Animated.View>
      )}

      <ScreenContainer>
        <View style={styles.wrapper}>
          <Text style={styles.greeting}>Hello, {username}</Text>
          <Text style={styles.subtitle}>Welcome back to your dreamspace</Text>

          <View style={styles.row}>
            <View style={styles.widgetContainer}>
              <WidgetBox title="Dream Stats">
                <Text style={styles.widgetValue}>{dreamCount} Dreams</Text>
                <Text style={styles.widgetValue}>{dejaVuCount} Déjà vus</Text>
              </WidgetBox>
            </View>
            <View style={styles.widgetContainer}>
              <JournalEntryWidget />
            </View>
          </View>

          <QuoteBlock quote={quote.text} author={quote.author} />

          <TouchableOpacity onPress={() => setSearchActive(true)}>
            <SearchField
              placeholder="Search your dreams..."
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>

          <VoiceInputField
            onTextFinalized={(text) => {
              open(text); // ✅ useReviewModal handles modal open
            }}
          />

          <ReviewCardModal
            visible={showReview}
            text={reviewText}
            onTextChange={setReviewText}
            onClose={close}
            onLogDream={() => handleLog("dream", reviewText)}
            onLogDejaVu={() => handleLog("dejavu", reviewText)}
          />
        </View>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  widgetContainer: {
    flex: 1,
    minHeight: 120, // Or match your WidgetBox's height
  },

  wrapper: {
    flex: 1,
    justifyContent: "center",
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    minWidth: "100%",
  },
  greeting: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.xxl,
    color: theme.colors.blushPetal,
    textAlign: "center",
    textShadowColor: theme.shadow.pinkGlow,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textMuted,
    textAlign: "center",
    marginBottom: theme.spacing.md,
    textShadowColor: theme.shadow.pinkGlow,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  widgetValue: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textMuted,
  },
  widgetDate: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.xxl,
    color: theme.colors.accent,
    textAlign: "center",
  },
  searchOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    backgroundColor: "rgba(24,24,28,0.88)",
  },
  safeArea: {
    flex: 1,
    padding: theme.spacing.md,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.accent,
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
    color: theme.colors.textLight,
    backgroundColor: theme.colors.surface,
  },
  closeIcon: {
    marginLeft: theme.spacing.sm,
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  resultText: {
    color: theme.colors.textLight,
  },
});
