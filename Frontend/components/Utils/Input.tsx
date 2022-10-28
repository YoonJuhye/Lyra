import React, {useState, Dispatch, SetStateAction} from 'react';
import {StyleSheet, TextInput, Dimensions} from 'react-native';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';

//너비, 높이, 키보드타입(1이면 ascii[기본키패드], 2면 numberpad), borderRadius
type InputProps = {
  width: number;
  height: number;
  keyboard: number;
  borderRadius: number;
  placeholder?: string;
  customStyle?: any;
  maxLength?: number;
  enteredValue?: string;
  setEnteredValue?: Dispatch<SetStateAction<string>>;
};

const Input: React.FC<InputProps> = ({
  width,
  height,
  keyboard,
  borderRadius,
  placeholder,
  customStyle,
  maxLength,
  enteredValue,
  setEnteredValue,
}) => {
  const styles = StyleSheet.create({
    input: {
      width: width * Dimensions.get('window').width - 2,
      height: height * Dimensions.get('window').height - 2,
      borderRadius: borderRadius,
      backgroundColor: Colors.black500,
      color: Colors.gray300,
      alignSelf: 'center',
      justifyContent: 'center',
      fontFamily: 'NanumSquareRoundR',
    },
    gradient: {
      width: width * Dimensions.get('window').width,
      height: height * Dimensions.get('window').height,
      borderRadius: borderRadius,
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });

  // const [value, setValue] = useState<string>('');

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        useAngle={true}
        angle={135}
        angleCenter={{x: 0.5, y: 0.5}}
        colors={[Colors.purple300, Colors.pink500]}
        style={[styles.gradient, customStyle]}>
        {setEnteredValue && (
          <TextInput
            style={{...styles.input}}
            multiline={true}
            blurOnSubmit
            autoCorrect={false}
            keyboardType={keyboard === 1 ? 'ascii-capable' : 'numeric'}
            placeholder={placeholder}
            placeholderTextColor={Colors.gray300}
            maxLength={maxLength}
            value={enteredValue}
            onChangeText={setEnteredValue}
          />
        )}
        {!setEnteredValue && (
          <TextInput
            style={{...styles.input}}
            multiline={true}
            blurOnSubmit
            autoCorrect={false}
            keyboardType={keyboard === 1 ? 'ascii-capable' : 'numeric'}
            placeholder={placeholder}
            placeholderTextColor={Colors.gray300}
            maxLength={maxLength}
            value={enteredValue}
          />
        )}
      </LinearGradient>
    </>
  );
};

export default Input;
