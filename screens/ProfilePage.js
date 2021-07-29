import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

import port from "../integrate/portAPI.js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../redux/actions.js";

// import {
//   CirclesLoader,
//   PulseLoader,
//   TextLoader,
//   DotsLoader,
// } from "react-native-indicator";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [job, setJob] = useState();
  const [phone, setPhone] = useState();

  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const userAPI = await axios.get(
        `${port.ip_minh}/api/users/leminh@gmail.com`
      );
      dispatch(action.setUser(userAPI.data.user));
      setPhone(userAPI.data.user.phone);
      setName(userAPI.data.user.name);
      setJob(userAPI.data.user.job);
      setAge(userAPI.data.user.age.toString());
    }
    fetchData();
  }, []);

  const changeInfo = async () => {
    console.log(user);
    if (isChange) {
      const change = await axios.post(`${port.ip_minh}/api/users/change-info`, {
        id: user.id,
        name: name,
        phone: parseInt(phone),
        job: job,
        age: parseInt(age),
      });
      dispatch(
        action.updateUser({
          name: name,
          age: parseInt(age),
          job: job,
          phone: phone,
        })
      );
    }
    setIsChange(!isChange);
  };

  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: "25%" }}
          >
            <Block flex style={styles.profileCard}>
              <Block middle style={styles.avatarContainer}>
                <Image
                  source={{ uri: Images.ProfilePicture }}
                  style={styles.avatar}
                />
              </Block>
              <Block style={styles.info}>
                <Block
                  middle
                  row
                  space="evenly"
                  style={{ marginTop: 20, paddingBottom: 24 }}
                >
                  <Button
                    // onPress={() => }
                    flex
                    small
                    style={{
                      padding: 10,
                      width: "auto",
                      backgroundColor: argonTheme.COLORS.INFO,
                    }}
                  >
                    CHANGE AVATAR
                  </Button>
                  <Button
                    onPress={changeInfo}
                    small
                    style={{
                      padding: 10,
                      width: "auto",
                      backgroundColor: argonTheme.COLORS.DEFAULT,
                    }}
                  >
                    <Text
                      flex
                      row
                      style={{
                        color: "#fff",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {!isChange ? "CHANGE INFORMATION" : "SAVE"}
                      {isChange ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        ""
                      )}
                    </Text>
                  </Button>
                </Block>
                <Block row space="between">
                  <Block middle>
                    <Text
                      bold
                      size={18}
                      color="#525F7F"
                      style={{ marginBottom: 4 }}
                    >
                      2K
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>
                      REVIEWS
                    </Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color="#525F7F"
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      10
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>
                      PHOTOS
                    </Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color="#525F7F"
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      89
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>
                      LIKES
                    </Text>
                  </Block>
                </Block>
              </Block>
              <Block flex>
                <Block middle style={styles.nameInfo}>
                  <Block
                    row
                    flex
                    style={{ alignItems: "center", marginTop: 10 }}
                  >
                    <TextInput
                      value={name}
                      style={{
                        color: "#32325D",
                        width: "auto",
                        borderColor: isChange ? "#999" : "#fff",
                        borderWidth: 1,
                        borderRadius: 4,
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                        fontSize: 30,
                        fontWeight: "bold",
                      }}
                      maxLength={30}
                      editable={isChange ? true : false}
                      onChangeText={(val) => {
                        setName(val);
                      }}
                      autoCapitalize="none"
                    />
                    <Text
                      style={{
                        color: "#32325D",
                        fontSize: 30,
                        fontWeight: "bold",
                      }}
                    >
                      ,
                    </Text>
                    <TextInput
                      value={age}
                      style={{
                        color: "#32325D",
                        width: "auto",
                        borderColor: isChange ? "#999" : "#fff",
                        borderWidth: 1,
                        borderRadius: 4,
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                        fontSize: 30,
                        fontWeight: "bold",
                      }}
                      maxLength={2}
                      editable={isChange ? true : false}
                      onChangeText={(val) => {
                        setAge(val);
                      }}
                      autoCapitalize="none"
                    />
                  </Block>
                  <Block
                    row
                    flex
                    style={{ alignItems: "center", marginTop: 10 }}
                  >
                    <Text row size={18} color="#32325D">
                      My phone number :
                    </Text>
                    <TextInput
                      value={phone}
                      style={{
                        color: "#32325D",
                        width: "auto",
                        borderColor: isChange ? "#999" : "#fff",
                        borderWidth: 1,
                        borderRadius: 4,
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                        fontSize: 18,
                      }}
                      maxLength={16}
                      editable={isChange ? true : false}
                      onChangeText={(val) => {
                        setPhone(val);
                      }}
                      autoCapitalize="none"
                    />
                  </Block>
                </Block>
                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block middle>
                  <Text
                    size={16}
                    color="#525F7F"
                    style={{ textAlign: "center" }}
                  >
                    Information :
                  </Text>
                  <TextInput
                    value={job}
                    style={{
                      color: "#32325D",
                      width: "auto",
                      borderColor: isChange ? "#999" : "#fff",
                      borderWidth: 1,
                      borderRadius: 4,
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                      fontSize: 18,
                    }}
                    maxLength={48}
                    editable={isChange ? true : false}
                    onChangeText={(val) => {
                      setJob(val);
                    }}
                    autoCapitalize="none"
                  />
                  <Button
                    style={{
                      color: "#233DD2",
                      fontWeight: "500",
                      fontSize: 20,
                    }}
                  >
                    SHOW MORE
                  </Button>
                </Block>
                <Block row space="between">
                  <Text
                    bold
                    size={16}
                    color="#525F7F"
                    style={{ marginTop: 12 }}
                  >
                    Album
                  </Text>
                  <Button
                    small
                    style={{
                      color: "#5E72E4",
                      fontSize: 12,
                      marginLeft: 24,
                    }}
                  >
                    View all
                  </Button>
                </Block>
                <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                  <Block row space="between" style={{ flexWrap: "wrap" }}>
                    {Images.Viewed.map((img, imgIndex) => (
                      <Image
                        source={{ uri: img }}
                        key={`viewed-${img}`}
                        resizeMode="cover"
                        style={styles.thumb}
                      />
                    ))}
                  </Block>
                </Block>
              </Block>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
});

export default ProfilePage;
