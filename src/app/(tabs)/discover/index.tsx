import Organization from '@components/discover/organization';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Burnt from 'burnt';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// Define the navigation types directly in the file
type RootStackParamList = {
  Discover: undefined;
  OpportunityDetails: { shift: ShiftData };
};

interface ShiftData {
  description: string;
  time: string;
  organization: string;
  ageRequirements: string;
  location: string;
  image: string | null;
  category: string;
}

// Use the navigation prop with defined types
type DiscoverNavigationProp = NavigationProp<RootStackParamList, 'Discover'>;

// Enlist new shift function with a promise return type
const enlistNewShift = async (shiftData: ShiftData): Promise<void> => {
  try {
    await axios.post(
      'https://your-api-url.com/api/volunteer/enlist',
      shiftData
    );

    Burnt.toast({
      title: 'Shift uploaded successfully',
      preset: 'done',
      haptic: 'success',
    });
  } catch (error) {
    console.error('Error uploading shift:', error);
    alert('Failed to upload shift. Please try again.');
  }
};

const Discover = () => {
  const navigation = useNavigation<DiscoverNavigationProp>(); // Use typed navigation

  const [formData, setFormData] = useState<ShiftData>({
    description: '',
    time: '',
    organization: '',
    ageRequirements: '',
    location: '',
    image: null,
    category: 'Hurricane', // Default category
  });

  const [showForm, setShowForm] = useState(false);
  const [shifts, setShifts] = useState<ShiftData[]>([]);
  const modalOpacity = useSharedValue(0);

  const handleUploadShift = async () => {
    await enlistNewShift(formData);
    setShifts([...shifts, formData]); // Add the new shift to the list
    setFormData({
      description: '',
      time: '',
      organization: '',
      ageRequirements: '',
      location: '',
      image: null,
      category: 'Hurricane', // Reset category
    });
    setShowForm(false);
  };

  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category });
  };

  useEffect(() => {
    if (showForm) {
      modalOpacity.value = withTiming(1, { duration: 300 });
    } else {
      modalOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [showForm]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: modalOpacity.value,
    };
  });

  return (
    <SafeAreaView className="flex-1 p-4">
      <View className="items-center justify-center mb-5">
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          className="bg-purple-600 mt-6 py-3 px-6 rounded-full shadow-lg"
        >
          <Text className="text-white text-lg font-bold">Enlist Shift</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={showForm}
        animationType="none"
        onRequestClose={() => setShowForm(false)}
      >
        <BlurView
          style={{ flex: 1 }}
          tint="systemUltraThinMaterialDark"
          intensity={10}
        >
          <Animated.View
            style={[
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              },
              animatedStyle,
            ]}
          >
            <View
              className="bg-neutral-900 rounded-xl p-4 my-3 shadow-lg"
              style={{ maxHeight: '80%', width: '100%' }}
            >
              <Text className="text-2xl font-semibold text-white text-center mb-4">
                Enlist New Shift
              </Text>

              {/* Form Fields */}
              <TextInput
                placeholder="Organization Name"
                placeholderTextColor="#aaa"
                value={formData.organization}
                onChangeText={(text) =>
                  setFormData({ ...formData, organization: text })
                }
                className="bg-gray-800 text-white p-3 rounded-lg mb-2 border border-gray-700"
              />
              <TextInput
                placeholder="Description"
                placeholderTextColor="#aaa"
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
                className="bg-gray-800 text-white p-3 rounded-lg mb-2 border border-gray-700"
              />
              <TextInput
                placeholder="Time"
                placeholderTextColor="#aaa"
                value={formData.time}
                onChangeText={(text) =>
                  setFormData({ ...formData, time: text })
                }
                className="bg-gray-800 text-white p-3 rounded-lg mb-2 border border-gray-700"
              />
              <TextInput
                placeholder="Age Requirements"
                placeholderTextColor="#aaa"
                value={formData.ageRequirements}
                onChangeText={(text) =>
                  setFormData({ ...formData, ageRequirements: text })
                }
                className="bg-gray-800 text-white p-3 rounded-lg mb-2 border border-gray-700"
              />
              <TextInput
                placeholder="Location"
                placeholderTextColor="#aaa"
                value={formData.location}
                onChangeText={(text) =>
                  setFormData({ ...formData, location: text })
                }
                className="bg-gray-800 text-white p-3 rounded-lg mb-2 border border-gray-700"
              />

              {/* Category Selection */}
              <Text className="text-white text-lg font-semibold my-2">
                Select Category:
              </Text>
              <View className="flex-row justify-around mb-4">
                {['Hurricane', 'Storm', 'Other'].map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => handleCategorySelect(category)}
                    className={`py-2 px-4 rounded-full border ${
                      formData.category === category
                        ? 'bg-purple-600 border-purple-600'
                        : 'border-purple-600'
                    }`}
                  >
                    <Text
                      className={`${
                        formData.category === category
                          ? 'text-white'
                          : 'text-purple-600'
                      }`}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Submit and Cancel Buttons */}
              <View className="flex-row justify-between mt-5">
                <TouchableOpacity
                  onPress={handleUploadShift}
                  className="bg-purple-600 py-2 px-4 rounded-full flex-1 mr-2"
                >
                  <Text className="text-white text-lg font-bold text-center">
                    Upload Shift
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setShowForm(false)}
                  className="bg-purple-800 py-2 px-4 rounded-full flex-1 ml-2"
                >
                  <Text className="text-white text-lg font-bold text-center">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </BlurView>
      </Modal>

      {/* Display uploaded shifts using the Organization component */}
      <FlatList
        data={shifts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OpportunityDetails', { shift: item })
            }
            className="p-3 mb-2 rounded-lg"
          >
            <Organization
              title={item.organization}
              rating={4.5} // Static rating for now
              category={item.category} // Pass category
            />
          </TouchableOpacity>
        )}
        className="flex-1 mt-5"
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </SafeAreaView>
  );
};

export default Discover;
