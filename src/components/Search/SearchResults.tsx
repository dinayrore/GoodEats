import { IngredientsContext } from "contexts/ingredients.context";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import { styles } from "./index.styles";
import CTAButton from "components/CTAButton/CTAButton";
import { ButtonText } from "components/CTAButton/constants";

interface SearchBarProps {
  searchTerm: string;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, navigation }) => {
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const { ingredientList } = useContext(IngredientsContext);

  useEffect(() => {
    const newData = ingredientList.filter((result) =>
      result.name.toUpperCase().includes(searchTerm.toUpperCase()),
    );
    setSearchResult(newData);
  }, [searchTerm]);

  return (
    <View style={styles.resultsContainer}>
      {searchTerm.length > 0 && (
        <FlatList
          style={styles.list}
          data={searchResult}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => navigation.navigate("Ingredient Screen")}
              >
                <Text style={styles.result}>{item.toUpperCase()} </Text>
              </Pressable>
            );
          }}
        />
      )}

      <View style={styles.bottomButtons}>
        <CTAButton
          buttonText={ButtonText.addIngredient}
          onPress={() => navigation.navigate("Add Ingredient Screen")}
          icon={"plus"}
          mode={"contained"}
        />
      </View>
    </View>
  );
};

export default SearchBar;
