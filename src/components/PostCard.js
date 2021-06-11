import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles';
import { useNavigation } from "@react-navigation/native";
import COLORS from '../consts/color'

const PostCard = ({ item, screenName }) => {
  const navigation = useNavigation();
  likeIcon = item.liked ? 'heart' : 'heart-outline';
  likeIconColor = item.liked ? COLORS.appPrimary : '#333';

  if (item.likes == 1) {
    likeText = '1 Like';
  } else if (item.likes > 1) {
    likeText = item.likes + ' Likes';
  } else {
    likeText = 'Like';
  }

  if (item.comments == 1) {
    commentText = '1 Comment';
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comments';
  } else {
    commentText = 'Comment';
  }

  return (
    <Card>
      <UserInfo>
        <UserImg source={item.userImg} />
        <UserInfoText>
          <UserName>{item.userName}</UserName>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg != 'none' ? <PostImg source={item.postImg} /> : <Divider />}

      <InteractionWrapper>
        <Interaction active={item.liked}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} color={likeIconColor} />
          <InteractionText active={item.liked} onPress={() => navigation.navigate(screenName)}>{commentText}</InteractionText>
        </Interaction>
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;