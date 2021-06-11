import React, { useState, useCallback } from 'react';
import {  StyleSheet, Text, View,FlatList, TextInput, KeyboardAvoidingView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';

import Comment from './Comment';
import COLORS from '../../../consts/color';


const AddCommentScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={styles.root}
        data={['Comment 1', 'Comment 2']}
        ItemSeparatorComponent={() => {
          return(
            <View/>
          )
        }}
        renderItem={(item) => {
          const comment = item.item
          return (
            <Comment comment={comment} commentId={item.index}/>
          )
        }}
      />
      <KeyboardAvoidingView style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.inputs}
            placeholderTextColor='Leave a comment'
            placeholderTextColor={COLORS.appPrimary}
            // value={}
            onChangeText={(value) => console.log(value)}
          />
          <View style={styles.postButtonContainer}>
            <TouchableOpacity onPress={() => console.log('Post button')}>
              <Text>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
const styles = StyleSheet.create({
  root: {
      backgroundColor: "#000",
      marginBottom: 45
  },
  inputs: {
      height: 45,
      width: '85%',
      marginLeft: 16,
      borderBottomColor: COLORS.appPrimary,
      borderTopColor: COLORS.appPrimary,
      color: COLORS.appPrimary,
      flex: 1,
      position: 'absolute',
      bottom: 0,
      paddingRight: 20
  },
  inputContainer: {
      borderBottomColor: COLORS.appPrimary,
      borderTopColor: COLORS.appPrimary,
      backgroundColor: '#000',
      borderBottomWidth: 1,
      borderTopWidth: 1,
      width: '100%',
      height: 45,
      flexDirection: 'row',
      alignItems: 'center',

      shadowColor: "#808080",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
  },
  postButtonContainer: {
      position: 'absolute', 
      right: 0, 
      height: 45,
      width: '15%' , 
      backgroundColor: COLORS.appPrimary, 
      padding: 5, 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default AddCommentScreen;
// old screen

// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   Platform,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';

// import {
//   InputField,
//   InputWrapper,
//   SubmitBtn,
//   SubmitBtnText,
//   StatusWrapper,
// } from './CommentsStyle';
// import COLORS from '../../../consts/color'


// const AddCommentScreen = () => {

//   const [uploading, setUploading] = useState(false);
//   const [transferred, setTransferred] = useState(0);
//   const [comment, setComment] = useState(null);

//   const submitComment = async () => {
//     console.log('Comment: ', comment);
//   }


//   return (
//     <View style={styles.container}>
//       <InputWrapper>

//         <InputField
//           placeholder="Write a Public Comment"
//           placeholderTextColor={COLORS.appPrimary}
//           multiline
//           numberOfLines={4}
//           value={comment}
//           style={{ color: COLORS.appPrimary }}
//           onChangeText={(content) => setComment(content)}
//         />
//         {uploading ? (
//           <StatusWrapper>
//             <Text>{transferred} % Completed!</Text>
//             <ActivityIndicator size="large" color={COLORS.appPrimary} />
//           </StatusWrapper>
//         ) : (
//             <SubmitBtn onPress={submitComment}>
//               <SubmitBtnText>Comment</SubmitBtnText>
//             </SubmitBtn>
//           )}
//       </InputWrapper>
//     </View>
//   );
// };

// export default AddCommentScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'black'
//   },
// });
