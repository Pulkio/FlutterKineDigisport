import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const AddPatient = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');

  const ajouterPatient = async () => {
    try {
      const patientData = {
        nom,
        prenom,
      };

      // Ajout du patient à la collection "Patients" dans Firestore
      const docRef = await addDoc(collection(FIRESTORE_DB, 'Patient'), patientData);

      console.log('Patient ajouté avec l\'ID : ', docRef.id);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du patient : ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom :</Text>
      <TextInput
        style={styles.input}
        value={nom}
        onChangeText={(text) => setNom(text)}
        placeholder="Entrez le nom"
      />

      <Text style={styles.label}>Prénom :</Text>
      <TextInput
        style={styles.input}
        value={prenom}
        onChangeText={(text) => setPrenom(text)}
        placeholder="Entrez le prénom"
      />

      <TouchableOpacity style={styles.button} onPress={ajouterPatient}>
        <Text style={styles.buttonText}>Ajouter Patient</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center', // Centre verticalement
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
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

export default AddPatient;
