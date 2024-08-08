import * as AppleAuthentication from 'expo-apple-authentication';
import React from 'react';

interface AppleAuthButtonProps {
  onPress: () => Promise<void>;
}

const AppleAuthButton = ({ onPress }: AppleAuthButtonProps) => {
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={
        AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
      }
      cornerRadius={12}
      className="w-full h-11"
      onPress={onPress}
    />
  );
};

export default AppleAuthButton;
