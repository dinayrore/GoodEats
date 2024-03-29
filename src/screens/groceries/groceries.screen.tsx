import React from "react";
import { List } from "react-native-paper";
import { GroceriesContainer, GroceryItem, Loading } from "./groceries.styles";
import ListIcon from "../../components/Lists/PressableList";
import Search from "../../components/Search/SearchBar";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from "react-navigation";
import { SafeAreaView } from "react-native";
import { globalStyles } from "infrastructure/theme/global.styles";

interface GroceriesScreenProps {
  groceries: Grocery[];
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export const GroceriesScreen: React.FC<GroceriesScreenProps> = ({
  groceries,
  navigation,
}) => {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      {/* {isLoading ? (
        <Loading size="large" color="#03F7EB" />
      ) : (
        <>
          <SearchContainer>
            <SearchBar placeholder={"Search for location..."} />
          </SearchContainer>

          {/* <Favorites favorites={favorites} navigation={navigation} /> */}

      {/* <GroceriesContainer>
            <List.Section>
              {groceries.map((grocery) => {
                const IconComponent = () => {
                  <ListIcon iconProps={grocery.icon} />;
                };
                return (
                  <GroceryItem
                    key={grocery.id.toString()}
                    title={grocery.title}
                    description={grocery.description}
                    left={() => IconComponent}
                    onPress={() => navigation.navigate("Favorites")}
                  />
                );
              })}
            </List.Section>
          </GroceriesContainer>
        </> 
      )} */}
    </SafeAreaView>
  );
};
