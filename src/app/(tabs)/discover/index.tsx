import { useState } from 'react';
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
import organization from '@components/discover/organization';
import Organization from '@components/discover/organization';

// Define the ShiftData type
interface ShiftData {
  description: string;
  time: string;
  organization: string;
  ageRequirements: string;
  location: string;
  image: string | null;
}

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
  const [formData, setFormData] = useState<ShiftData>({
    description: '',
    time: '',
    organization: '',
    ageRequirements: '',
    location: '',
    image: null,
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
    });
    setShowForm(false);
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
          <Organization
            title={item.organization}
            rating={4.5} // Static rating for now, you can change this as needed
          />
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
});

export default Discover;
