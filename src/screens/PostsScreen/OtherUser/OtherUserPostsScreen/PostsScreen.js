import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  Share,
  Dimensions,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import AvView from "../../AvView";
import * as Sharing from "expo-sharing";
import * as ImagePicker from "expo-image-picker";
import COLORS from "../../../../consts/color";
import styles from "./PostScreenStyles";
import contactData from "../../OtherUser/contact.json";
import { Actions } from "react-native-router-flux";

const OtherUserPostsScreen = (props) => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const onShare = async (item) => {
    try {
      const result = await Share.share({
        message: item.source,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };
  const [like, setLike] = useState(false);
  const [numberOflike, setnumberOfLike] = useState(11);
  const [isTruncated, setIsTruncated] = useState(true);

  let toggleTruncated = () => setIsTruncated(!isTruncated);

  let itemId = props.id;

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          marginTop: windowWidth / 15,
        }}
      >
        <TouchableOpacity
          onPress={() => Actions.homeScreen()}
          style={{ marginLeft: windowWidth / 90 }}
        >
          <AntDesign name="left" size={20} color="#00ff5f" />
        </TouchableOpacity>
        <View style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Text
            style={{
              textAlign: "center",
              color: "#00ff5f",
              fontSize: 20,
            }}
          >
            User Profile
          </Text>
        </View>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={contactData.posts}
        renderItem={({ item }) => (
          <View style={styles.postView}>
            <View style={styles.profileImgAndNameView}>
              <Image
                style={styles.profileImage}
                source={{ uri: item.user.avatar }}
              />
              <Text
                style={styles.profileName}
                // onPress={() => navigation.navigate("OtherUser")}
              >
                {item.user.username}
              </Text>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={COLORS.appPrimary}
                style={{ lineHeight: windowHeight * 0.0937, marginRight: 15 }}
                onPress={openImagePickerAsync}
              />
            </View>
            <AvView type={"image"} source={item.image} />
            <View style={styles.likeButton}>
              {like ? (
                <Ionicons
                  name="ios-heart-outline"
                  size={25}
                  color={COLORS.appPrimary}
                  style={{ marginTop: 12, marginLeft: 10 }}
                  onPress={() => {
                    setLike(!like);
                    setnumberOfLike(numberOflike + 1);
                  }}
                />
              ) : (
                <Ionicons
                  name="ios-heart"
                  size={25}
                  color={COLORS.appPrimary}
                  style={{ marginTop: 12, marginLeft: 10 }}
                  onPress={() => {
                    setLike(!like);
                    setnumberOfLike(numberOflike - 1);
                  }}
                />
              )}
              <FontAwesome
                name="location-arrow"
                size={25}
                color={COLORS.appPrimary}
                style={{ marginTop: 12, marginLeft: 20 }}
                onPress={() => {
                  onShare(item);
                }}
              />
            </View>
            <Text style={styles.numberOfLikes}>{numberOflike + " likes"}</Text>
            {
              isTruncated ?
              <Text style={styles.postText}>
                {item.paragraph.slice(0, 100)}
                <Text style={{ color: "#707070" }} onPress={toggleTruncated}>... Read more</Text>
              </Text>
              :
              <Text style={styles.postText}>
                {item.paragraph}
                <Text style={{ color: "#707070" }} onPress={toggleTruncated}> Read less</Text>
              </Text>
            }
            <View style={styles.bottomView}>
              <Text style={styles.bottomText}>{"X MINUTES AGO"}</Text>
            </View>
          </View>
        )}
        initialScrollIndex={itemId}
      />
    </View>
  );
};

export default OtherUserPostsScreen;
