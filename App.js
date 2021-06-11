import "react-native-gesture-handler";
import * as React from "react";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/registerScreen";
import homeScreen from "./src/screens/homeScreen";
import { Router, Stack, Scene } from "react-native-router-flux";
import AddRotineScreen from "./src/screens/WorkoutScreen/AddRotineScreen";
import CustomRoutine from "./src/screens/WorkoutScreen/CustomRoutine";
import ExerciseLevel from "./src/screens/WorkoutScreen/ExerciseLevel";
import ExerciseSets from "./src/screens/WorkoutScreen/ExerciseSets";
import ExercisesList from "./src/screens/WorkoutScreen/ExercisesList";
import RoutineLevel from "./src/screens/WorkoutScreen/RoutineLevel";
import WorkoutScreen from "./src/screens/WorkoutScreen/AddExerciseScreen";
import PostsScreen from "./src/screens/PostsScreen/PostsScreen";
import Finder from "./src/screens/Finder/Finder";
import TrainerProfile from "./src/components/TrainerProfile";
import UserProfile from "./src/components/userProfile";
import OtherUser from "./src/screens/PostsScreen/OtherUser";
import OtherUserPostsScreen from "./src/screens/PostsScreen/OtherUser/OtherUserPostsScreen/PostsScreen";
import Namo from "./src/screens/WorkoutScreen/Namo";
import ManageDiet from "./src/screens/WorkoutScreen/ManageDiet";
import MyTrainer from "./src/screens/WorkoutScreen/MyTrainer";
import MyMusic from "./src/screens/WorkoutScreen/MyMusic";
import Screen4 from "./src/screens/WorkoutScreen/Screen4";
import Timer from "./src/screens/WorkoutScreen/Timer";
import AddPost from "./src/screens/AddRotineScreen/AddPost";
import FirstScreen from "./src/screens/FirstScreen";
import RegisterCategory from "./src/screens/RegisterCategory";
import UsernameRegistry from "./src/screens/UsernameRegistry";
import SwitchScreen from "./src/screens/SwitchScreen";
import PreviousExercises from "./src/screens/WorkoutScreen/PreviousExercises";
export default function App() {

  return (
    <Router>
      <Stack key="root">
        <Scene
          key="switchScreen"
          component={SwitchScreen}
          title="SwitchScreen"
          hideTabBar={true}
          initial={true}
          hideNavBar={true}
        />
        <Scene
          key="FirstScreen"
          component={FirstScreen}
          title="FirstScreen"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="registerCategory"
          component={RegisterCategory}
          title="RegisterCategory"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="usernameRegistry"
          component={UsernameRegistry}
          title="UsernameRegistry"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="loginScreen"
          component={LoginScreen}
          title="LoginScreen"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="registerScreen"
          component={RegisterScreen}
          title="RegisterScreen"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="homeScreen"
          component={homeScreen}
          title="homeScreen"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="PostsScreen"
          component={PostsScreen}
          title="PostsScreen"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="OtherUser"
          component={OtherUser}
          title="OtherUser"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="OtherUserPostsScreen"
          component={OtherUserPostsScreen}
          title="OtherUserPostsScreen"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="AddPost"
          component={AddPost}
          title="AddPost"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="Finder"
          component={Finder}
          title="Finder"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="TrainerProfile"
          component={TrainerProfile}
          title="TrainerProfile"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="UserProfile"
          component={UserProfile}
          title="UserProfile"
          hideTabBar={true}
          hideNavBar={true}
        />

        <Scene
          key="AddRotineScreen"
          component={AddRotineScreen}
          title="AddRotineScreen"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="RoutineLevel"
          component={RoutineLevel}
          title="RoutineLevel"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="CustomRoutine"
          component={CustomRoutine}
          title="CustomRoutine"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="WorkoutScreen"
          component={WorkoutScreen}
          title="WorkoutScreen"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="ExerciseLevel"
          component={ExerciseLevel}
          title="ExerciseLevel"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="ExercisesList"
          component={ExercisesList}
          title="ExercisesList"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="ExerciseSets"
          component={ExerciseSets}
          title="ExerciseSets"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="PreviousExercises"
          component={PreviousExercises}
          title="PreviousExercises"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="ManageDiet"
          component={ManageDiet}
          title="ManageDiet"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="MyTrainer"
          component={MyTrainer}
          title="MyTrainer"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="MyMusic"
          component={MyMusic}
          title="MyMusic"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="Screen4"
          component={Screen4}
          title="Screen4"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="Namo"
          component={Namo}
          title="Namo"
          hideTabBar={true}
          hideNavBar={true}
        />
        <Scene
          key="Timer"
          component={Timer}
          title="Timer"
          hideTabBar={true}
          hideNavBar={true}
        />
      </Stack>
    </Router>
  );
}
