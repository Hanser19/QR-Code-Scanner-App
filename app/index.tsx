import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Platform } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useCameraPermissions } from 'expo-camera';
import { QrCode, Camera } from 'lucide-react-native';

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  // Monitor changes in permissions
  useEffect(() => {
    setIsPermissionGranted(Boolean(permission?.granted));
  }, [permission]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "QR Scanner", headerShown: false }} />
      
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <QrCode size={64} color="#0E7AFE" />
          <Text style={styles.title}>QR Code Scanner</Text>
        </View>

        <View style={styles.buttonContainer}>
          {!isPermissionGranted ? (
            <Pressable 
              style={styles.primaryButton} 
              onPress={requestPermission}
            >
              <Camera size={24} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Request Camera Access</Text>
            </Pressable>
          ) : (
            <Link href={"/scanner"} asChild>
              <Pressable style={styles.primaryButton}>
                <QrCode size={24} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Scan QR Code</Text>
              </Pressable>
            </Link>
          )}

          {!isPermissionGranted && (
            <Text style={styles.subtitleText}>
              Camera access is required to scan QR codes
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: 30 }
    }),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    color: '#333',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 15,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#0E7AFE',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#0E7AFE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
  subtitleText: {
    color: '#666',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
  },
});