import { Link, router } from 'expo-router';
import { View } from 'react-native';

export default function Modal() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();

  return (
    <View className="flex-1 items-center justify-center bg-neutral-900">
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
    </View>
  );
}
