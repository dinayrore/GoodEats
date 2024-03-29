import React, { useRef, useState, useEffect, useContext } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Image, Text, View } from "react-native";
import { styles } from "./camera.styles";
import Icon from "components/Icons/Icon";
import { AuthenticationContext } from "contexts/authentication.context";
import { theme } from "infrastructure/theme/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import Button from "components/Button/Button";

interface CameraScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [image, setImage] = useState<string>();
  const [type, setType] = useState<CameraType>(CameraType.front);
  const [flash, setFlash] = useState(FlashMode.off);
  const cameraRef = useRef<Camera | null>(null);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.accessDenied}>Access Denied</Text>
        <Icon type={"Fontisto"} name={"locked"} size={theme.spacing.xl} />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        setDisabled(true);
        const data = await cameraRef.current?.takePictureAsync({
          base64: true,
        });
        if (data) {
          setImage(data.uri);
        }
        setDisabled(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const savePhoto = async () => {
    if (image) {
      try {
        setDisabled(true);
        await MediaLibrary.createAssetAsync(image);
        if (user) {
          AsyncStorage.setItem(`${user.uid}-photo`, image);
        }
        setImage(undefined);
        setDisabled(false);
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.camera} />
          <View style={styles.imageContainer}>
            <Button
              text={"Save Photo"}
              onPress={savePhoto}
              disabled={disabled}
              children={
                <Icon
                  type={"Entypo"}
                  name={"check"}
                  color={theme.colors.turquoise}
                />
              }
              customStyles={styles.button}
            />
            <Button
              text={"Retake Photo"}
              onPress={() => setImage(undefined)}
              disabled={disabled}
              children={
                <Icon
                  type={"FontAwesome5"}
                  name={"retweet"}
                  color={theme.colors.turquoise}
                />
              }
              customStyles={styles.button}
            />
          </View>
        </>
      ) : (
        <View style={styles.camera}>
          <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          >
            <View style={styles.cameraButtons}>
              <Button
                text={""}
                onPress={() =>
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back,
                  )
                }
                customStyles={styles.button}
              >
                {type === CameraType.front ? (
                  <Icon
                    type={"MaterialCommunityIcon"}
                    name={"camera-front-variant"}
                    color={theme.colors.turquoise}
                  />
                ) : (
                  <Icon
                    type={"MaterialCommunityIcon"}
                    name={"camera-flip"}
                    color={theme.colors.turquoise}
                  />
                )}
              </Button>
              <Button
                text={""}
                onPress={() =>
                  setFlash(
                    flash === FlashMode.off ? FlashMode.on : FlashMode.off,
                  )
                }
                disabled={disabled}
                customStyles={styles.button}
              >
                {flash === FlashMode.off ? (
                  <Icon
                    type={"Ionicons"}
                    name={"flash-off"}
                    color={theme.colors.turquoise}
                  />
                ) : (
                  <Icon
                    type={"Ionicons"}
                    name={"flash"}
                    color={theme.colors.turquoise}
                  />
                )}
              </Button>
            </View>
          </Camera>
          <View style={styles.buttonContainer}>
            <Button
              text={"Take A Photo"}
              onPress={takePhoto}
              disabled={disabled}
              children={
                <Icon
                  type={"MaterialIcons"}
                  name={"photo-camera"}
                  color={theme.colors.turquoise}
                />
              }
              customStyles={styles.fullWidthButton}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default CameraScreen;
