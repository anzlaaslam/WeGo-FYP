import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,ScrollView, Modal } from 'react-native';
import { Icon, Overlay, Rating, Avatar, Input } from 'react-native-elements';
import GlobalColors from '../styles/globalColors';
import styles from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import  { useState } from 'react';

const FindRider = () => {
  const navigation=useNavigation();
  // const handleButtonClick = (action) => {
  //   console.log(action + ' Button Clicked');
  // };

  const RideBox = ({ name,org, rating, rides,rideno,from,to, vehicle, fare,index}) => {


    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const [isContainerVisible, setContainerVisible] = useState(true);
    const handleDecline = () => {
      setContainerVisible(false);
    };
  
  
    return (
   <View>
      {isContainerVisible && (
      <TouchableOpacity onPress={()=>navigation.navigate("RiderProfile")}>
      <View >
        <View style={[FindHostRiderstyles.container, FindHostRiderstyles.marginBottom]}>
        <View style={FindHostRiderstyles.header}>
          
        <Avatar 
          rounded
          size='medium'
          source={require('../assets/avatar.jpg')}
          containerStyle={{ marginRight: 7,marginVertical:7 }}
        ></Avatar>
          <View>
            <Text style={FindHostRiderstyles.headerText}>{name}</Text>
            <View style={FindHostRiderstyles.ratingContainer}>
            <Icon name="star" type="font-awesome" size={16} color="gold" />
            <Text style={FindHostRiderstyles.ratingText}>{rating}</Text>
            </View>
        
            {/* <Text style={isUnverified ? { color: 'red', fontStyle: 'italic', ...FindHostRiderstyles.ratingText } : FindHostRiderstyles.ratingText}>Institute: {org}</Text> */}
            <Text style={FindHostRiderstyles.orgText}>Institute: {org}</Text>
            <Text style={FindHostRiderstyles.additionalText}>{rides}</Text>
            <Text style={FindHostRiderstyles.additionalText}>{rideno}</Text>
            <Text style={FindHostRiderstyles.additionalText}>{vehicle}</Text>
            <Text style={FindHostRiderstyles.additionalText}>From: {from}</Text>
            <Text style={FindHostRiderstyles.additionalText}>To: {to}</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('DuringRideScreen')} style={FindHostRiderstyles.acceptButton}>
            <Text style={FindHostRiderstyles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDecline()} style={FindHostRiderstyles.declineButton}>
            <Text style={FindHostRiderstyles.buttonText}>Decline</Text>
          </TouchableOpacity>

          

          <View style={FindHostRiderstyles.topRightTextContainer}>
            <Text style={FindHostRiderstyles.topRightText}>Rs {fare}</Text>
            <TouchableOpacity onPress={toggleModal}>
            <Text style={FindHostRiderstyles.coriderbtn}>CoRiders</Text>
            </TouchableOpacity>


           
             




            <TouchableOpacity>
          <Icon style={FindHostRiderstyles.FRiconButton} name="comment-dots" type="font-awesome-5" size={25} color={GlobalColors.secondary} marginBottom={9} />
          </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
</TouchableOpacity>

)}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
      
        <View style={FindHostRiderstyles.centeredView}>
          <View style={FindHostRiderstyles.modalView}>
            <TouchableOpacity 
              style={{ ...FindHostRiderstyles.closeButton, backgroundColor: '#fff' }}
              onPress={toggleModal}
            >
              <Icon name="times" type="font-awesome-5" size={20} color="grey" />
            </TouchableOpacity>

            
             
                  {/* Coriders Details */}
                
                 

              <View style={FindHostRiderstyles.container}>
              <Text style={FindHostRiderstyles.normalheading}>CoRiders</Text>
              </View>

                {/* 1st corider */}
              <TouchableOpacity onPress={()=>navigation.navigate("Mcorider")}>
              <View style={FindHostRiderstyles.coRiderCard}>
              <Image
                  source={require('../assets/avatar.jpg')}
                  style={{ width: 60, height: 60, borderRadius: 25 }}
                />
                <View style={{ marginLeft: 16 }}>
                  <Text>Malaika Azam</Text>
                  <Text style={{ color: 'gray' }}>Female</Text>
                  <Text>4.3</Text>
                </View>
                

              </View> 
              </TouchableOpacity>


              <View style={FindHostRiderstyles.myRideshorizontalLine}></View>
                    
                    {/* 2nd corider */}
        <TouchableOpacity onPress={()=>navigation.navigate("Scorider")}>
        <View style={FindHostRiderstyles.coRiderCard}>
        <Image
            source={require('../assets/avatar.jpg')}
            style={{ width: 60, height: 60, borderRadius: 25 }}
          />
          <View style={{ marginLeft: 16 }}>
            <Text>Sara Khan</Text>
            <Text style={{ color: 'gray' }}>Female</Text>
            <Text>4.1</Text>
          </View>
          
        </View>
        </TouchableOpacity>
        {/* <View style={FindHostRiderstyles.myRideshorizontalLine}></View> */}

          {/* 3rd corider */}
          {/* <TouchableOpacity>
          <View style={FindHostRiderstyles.coRiderCard}>
        <Image
            source={require('../assets/avatar.jpg')}
            style={{ width: 60, height: 60, borderRadius: 25 }}
          />
          <View style={{ marginLeft: 16 }}>
            <Text>Zayan Faizan</Text>
            <Text style={{ color: 'gray' }}>Male</Text>
            <Text>4.4</Text>
          </View>
          </View>
        </TouchableOpacity> */}

          </View>
        </View>
      </Modal>

</View>

    );
  };

  const FindHostRiderstyles = StyleSheet.create({
    coRiderCard:{
      backgroundColor: GlobalColors.tertiary,
      // borderWidth: 1, 
      // borderColor: 'grey',
      marginBottom:5,
      flexDirection: 'row',
  
      padding: 16, 
    
    },

    container:{  
      //backgroundColor: GlobalColors.secondary,
      // borderWidth: 1, 
      // borderColor: 'grey',
      marginHorizontal:20,
      flexDirection: 'row',
      flex:1, 
      padding: 16, 
    },
    normalheading:{
      fontWeight:'bold',
      fontSize: 16,
    },
  
    // horizontalLine: {
    //   width: '50%', 
    //   borderBottomWidth: 1,
    //   borderBottomColor: 'red', 
    //   marginVertical: 10, 
    // },
    
    outer:{
      marginTop:80,

    },
    marginBottom: {
    
      marginBottom:10,
       // Adjusted margin to reduce the distance
      //  marginTop:10,
    },
    container: {
      // flex: 1,
      backgroundColor: '#ffffff',
      paddingTop:0,
    },
    header: {
      flexDirection: 'row',
      backgroundColor: '#4e7290',
      paddingBottom: 80,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 20,
      // marginTop: 80,
      marginRight: 20,
      marginLeft: 20,
      position: 'relative',
    },
    // icon: {
    //   width: 24,
    //   height: 24,
    //   marginRight: 10,
    //   marginTop: 5,
    // },
  
  
    FRiconButton: {
      padding: 4,
      borderRadius: 100,
      margin:3,
      marginBottom:14,
      backgroundColor:GlobalColors.primary,
          
      elevation: 8,
    },
    
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingImage: {
      width: 24,
      height: 24,
      marginRight: 5,
    },
    ratingText: {
      marginLeft:2,
      fontSize: 13,
      color: '#ffffff',
    },
    additionalText: {
      fontSize: 16,
      color: '#ffffff',
      marginLeft: 10,
    },
    acceptButton: {
      position: 'absolute',
      bottom: 10,
      left: 10,
      // backgroundColor: '#001f3f',
      backgroundColor:GlobalColors.accept,
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 10,
    },
    declineButton: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: GlobalColors.error,
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 10,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonContainer: {
      marginLeft: 30,
      marginTop: 10,
    },
    additionalIcon: {
      width: 44,
      height: 44,
      tintColor: '#ffffff',
    },
    topRightTextContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    topRightText: {
      marginLeft: 0,
      marginBottom:2,
      fontSize:15,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    coriderbtn:{
      marginLeft: 0,
      marginBottom:12,
      padding:6,
      fontSize:15,
      fontWeight: 'bold',
      fontStyle:'italic',
      color: '#fff',
      elevation:9,
      backgroundColor:GlobalColors.primary,
      borderRadius:15,
    },
    orgText: {
      marginLeft:2,
      fontSize: 13,
      color: GlobalColors.buttonbg,
      fontWeight: 'bold',
      fontStyle:'italic',
    },
      


    centeredView: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      flex: 1,
    },
    modalView: {
      marginTop:90,
      margin: 30,
      backgroundColor: '#ffff',
      borderRadius: 20,
      padding: 50,
 
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 20,
      padding: 10,
      borderRadius: 20,
 
    },
 

  });

  return (
    <ScrollView>
    <View style={[FindHostRiderstyles.container, FindHostRiderstyles.outer]}>
      {/* Render the first RideBox */}

      <RideBox
        style={FindHostRiderstyles.cardname} 
        name="Anzla Ali"
        org='FAST-NUCES'
        rating="4.3"
        from='130 B Block Wapda Town'
        to='FAST Lhore'
        fare="200"
        index={1}
      />
    

      {/* Render the second RideBox */}
      <RideBox
        style={FindHostRiderstyles.cardname} name="Muneeb Shah"
        org='Netsol Lahore'
        rating="4.7"
     
        from='200 B Block Wapda Town'
        to='Jalal Sons Faisal Town'
        // preferences=''
      
       
        fare="200"
        index={1}
      />


            {/* Render the second RideBox */}
            <RideBox
        style={FindHostRiderstyles.cardname} name="Wafa Khan"
        org='Punjab School'
        rating="4.7"
     
        from='200 B Block Wapda Town'
        to='Jalal Sons Faisal Town'
      
       
        fare="200"
        index={2}
      />
     
    </View>





</ScrollView>
    
  );
};




export default FindRider;
