import { ComponentProps, PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';

const PageView = ({
  children,
  ...props
}: PropsWithChildren<ComponentProps<typeof ScrollView>>) => {
  return (
    <ScrollView
      {...props}
      contentInset={{ bottom: 90 }}
      contentInsetAdjustmentBehavior="automatic"
    >
      {children}
    </ScrollView>
  );
};

export default PageView;
