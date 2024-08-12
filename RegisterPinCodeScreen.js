import React, { useEffect, useRef, useState } from "react"
import { ImageBackground, SafeAreaView, StatusBar, Text, Alert, TouchableOpacity } from "react-native"
import ReactNativePinView from 'react-native-pin-view';
import Icon from "react-native-vector-icons/Ionicons"
import * as keyStore from '/lib/secure-key-store';

const RegisterPinCodeScreen = (props) => {
  const pinView = useRef(null)
  const [showRemoveButton, setShowRemoveButton] = useState(false)
  const [showCompletedButton, setShowCompletedButton] = useState(false)
  const [enteredPin, setEnteredPin] = useState("")
  const [step1Pin, setStep1Pin] = useState("")
  const [step, setStep] = useState('1');

  useEffect(() => {
    if (enteredPin.length > 0) {
      setShowRemoveButton(true)
    } else {
      setShowRemoveButton(false)
    }
    if (enteredPin.length === 6) {
      setShowCompletedButton(true)
    } else {
      setShowCompletedButton(false)
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
            {step === '1' ? 'PIN 등록' : 'PIN 확인'}
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
                if(step === '1'){
                  setStep('2');
                  setStep1Pin(enteredPin);
                  setEnteredPin('');
                  pinView.current.clearAll();
                }else{
                  if(step1Pin === enteredPin){
                    Alert.alert('일치', '', [{text: '확인', onPress: () => {
                        keyStore.setItem('pincode', enteredPin);
                        props.navigation.goBack();
                        }
                      }]
                    );
                  }else{
                    Alert.alert('불일치');
                  }
                }
              }
            }}
            customLeftButton={showRemoveButton ? <Icon name={"arrow-back-outline"} size={36} color={"#FFF"} /> : undefined}
            customRightButton={showCompletedButton ? <Icon name={"arrow-forward-outline"} size={36} color={"#FFF"} /> : undefined}
          />
        </SafeAreaView>
    </>
  )
}

export default RegisterPinCodeScreen;