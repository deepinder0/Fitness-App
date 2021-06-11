import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { Actions } from "react-native-router-flux";

const styles = StyleSheet.create({
  container: {},
  postImage: {},
});

const Post = ({
  containerStyle,
  image,
  imageHeight,
  imageWidth,
  postWidth,
  id,
}) => {
  return (
    <TouchableOpacity
      // onPress={() => {
      //   navigation.navigate("OtherUserPostsScreen", { id: id });
      // }}
      onPress={() => {
        Actions.OtherUserPostsScreen({ id: id });
      }}
    >
      <View style={[styles.container, containerStyle]}>
        {image && (
          <Image
            style={[
              styles.postImage,
              {
                width: postWidth,
                height: postWidth * (imageHeight / imageWidth),
              },
            ]}
            source={{ uri: image }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

Post.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  image: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  postWidth: PropTypes.number,
  id: PropTypes.number,
};

Post.defaultProps = {
  containerStyle: {},
  image: null,
  imageHeight: null,
  imageWidth: null,
  postWidth: null,
};

export default Post;
