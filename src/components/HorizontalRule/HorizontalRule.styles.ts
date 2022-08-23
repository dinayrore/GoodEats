import { StyleSheet } from "react-native";
import { theme } from "infrastructure/theme";

export const styles = StyleSheet.create({
  line: {
    borderBottomColor: theme.colors.text.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
