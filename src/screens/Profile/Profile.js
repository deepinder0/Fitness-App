import * as React from 'react';
import { FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AddCommentScreen from './Comments/AddCommentScreen';
import PostCard from '../../components/PostCard';

import {
  Container,
} from '../../styles/FeedStyles';
import COLORS from '../../consts/color';
const Posts = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../../../assets/users/user-3.jpg'),
    postTime: '4 mins ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/userFit.jpeg'),
    liked: true,
    likes: '14',
    comments: '5'
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../../../assets/users/user-1.jpg'),
    postTime: '2 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/userFit.jpeg'),
    liked: true,
    likes: '8',
    comments: '0'
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../../../assets/users/user-4.jpg'),
    postTime: '1 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/userFit.jpeg'),
    liked: true,
    likes: '1',
    comments: '0'
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../../../assets/users/user-6.jpg'),
    postTime: '1 day ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/userFit.jpeg'),
    liked: true,
    likes: '22',
    comments: '4'
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../../../assets/users/user-7.jpg'),
    postTime: '2 days ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/userFit.jpeg'),
    liked: true,
    likes: '0',
    comments: '0'
  },
];
const HomePosts = ({ props, navigation }) => {
  return (
    <Container>
      <FlatList
        data={Posts}
        renderItem={({ item }) => <PostCard item={item} screenName={'AddCommentScreen'} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const ProfileStack = createStackNavigator();

function Profile() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <ProfileStack.Screen name="HomePosts" component={HomePosts} />
      <ProfileStack.Screen name="AddCommentScreen" component={AddCommentScreen} />
    </ProfileStack.Navigator>
  )
}

export default Profile;