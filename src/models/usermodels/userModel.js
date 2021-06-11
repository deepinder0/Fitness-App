import firestore from '@react-native-firebase/firestore';

// const snapshot = firestore().collection('Users').doc('ABC');
class UserModel { 

    state = {
        uid:'',
        name: '',
        age: '', 
        gender: '',
        height: '',
        weight: '',
        email: '',
        qualification: '',
        certification: '',
        experiance: '',
        profileImage: '',
        address: ''  
    }

    // documentSnapshot = firestore().collection('Trainers').doc('ABC');
    constructor(doc) {
        this.state.uid = doc.get('uid');
        this.state.name = doc.get('name');
        this.state.age = doc.get('age');
        this.state.gender = doc.get('gender');
        this.state.height = doc.get('height');
        this.state.weight = doc.get('weight');
        this.state.email = doc.get('email');
        this.state.profileImage = doc.get('profileImage');
        this.state.address = doc.get('address');
    }

    static fromSnapshot(doc){
        return new UserModel(doc)
    }
}

export default UserModel;