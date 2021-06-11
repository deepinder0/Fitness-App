import { Dimensions } from "react-native";
import COLORS from "../../consts/color";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default {
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  profileContainer: {
    marginBottom: 55,
    position: "relative",
  },
  upperProfileView: {
    height: Dimensions.get("window").width * (5 / 4),
    width: Dimensions.get("window").width,
  },
  profileMetaContainer: {
    backgroundColor: "transparent",
    paddingBottom: 10,
    paddingLeft: 135,
  },
  profileName: {
    color: COLORS.appPrimary,
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 7,
  },
  profileTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileFeildsContainer: {
    backgroundColor: "transparent",
    flex: 1,
    position: "relative",
    justifyContent: "space-between",
    paddingTop: 45,
    flexDirection: "row",
  },
  profileFeildLeftContainer: {
    top: 30,
    left: 10,
    position: "absolute",
  },
  profileFeildRightContainer: {
    top: 30,
    right: 20,
    position: "absolute",
  },
  profileBio: {
    color: "#FFF",
    fontSize: 15,
    left: 10,
    fontWeight: "600",
  },
  profileAbout: {
    color: "#FFF",

    flexShrink: 1,
  },
  profileImage: {
    borderColor: COLORS.appPrimary,
    borderRadius: 55,
    borderWidth: 3,
    height: 80,
    width: 80,
  },
  profileImageContainer: {
    top: 30,
    right: 10,
    position: "absolute",
  },
  profileFollowButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "black",
    borderColor: COLORS.appPrimary,
    borderRadius: 5,
    borderWidth: 2,
    margin: 10,
  },
  checkAvailabilityButton: {
    backgroundColor: "black",
    borderColor: COLORS.appPrimary,
    borderRadius: 5,
    borderWidth: 2,
    margin: 10,
    alignItems: 'center'
  },
  textAviailabilty: {
    color: COLORS.appPrimary,
    fontSize: 15,
    fontWeight: "bold",
    padding: 4,
  },
  profileContactButtons: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
    borderColor: COLORS.appPrimary,
    borderRadius: 5,
    borderWidth: 2,
    paddingHorizontal: windowHeight * .059,
    paddingVertical: 13,
    marginHorizontal: 10,
  },
  dividerLineStyle: {
    borderWidth: 0.5,
    borderColor: "#c9c9c9",
    margin: 10,
  },
  coverBio: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  coverContainer: {
    marginBottom: 55,
    position: "relative",
  },
  coverImage: {
    height: Dimensions.get("window").width * (3.5 / 4),
    width: Dimensions.get("window").width,
  },
  coverMetaContainer: {
    backgroundColor: "transparent",
    paddingBottom: 10,
    paddingLeft: 135,
  },
  coverName: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    paddingBottom: 2,
  },
  coverTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  coverTitleContainer: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 45,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "black",
  },
  indicatorTab: {
    backgroundColor: "black",
  },
  masonryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft: 0,
    marginRight: 0,
  },

  sceneContainer: {
    marginTop: 15,
  },
  scroll: {
    backgroundColor: "black",
  },
  tabBar: {
    backgroundColor: "transparent",
    marginBottom: -10,
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
    marginTop: -55,
    position: "relative",
    zIndex: 10,
  },
  tabRow: {
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
  },
  tabLabelNumber: {
    color: "black",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 2,
  },
  tabLabelText: {
    color: COLORS.appPrimary,
    fontSize: 10,
    textAlign: "left",
  },
};
