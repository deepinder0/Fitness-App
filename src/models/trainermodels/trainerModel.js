import firestore from '@react-native-firebase/firestore';

class TrainerModel { 
    documentSnapshot = firestore().collection('Trainers').docReference('ABC');

    state = {
        tid:'',
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
    constructor() {
        
    }

    static setToSnapshot(docReference){
        this.state.tid = docReference.set('tid');
        this.state.name = docReference.set('name');
        this.state.age = docReference.set('age');
        this.state.gender = docReference.set('gender');
        this.state.height = docReference.set('height');
        this.state.weight = docReference.set('weight');
        this.state.email = docReference.set('email');
        this.state.qualification = docReference.set('qualification');
        this.state.certification = docReference.set('certification');
        this.state.experiance = docReference.set('experiance');
        this.state.profileImage = docReference.set('profileImage');
        this.state.address = docReference.set('address');
        return new TrainerModel();
    }
    static getFromSnapshot(docReference){
        this.state.tid = docReference.get('tid');
        this.state.name = docReference.get('name');
        this.state.age = docReference.get('age');
        this.state.gender = docReference.get('gender');
        this.state.height = docReference.get('height');
        this.state.weight = docReference.get('weight');
        this.state.email = docReference.get('email');
        this.state.qualification = docReference.get('qualification');
        this.state.certification = docReference.get('certification');
        this.state.experiance = docReference.get('experiance');
        this.state.profileImage = docReference.get('profileImage');
        this.state.address = docReference.get('address');
        return new TrainerModel();
    }

    static updateUserField(docReference){
        this.state = docReference.update({
            tid: '',
        })
    };
}

export default TrainerModel;

const trainer1 = new TrainerModel.getfromSnapshot();