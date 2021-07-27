import React from 'react';
import {
    Text, 
    TextInput,
    StyleSheet, 
    View,
    Platform,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Image,
    Touchable
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const { width, height } = Dimensions.get("screen");

import { Block, Checkbox, theme } from "galio-framework";
import { Icon, Input, Button } from "../components";
import { argonTheme, Images } from "../constants";

function Login() {
    const [data, setData] =  React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true
    });
    const textInputChange = (val) => {
        if(val.length !== 0){
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            })
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            })
        }
    }
    const passInputChange = (val) => {
        setData({
            ...data,
            password: val
        })
    }
    const showPass = () => {
        setData({
            ...data,
            secureTextEntry : !data.secureTextEntry
        })
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={Images.RegisterBackground}
                style={{ width, height, zIndex: 0, alignItems: 'center', paddingBottom: 20 }}
            >
            <View style={styles.header}>
                <Text style={styles.text_header}>Wellcome</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                    : null}
                </View>

                <Text style={[styles.text_footer, {
                    marginTop: 35 
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        secureTextEntry={data.secureTextEntry}
                        placeholder="Your Password"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => passInputChange(val)}
                    />
                    <TouchableOpacity
                        onPress={showPass}
                        >
                        {data.secureTextEntry ?
                        <Feather 
                            name="eye-off"
                            color="green"
                            size={20}
                        />
                        :
                        <Feather 
                            name="eye"
                            color="green"
                            size={20}
                        />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            backgroundColor: '#5E72E4'
                        }]}
                    >
                        <Text style={{
                            color: '#fff'
                        }}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: '#5E72E4',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                        >
                        <Text style={styles.textSign, {
                            color: '#5E72E4'
                        }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <Block flex={1} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Sign up with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                    <Block row>
                      <Icon
                        name="logo-github"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GITHUB</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
            </View>
            </ImageBackground>
        </View>
        
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5E72E4',
        alignItems: 'center'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    footer: {
        flex: 10, 
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: width * 0.9,
        height: height * 0.875,
        

    },
    text_header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 14
    },
    
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a'
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },

    socialConnect: {
        backgroundColor: argonTheme.COLORS.WHITE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#8898AA"
      },
      socialButtons: {
        width: 120,
        height: 40,
        backgroundColor: "#fff",
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1
      },
      socialTextButtons: {
        color: argonTheme.COLORS.PRIMARY,
        fontWeight: "800",
        fontSize: 14
      },
      inputIcons: {
        marginRight: 12
      },
})
export default Login;