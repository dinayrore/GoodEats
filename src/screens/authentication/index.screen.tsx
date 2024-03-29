import React from "react";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import { styles } from "./index.styles";
import { ImageBackground, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { theme } from "infrastructure/theme/theme";
import Icon from "components/Icons/Icon";
import Button from "components/Button/Button";

interface AuthenticationScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const AuthenticationScreen: React.FC<AuthenticationScreenProps> = ({
  navigation,
}) => {
  return (
    <>
      <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("assets/images/backgrounds/good-eats.jpeg")}
      >
        <View style={styles.overlay} />
        <View style={styles.animationWrapper}>
          <LottieView
            key="animation"
            autoPlay
            loop
            resizeMode="cover"
            source={require("assets/lottie/watermelon.json")}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Good Eats</Text>
          <Button
            text="Login"
            onPress={() => navigation.navigate("Login")}
            disabled={false}
          >
            <Icon type={"MaterialIcons"} name={"login"} />
          </Button>
          <Button
            text="Register"
            onPress={() => navigation.navigate("Register")}
            disabled={false}
            customStyles={{
              backgroundColor: theme.colors.turquoise,
            }}
            children={<Icon type={"Fontisto"} name={"locked"} />}
          />
        </View>
      </ImageBackground>
    </>
  );
};

export default AuthenticationScreen;
