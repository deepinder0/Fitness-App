import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  Share,
  Dimensions,
  BackHandler,
  Alert,
} from "react-native";
import { FontAwesome, Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import AvView from "./AvView";
import * as ImagePicker from "expo-image-picker";
import COLORS from "../../consts/color";
import styles from "./PostScreenStyles";
import { Actions } from "react-native-router-flux";
import { ScrollView } from "react-native-gesture-handler";

function PostsScreen() {
  const backActionHandler = () => {
    Alert.alert("Alert!", "Are you sure you want to Quit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => BackHandler.exitApp()(),
      },
    ]);
    return true;
  };

  useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, []);

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  var tempDataOfPosts = [
    {
      key: 1,
      username: "james",
      type: "image",
      source:
        "https://images.unsplash.com/photo-1585237232922-71277e8c055f?ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w4MTkwNzY2Nnx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      post:
        "Et odio mollitia et nostrum. Odio voluptate cum. Dolor molestiae et illo et qui. Nemo ex officiis et nisi eaque atque. Aperiam a molestias enim ut. Earum ad at perferendis quo quaerat dolore vero.",
      truncated: true,
      numberOfLikes: 11,
      like: false,
      avatarUrl: "https://unsplash.it/100?image=1005",
    },
    {
      key: 2,
      username: "jennifer",
      type: "image",
      source:
        "https://images.unsplash.com/photo-1548933122-5fedf3661c57?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      post:
        "Et odio mollitia et nostrum. Odio voluptate cum. Dolor molestiae et illo et qui. Nemo ex officiis et nisi eaque atque. Aperiam a molestias enim ut. Earum ad at perferendis quo quaerat dolore vero.",
      truncated: true,
      numberOfLikes: 11,
      like: false,
      avatarUrl: "https://unsplash.it/100?image=1027",
    },
    {
      key: 3,
      username: "cathy",
      type: "image",
      source:
        "https://images.unsplash.com/flagged/photo-1580051743902-bfebe05d70e0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzF8fGV4ZXJjaXNlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      post:
        "Et odio mollitia et nostrum. Odio voluptate cum. Dolor molestiae et illo et qui. Nemo ex officiis et nisi eaque atque. Aperiam a molestias enim ut. Earum ad at perferendis quo quaerat dolore vero.",
      truncated: true,
      numberOfLikes: 11,
      like: false,
      avatarUrl: "https://unsplash.it/100?image=996",
    },
    {
      key: 4,
      username: "zack",
      type: "image",
      source:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDV8fGV4ZXJjaXNlfGVufDB8MHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60",
      post:
        "Et odio mollitia et nostrum. Odio voluptate cum. Dolor molestiae et illo et qui. Nemo ex officiis et nisi eaque atque. Aperiam a molestias enim ut. Earum ad at perferendis quo quaerat dolore vero.",
      truncated: true,
      numberOfLikes: 11,
      like: false,
      avatarUrl: "https://unsplash.it/100?image=856",
    },
    {
      key: 5,
      username: "luke",
      type: "image",
      source:
        "https://images.unsplash.com/photo-1583639687726-84d20638bf63?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDN8fGV4ZXJjaXNlfGVufDB8MHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      post:
        "Et odio mollitia et nostrum. Odio voluptate cum. Dolor molestiae et illo et qui. Nemo ex officiis et nisi eaque atque. Aperiam a molestias enim ut. Earum ad at perferendis quo quaerat dolore vero.",
      truncated: true,
      numberOfLikes: 11,
      like: false,
      avatarUrl: "https://unsplash.it/100?image=669",
    },
    {
      key: 6,
      username: "anna",
      type: "image",
      source:
        "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTN8fGV4ZXJjaXNlfGVufDB8MHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      post:
        "Et odio mollitia et nostrum. Odio voluptate cum. Dolor molestiae et illo et qui. Nemo ex officiis et nisi eaque atque. Aperiam a molestias enim ut. Earum ad at perferendis quo quaerat dolore vero.",
      truncated: true,
      numberOfLikes: 11,
      like: false,
      avatarUrl: "https://unsplash.it/100?image=823",
    },
    {
      key: 7,
      username: "ken",
      type: "image",
      source:
        "https://images.unsplash.com/photo-1606889463862-a8fc57a706ce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjF8fGV4ZXJjaXNlfGVufDB8MHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      truncated: true,
      post:
        "Et odio mollitia et nostrum. Odio voluptate cum. Dolor molestiae et illo et qui. Nemo ex officiis et nisi eaque atque. Aperiam a molestias enim ut. Earum ad at perferendis quo quaerat dolore vero.",
      numberOfLikes: 11,
      like: false,
      avatarUrl: "https://unsplash.it/100?image=550",
    },
  ];
  var [dataOfPosts, setDataOfPosts] = useState(tempDataOfPosts);

  function handleLikeOfPosts(index, isLike) {
    let newDataOfPosts = [...tempDataOfPosts];
    newDataOfPosts[index].like = isLike;
    if (isLike) {
      newDataOfPosts[index].numberOfLikes++;
    } else {
      newDataOfPosts[index].numberOfLikes;
    }
    setDataOfPosts(newDataOfPosts.map(item => 
      item.key === index 
      ? {...item,like: isLike, numberOfLikes: newDataOfPosts[index].numberOfLikes}
      : item
      ));
  }
  let toggleTruncated = (index, isTruncated) => {
    let newDataOfPosts = [...tempDataOfPosts];
    newDataOfPosts[index].truncated = isTruncated;
    console.log(newDataOfPosts[index].truncated);
    setDataOfPosts(newDataOfPosts);
  };

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

  return (
    <View style={{ display: "flex", flex: 1, backgroundColor: "black" }}>
      <View style={{ display: "flex", flex: 1, marginTop: windowWidth / 30 }}>
        <ScrollView
          style={{ display: "flex", flex: 1, backgroundColor: "black" }}
        >
          {dataOfPosts?.map((item, index) => (
            <View style={styles.postView}>
              <View style={styles.profileImgAndNameView}>
                <Image
                  style={styles.profileImage}
                  source={{ uri: item.avatarUrl }}
                />
                <Text
                  style={styles.profileName}
                  onPress={() => {
                    Actions.OtherUser();
                  }}
                >
                  {item.username}
                </Text>
                <Entypo
                  name="dots-three-horizontal"
                  size={20}
                  color={COLORS.appPrimary}
                  style={{ lineHeight: windowHeight * 0.0937, marginRight: 15 }}
                  onPress={openImagePickerAsync}
                />
              </View>
              <AvView type={item.type} source={item.source} />
              <View style={styles.likeButton}>
                {item.like == false ? (
                  <Ionicons
                    name="ios-heart-outline"
                    size={25}
                    color={COLORS.appPrimary}
                    style={{ marginTop: 12, marginLeft: 10 }}
                    onPress={() => {
                      handleLikeOfPosts(index, true);
                    }}
                  />
                ) : (
                  <Ionicons
                    name="ios-heart"
                    size={25}
                    color={COLORS.appPrimary}
                    style={{ marginTop: 12, marginLeft: 10 }}
                    onPress={() => {
                      handleLikeOfPosts(index, false);
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
              <Text style={styles.numberOfLikes}>
                {item.numberOfLikes + " likes"}
              </Text>
              {item.truncated ? (
                <Text style={styles.postText}>
                  {item.post.slice(0, 100)}
                  <Text
                    style={{ color: "#707070" }}
                    onPress={() => {
                      toggleTruncated(index, false);
                    }}
                  >
                    ... Read more
                  </Text>
                </Text>
              ) : (
                <Text style={styles.postText}>
                  {item.post}
                  <Text
                    style={{ color: "#707070" }}
                    onPress={() => {
                      toggleTruncated(index, true);
                    }}
                  >
                    ... Read less
                  </Text>
                </Text>
              )}
              <View style={styles.bottomView}>
                <Text style={styles.bottomText}>{"X MINUTES AGO"}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default PostsScreen;
