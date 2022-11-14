import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeModal from 'react-native-modal';
import Colors from '../../constants/Colors';
import CircleProfile from '../Utils/CircleProfile';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {getPheedDetail} from '../../api/pheed';
import {PheedDetailParamList} from '../../constants/types';
import ProfilePhoto from '../Utils/ProfilePhoto';

interface Props {
  pheedId: number | null;
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const MapPheedModal = ({pheedId, isModalVisible, setIsModalVisible}: Props) => {
  const gradientColors = [Colors.pink300, Colors.purple300];
  const navigation = useNavigation();
  const [pheed, setPheed] = useState<PheedDetailParamList>();

  useEffect(() => {
    const fetch = async () => {
      const res = await getPheedDetail(pheedId);
      setPheed(res);
      console.log('메롱..');
      console.log(res);
    };
    fetch();
  }, [pheedId]);

  return (
    <ReactNativeModal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}>
      <View style={styles.backdrop}>
        <LinearGradient
          colors={[...gradientColors]}
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 1.0}}
          style={styles.gradientContainer}>
          {pheed && (
            <View style={styles.modal}>
              <View style={styles.container}>
                <View style={styles.profileContainer}>
                  <View style={styles.profileImg}>
                    <ProfilePhoto
                      profileUserId={pheed.userId}
                      imageURI={pheed.userImage_url}
                      grade="hot"
                      size="small"
                      isGradient={true}
                    />
                  </View>
                  <View style={styles.profileInfo}>
                    <Text style={styles.boldtext}>{pheed!.userNickname}</Text>
                    {/* <View style={styles.liveInfo}> */}
                    <View style={styles.dateContainer}>
                      <Icon
                        name="clock"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>{pheed!.startTime}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                      <Icon2
                        name="location-outline"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>{pheed.location}</Text>
                    </View>
                    {/* </View> */}
                  </View>
                </View>
                <Pressable
                  onPress={() => navigation.navigate('DetailPheed', pheed)}>
                  <View style={styles.contentContainer}>
                    <Text style={styles.titleText}>{pheed!.title}</Text>
                    <Text style={styles.contentText}>{pheed!.content}</Text>
                  </View>
                </Pressable>
                <View style={styles.bottomContainer}>
                  <View style={styles.viewerCnt}>
                    <Icon2
                      name="person-outline"
                      color={Colors.gray300}
                      size={20}
                    />
                    <Text style={styles.text}>22</Text>
                  </View>
                  <Pressable onPress={() => navigation.navigate('Chat')}>
                    <Icon2
                      name="chatbubble-ellipses-outline"
                      color={Colors.gray300}
                      size={20}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </LinearGradient>
      </View>
    </ReactNativeModal>
  );
};
const deviceWidth = Dimensions.get('window').width;
// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
  loadingtext: {
    flex: 1,
    top: '50%',
    textAlign: 'center',
    color: Colors.gray300,
  },
  text: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
  },
  boldtext: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
  },
  titleText: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  contentText: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    marginVertical: 5,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    padding: 1,
    borderRadius: 20,
  },
  modal: {
    width: deviceWidth * 0.9,
    borderRadius: 20,
    backgroundColor: Colors.black500,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  contentContainer: {
    width: deviceWidth * 0.85,
    alignItems: 'flex-start',
    margin: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  liveInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileDatetime: {
    flexDirection: 'row',
    left: 5,
  },
  profileImg: {
    marginRight: 5,
  },
  profileInfo: {
    marginLeft: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    marginVertical: 1.5,
  },
  clock: {
    marginRight: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  viewerCnt: {flexDirection: 'row', alignItems: 'center'},
});

export default MapPheedModal;
