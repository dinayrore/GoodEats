import React, { useContext, useState } from "react";
import { ImageBackground, View, Text, TextInput } from "react-native";
import { AuthenticationContext } from "contexts/authentication.context";
import LoadingScreen from "screens/loading/loading.screen";
import { theme } from "infrastructure/theme/theme";
import { styles } from "./index.styles";
import Button from "components/Button/Button";

const RegistrationScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { onRegister, isLoading, error } = useContext(AuthenticationContext);
  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={require("assets/images/backgrounds/good-eats.jpeg")}
    >
      <View style={styles.overlay} />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          {error && <Text style={styles.error}>{error}</Text>}
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            selectionColor={theme.colors.turquoise}
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(u) => setEmail(u)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            selectionColor={theme.colors.turquoise}
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            selectionColor={theme.colors.turquoise}
            value={confirmPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setConfirmPassword(p)}
          />
          <Button
            text="Register"
            onPress={() => onRegister(email, password, confirmPassword)}
            disabled={false}
            customStyles={styles.loginButton}
          />
        </View>
      )}
    </ImageBackground>
  );
};

export default RegistrationScreen;
