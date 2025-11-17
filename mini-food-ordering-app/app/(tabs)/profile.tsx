import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenContainer from '@/src/components/ScreenContainer';
import AppText from '@/src/components/AppText';
import AppButton from '@/src/components/AppButton';
import Card from '@/src/components/Card';
import OrderHistory from '@/src/components/OrderHistory';

export default function ProfileScreen() {
  const [userName, setUserName] = useState('Saurav');
  const [userEmail, setUserEmail] = useState('Saurav@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('+91 9172027838');

  return (
    <ScreenContainer style={styles.container}>
      <AppText variant="heading" style={styles.title}>Profile</AppText>
      
      <Card padding={16} style={styles.card} onPress={null}>
        <AppText variant="subheading" style={styles.sectionTitle}>Personal Information</AppText>
        
        <View style={styles.infoRow}>
          <AppText style={styles.label}>Name:</AppText>
          <AppText style={styles.value}>{userName}</AppText>
        </View>
        
        <View style={styles.infoRow}>
          <AppText style={styles.label}>Email:</AppText>
          <AppText style={styles.value}>{userEmail}</AppText>
        </View>
        
        <View style={styles.infoRow}>
          <AppText style={styles.label}>Phone:</AppText>
          <AppText style={styles.value}>{phoneNumber}</AppText>
        </View>
        
        <View style={styles.buttonContainer}>
          <AppButton 
            text="Edit Profile" 
            variant="outlined" 
            onPress={() => console.log('Edit Profile pressed')}
          />
        </View>
      </Card>

      <View style={styles.sectionContainer}>
        <AppText variant="subheading" style={styles.sectionTitle}>Order History</AppText>
        <OrderHistory />
      </View>

      <Card padding={16} style={styles.card} onPress={null}>
        <AppText variant="subheading" style={styles.sectionTitle}>Settings</AppText>
        <View style={styles.buttonContainer}>
          <AppButton 
            text="Notification Preferences" 
            variant="outlined" 
            onPress={() => console.log('Notification Preferences pressed')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton 
            text="Payment Methods" 
            variant="outlined" 
            onPress={() => console.log('Payment Methods pressed')}
          />
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
    marginHorizontal: 16, // Add horizontal margin to align with other sections
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 8,
  },
});