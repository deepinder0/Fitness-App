import { Dimensions } from "react-native";
import COLORS from "../../consts/color";
import { StyleSheet } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  postView: {
    backgroundColor: "black",
    borderBottomWidth: 1,
    borderColor: "#707070",
  },
  profileImgAndNameView: {
    height: windowHeight * 0.0937,
    backgroundColor: "black",
    flexDirection: "row",
  },
  profileImage: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.05625,
    margin: 16,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.appPrimary,
  },
  profileName: {
    fontWeight: "bold",
    lineHeight: windowHeight * 0.0937,
    flex: 1,
    color: COLORS.appPrimary,
  },
  likeButton: {
    height: windowHeight * 0.0625,
    backgroundColor: "black",
    flexDirection: "row",
  },
  numberOfLikes: {
    fontSize: 12,
    color: COLORS.appPrimary,
    backgroundColor: "black",
    marginBottom: 5,
    paddingLeft: 13,
    fontWeight: "bold",
  },
  postText: {
    flex: 1,
    backgroundColor: "black",
    paddingLeft: 13,
    color: "white",
  },
  bottomView: {
    marginBottom: 10,
    paddingLeft: 13,
    backgroundColor: "black",
  },
  bottomText: {
    fontSize: 12,
    color: COLORS.appPrimary,
    backgroundColor: "black",
  },
});
export default styles;
