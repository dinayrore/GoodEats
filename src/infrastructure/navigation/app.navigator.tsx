import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigatorParamList } from "types/navigation.types";
import { AuthenticationNavigator } from "./authentication.navigator";

import { AuthenticationContext } from "contexts/authentication.context";
import { RecipesContextProvider } from "contexts/recipes.context";
import { FavoritesContextProvider } from "contexts/favorites.context";
import { IngredientsContextProvider } from "contexts/ingredients.context";
import { VoiceContextProvider } from "contexts/voice.context";

import { RecipesNavigator } from "./recipes.navigator";
import Icon from "components/Icon/Icon";
import { IngredientsNavigator } from "./ingredients.navigator";
import { ProfileNavigator } from "./profile.navigator";

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const screenOptions = {
  headerShown: false,
};

const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <VoiceContextProvider>
          <FavoritesContextProvider>
            <RecipesContextProvider>
              <IngredientsContextProvider>
                <Tab.Navigator
                  initialRouteName="Profile"
                  screenOptions={screenOptions}
                >
                  <Tab.Screen
                    name="Recipes"
                    component={RecipesNavigator}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Icon
                          type={"MaterialCommunityIcon"}
                          name={"card-text-outline"}
                          color={color}
                          size={size}
                        />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="Ingredients"
                    component={IngredientsNavigator}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Icon
                          type={"Ionicons"}
                          name={"md-restaurant"}
                          color={color}
                          size={size}
                        />
                      ),
                    }}
                  />

                  <Tab.Screen
                    name="Profile"
                    component={ProfileNavigator}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Icon
                          type={"SimpleLineIcons"}
                          name={"settings"}
                          color={color}
                          size={size}
                        />
                      ),
                    }}
                  />
                </Tab.Navigator>
              </IngredientsContextProvider>
            </RecipesContextProvider>
          </FavoritesContextProvider>
        </VoiceContextProvider>
      ) : (
        <AuthenticationNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
