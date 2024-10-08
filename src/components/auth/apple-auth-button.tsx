import * as AppleAuthentication from 'expo-apple-authentication';

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
      className="h-12 w-full"
      onPress={onPress}
    />
  );
};

export default AppleAuthButton;
