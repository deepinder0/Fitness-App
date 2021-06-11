import React, { Component } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  TabView,
  TabBar
} from "react-native-tab-view";
import PropTypes from "prop-types";
import { image } from "../utils";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

import profileStyles from "./ProfileStyle";
import Posts from "./Posts";
import COLORS from "../../consts/color";
import { TouchableHighlight } from "react-native-gesture-handler";

const styles = StyleSheet.create({ ...profileStyles });

class Profile3 extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    avatarBackground: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    tabContainerStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
    ]),
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        imageHeight: PropTypes.number,
        imageWidth: PropTypes.number,
        postWidth: PropTypes.number,
      })
    ).isRequired,
  };

  static defaultProps = {
    containerStyle: {},
    tabContainerStyle: {},
  };

  state = {
    tabs: {
      index: 0,
      routes: [
        { key: "1", title: "PHOTOS", count: 11 },
        { key: "2", title: "RATINGS", count: 4.5 },
        { key: "3", title: "FOLLOWERS", count: "3 K" },
      ],
    },
    postsMasonry: {},
    isTruncated: false,
  };

  toggleTruncated = (isTruncated) => {
    isTruncated === true ? 
    this.setState({
      isTruncated: false
    })
    :
    this.setState({
      isTruncated: true
    })
  }
  componentWillMount() {
    this.setState({
      postsMasonry: image.mansonry(this.props.posts, "imageHeight"),
    });
  }

  handleIndexChange = (index) => {
    this.setState({
      tabs: {
        ...this.state.tabs,
        index,
      },
    });
  };

  renderTabBar = (props) => {
    return (
      <TabBar
        indicatorStyle={styles.indicatorTab}
        renderLabel={this.renderLabel(props)}
        pressOpacity={0.8}
        style={styles.tabBar}
        {...props}
      />
    );
  };

  renderLabel = (props) => ({ route }) => {
    const routes = props.navigationState.routes;

    let labels = [];
    routes.forEach((e, index) => {
      labels.push(
        index === props.navigationState.index ? COLORS.appPrimary : "gray"
      );
    });

    const currentIndex = parseInt(route.key) - 1;
    const color = labels[currentIndex];

    return (
      <View style={styles.tabRow}>
        <Animated.Text style={[styles.tabLabelNumber, { color }]}>
          {route.count}
        </Animated.Text>
        <Animated.Text style={[styles.tabLabelText, { color }]}>
          {route.title}
        </Animated.Text>
      </View>
    );
  };

  renderScene = ({ route: { key } }) => {
    switch (key) {
      case "1":
        return this.renderMansonry2Col();
      case "2":
        return this.renderMansonry2Col();
      case "3":
        return this.renderMansonry2Col();
      default:
        return <View />;
    }
  };

  renderContactHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      bio,
      experience,
      address,
      about,
    } = this.props;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          {/* previous code of background cover image
            <ImageBackground
            source={{ uri: avatarBackground }}
            style={styles.coverImage}
            >
            <View style={styles.coverTitleContainer}>
              <Text style={styles.coverTitle} />
            </View>
            <View style={styles.coverMetaContainer}>
              <Text style={styles.coverName}>{name}</Text>
              <Text style={styles.coverBio}>{bio}</Text>
            </View>
            </ImageBackground> 
          */}
          <View style={styles.upperProfileView}>
            <View style={styles.profileFeildsContainer}>
              <View style={styles.profileFeildLeftContainer}>
                <Text style={styles.profileName}>{name}</Text>
                <View style={{ flexDirection: "row", margin: 3 }}>
                  <MaterialIcons
                    name="accessibility"
                    color={COLORS.appPrimary}
                    size={20}
                  />
                  <Text style={styles.profileBio}>{bio[0]}</Text>
                </View>
                <View style={{ flexDirection: "row", margin: 3 }}>
                  <Ionicons
                    name="aperture-outline"
                    color={COLORS.appPrimary}
                    size={20}
                  />
                  <Text style={styles.profileBio}>{bio[1]}</Text>
                </View>
                <View style={{ flexDirection: "row", margin: 3 }}>
                  <Ionicons
                    name="timer-outline"
                    color={COLORS.appPrimary}
                    size={20}
                  />
                  <Text style={styles.profileBio}>{bio[2]}</Text>
                </View>
              </View>
              <View style={styles.profileFeildRightContainer}>
                <Image source={{ uri: avatar }} style={styles.profileImage} />
                <TouchableHighlight style={styles.profileFollowButton}>
                  <MaterialIcons
                    name="person-add-alt-1"
                    size={24}
                    color={COLORS.appPrimary}
                  />
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.dividerLineStyle} />
            <View style={{ flexDirection: "row", left: 10, right: 20 }}>
              <Text style={styles.profileAbout}>{experience}</Text>
            </View>
            <View style={{ flexDirection: "row", left: 10, right: 20 }}>
              <Text style={styles.profileAbout}>{address}</Text>
            </View>
            <Text
              style={{
                color: COLORS.appPrimary,
                left: 10,
                fontSize: 19,
                fontWeight: "bold",
                marginTop: 8
              }}
            >
              About
            </Text>
            <View style={{ flexDirection: "row", left: 10, right: 20 }}>
            {this.state.isTruncated ?
              <Text style={styles.profileAbout}>
                {about.slice(0, 100)}
                <Text style={{ color: "#707070" }} onPress={() => {this.toggleTruncated(this.state.isTruncated)}}>... Read more</Text>
              </Text>
              :
              <Text style={styles.profileAbout}>
                {about}
                <Text style={{ color: "#707070" }} onPress={() => {this.toggleTruncated(this.state.isTruncated)}}> Read less</Text>
              </Text>}
            </View>
            <View style={{ width: "100%" }}>
              <TouchableHighlight style={styles.checkAvailabilityButton}>
                <Text style={styles.textAviailabilty}>CHECK AVAILABILITY</Text>
              </TouchableHighlight>
            </View>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <TouchableHighlight style={styles.profileContactButtons}>
                <FontAwesome
                  name="phone"
                  size={22}
                  color={COLORS.appPrimary}
                />
              </TouchableHighlight>
              <TouchableHighlight style={styles.profileContactButtons}>
                <Ionicons
                  name="location"
                  size={22}
                  color={COLORS.appPrimary}
                />
              </TouchableHighlight>
              <TouchableHighlight style={styles.profileContactButtons}>
                <MaterialIcons
                  name="message"
                  size={22}
                  color={COLORS.appPrimary}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>
        {/* <View style={styles.profileImageContainer}>
          <Image source={{ uri: avatar }} style={styles.profileImage} />
        </View> */}
      </View>
    );
  };

  renderMansonry2Col = () => {
    return (
      <View style={styles.masonryContainer}>
        <View>
          <Posts
            containerStyle={styles.sceneContainer}
            posts={this.state.postsMasonry.leftCol}
          />
        </View>
        <View>
          <Posts
            containerStyle={styles.sceneContainer}
            posts={this.state.postsMasonry.rightCol}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={styles.scroll}>
        {/*<ImageBackground
          style={STYLES.imgBackground}
          resizeMode='cover'
          source={require('../../../assets/Images/BackGround.jpg')}>
        </ImageBackground>*/}
        <View style={[styles.container, this.props.containerStyle]}>
          <View style={styles.cardContainer}>
            {this.renderContactHeader()}
            <TabView
              style={[styles.tabContainer, this.props.tabContainerStyle]}
              navigationState={this.state.tabs}
              renderScene={this.renderScene}
              renderTabBar={this.renderTabBar}
              onIndexChange={this.handleIndexChange}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Profile3;
