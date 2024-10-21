import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Organization from '@components/discover/organization';

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
    await axios.post('https://your-api-url.com/api/volunteer/enlist', shiftData);
    alert('Shift uploaded successfully!'); // Notify on success
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          style={styles.enlistButton}
        >
          <Text style={styles.buttonText}>Enlist Shift</Text>
        </TouchableOpacity>
      </View>

      {showForm && (
        <ScrollView
          style={styles.formContainer}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Text style={styles.formTitle}>Enlist New Shift</Text>

          {/* Form Fields */}
          <TextInput
            placeholder="Organization Name"
            placeholderTextColor="#aaa"
            value={formData.organization}
            onChangeText={(text) =>
              setFormData({ ...formData, organization: text })
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            placeholderTextColor="#aaa"
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Time"
            placeholderTextColor="#aaa"
            value={formData.time}
            onChangeText={(text) => setFormData({ ...formData, time: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Age Requirements"
            placeholderTextColor="#aaa"
            value={formData.ageRequirements}
            onChangeText={(text) =>
              setFormData({ ...formData, ageRequirements: text })
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Location"
            placeholderTextColor="#aaa"
            value={formData.location}
            onChangeText={(text) =>
              setFormData({ ...formData, location: text })
            }
            style={styles.input}
          />

          {/* Category Selection */}
          <Text style={styles.sectionTitle}>Select Category:</Text>
          <View style={styles.categoryContainer}>
            {['Hurricane', 'Storm', 'Other'].map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategorySelect(category)}
                style={[
                  styles.categoryButton,
                  formData.category === category && styles.categoryButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    formData.category === category && styles.categoryButtonTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Submit and Cancel Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleUploadShift} style={styles.uploadButton}>
              <Text style={styles.buttonText}>Upload Shift</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowForm(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Display uploaded shifts using the Organization component */}
      <FlatList
        data={shifts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OpportunityDetails', { shift: item })
            }
            style={styles.organizationContainer} // Added new style for padding
          >
            <Organization
              title={item.organization}
              rating={4.5} // Static rating for now
              category={item.category} // Pass category
            />
          </TouchableOpacity>
        )}
        style={styles.shiftList}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Sleek black background
    padding: 16,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Proper margin for the button
  },
  enlistButton: {
    backgroundColor: '#6C63FF', // Matching purple color
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  formContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderColor: '#3A3A3A',
    borderWidth: 1,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: '#6C63FF',
    borderWidth: 1,
  },
  categoryButtonSelected: {
    backgroundColor: '#6C63FF',
  },
  categoryButtonText: {
    color: '#6C63FF',
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: '#6C63FF', // Purple color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#4A3C89', // Darker purple color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shiftList: {
    flex: 1,
    marginTop: 20,
  },
  organizationContainer: {
    padding: 12, // Added padding to give more space around each item
    marginBottom: 8, // Added margin to separate the items
    borderRadius: 8, // Optional: adds a rounded corner look
  },
});

export default Discover;
