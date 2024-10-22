import { palette } from '@lib/tailwind';
import React from 'react';
import { TextInput, TextInputProps, ViewStyle } from 'react-native';

interface FormFieldProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: ViewStyle;
}

const FormField: React.FC<FormFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  ...rest
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      value={value}
      onChangeText={onChangeText}
      style={[
        {
          backgroundColor: palette['neutral']['900'],
          color: '#fff',
          padding: 12,
          borderRadius: 8,
          marginBottom: 8,
          borderWidth: 1,
          borderColor: palette['neutral']['800'],
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default FormField;
