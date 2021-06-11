import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  AddImage,
  InputField,
  InputWrapper,
  StatusWrapper,
  SubmitBtn,
  SubmitBtnText,
} from "./AddPostStyles";
import React, { useState } from "react";

import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import COLORS from "../../consts/color";

const AddPostScreen = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const takePhotoFromCamera = () => {
    console.log('pick image from camera');
  };

  const choosePhotoFromLibrary = () => {
    console.log('pick image from phone');
  };
  // submitting post
  const submitPost = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

    // Add timestamp to File Name
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(filename).putFile(uploadUri);

    // Set transferred state
    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100
      );
    });

    try {
      await task;

      setUploading(false);
      Alert.alert(
        "Image uploaded!",
        "Your image has been uploaded to the Firebase Cloud Storage Successfully!"
      );
    } catch (e) {
      console.log(e);
    }

    setImage(null);
  };

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image != null ? <AddImage source={{ uri: image }} /> : null}

        <InputField
          placeholder="What's on your mind?"
          placeholderTextColor={COLORS.appPrimary}
          style={{ color: COLORS.appPrimary }}
          multiline
          numberOfLines={4}
        />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color={COLORS.appPrimary} />
          </StatusWrapper>
        ) : (
          <SubmitBtn
            onPress={
              // submitPost
              () => console.log('uncomment submit Post to submit post')
            }
          >
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}
      </InputWrapper>
      <ActionButton buttonColor={COLORS.appPrimary}>
        <ActionButton.Item
          buttonColor={COLORS.appPrimary}
          title="Take Photo"
          onPress={takePhotoFromCamera}
        >
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={COLORS.appPrimary}
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}
        >
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
