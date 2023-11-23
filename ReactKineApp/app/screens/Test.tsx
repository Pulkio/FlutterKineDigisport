import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import { getDocs, collection } from 'firebase/firestore';

const TestComponent = () => {
    const [selectedTest, setSelectedTest] = useState('');
    const [selectedPatient, setSelectedPatient] = useState('');
    const [patients, setPatients] = useState<{ value: string; label: string }[]>([]);
  
    useEffect(() => {
      const fetchPatientsFromDatabase = async () => {
        try {
          const snapshot = await getDocs(collection(FIRESTORE_DB, 'Patient'));
          const patientList = snapshot.docs.map((doc) => {
            const { nom, prenom } = doc.data();
            return {
              value: `${prenom} ${nom}`,
              label: `${prenom} ${nom}`,
            };
          });
          setPatients(patientList);
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      };
  
      fetchPatientsFromDatabase();
    }, []);
  
    const handleStartTest = () => {
      console.log('Starting test:', selectedTest, 'for patient:', selectedPatient);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Sélectionnez le test :</Text>
        <Picker
          selectedValue={selectedTest}
          onValueChange={(itemValue) => setSelectedTest(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Test1" value="Test1" />
          <Picker.Item label="Test2" value="Test2" />
          <Picker.Item label="Test3" value="Test3" />
          <Picker.Item label="Test4" value="Test4" />
        </Picker>
  
        <Text style={styles.label}>Sélectionnez le patient :</Text>
        <Picker
          selectedValue={selectedPatient}
          onValueChange={(itemValue) => setSelectedPatient(itemValue)}
          style={styles.picker}
        >
          {patients.map((patient, index) => (
            <Picker.Item key={index.toString()} label={patient.label} value={patient.value} />
          ))}
        </Picker>
  
        <TouchableOpacity style={styles.button} onPress={handleStartTest}>
          <Text style={styles.buttonText}>Commencer le Test</Text>
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center', // Center vertically
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TestComponent;