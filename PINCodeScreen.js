import React, { useEffect, useRef, useState } from "react"
import { ImageBackground, SafeAreaView, View, StatusBar, Text, Alert, TouchableOpacity} from "react-native"
import ReactNativePinView from 'react-native-pin-view';
import Icon from "react-native-vector-icons/Ionicons"
import * as keyStore from '/lib/secure-key-store';


// PIN 입력받아 keychain에 저장한 번호와 일치하는지 확인 
const PINCodeScreen = (props) => {
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [enteredPin, setEnteredPin] = useState("")
    const [pin, setPin] = useState("")

    keyStore.getItem('pincode').then((pinNumber) => {
        if (pinNumber) {
          setPin(pinNumber);
        }
    });

    useEffect(() => {
      console.log('pinnn :: ', pin)
      if (enteredPin.length > 0) {
          setShowRemoveButton(true)
      } else {
          setShowRemoveButton(false)
      }

      if (enteredPin.length === 6) {
        if(enteredPin === pin){
          Alert.alert('일치', '', [{text: '확인', onPress: () => {
              props.navigation.goBack();
              }
            }]
          );
        }else{
          Alert.alert('PIN 번호가 일치하지 않습니다.', '', [{text: '확인', onPress: () => {
              pinView.current.clearAll();
              }
            }]
          );
        }
      }
  }, [enteredPin])
  return (
    <>
      <StatusBar barStyle="light-content" />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              paddingTop: 24,
              paddingBottom: 48,
              color: "rgba(255,255,255,0.7)",
              fontSize: 48,
            }}>
            PIN 확인
          </Text>
          <ReactNativePinView
            inputSize={32}
            ref={pinView}
            pinLength={6}
            buttonSize={60}
            onValueChange={value => setEnteredPin(value)}
            buttonAreaStyle={{
              marginTop: 24,
            }}
            inputAreaStyle={{
              marginBottom: 24,
            }}
            inputViewEmptyStyle={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "#FFF",
            }}
            inputViewFilledStyle={{
              backgroundColor: "#FFF",
            }}
            buttonViewStyle={{
              borderWidth: 1,
              borderColor: "#FFF",
            }}
            buttonTextStyle={{
              color: "#FFF",
            }}
            onButtonPress={key => {
              if (key === "custom_left") {
                pinView.current.clear()
              }
              if (key === "custom_right") {
                props.navigation.goBack();
              }
            }}
            customLeftButton={showRemoveButton ? <Icon name={"arrow-back-outline"} size={36} color={"#FFF"} /> : undefined}
            customRightButton={<Icon name={"arrow-forward-outline"} size={36} color={"#FFF"} />}
          />
        </SafeAreaView>
    </>
  )
}

export default PINCodeScreen;