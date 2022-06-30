import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { FontAwesome } from '@expo/vector-icons';
import i18n from 'i18n-js';

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };
  useEffect(() => {
    toggleModal();
  }, [visible]);
  return (
    <Modal transparent visible={showModal}>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        {children}
      </View>
    </Modal>
  );
};

export default function BarcodScan({ componentOptions, selected, componentData }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scanStyle, setScanStyle] = useState([]);

  useEffect(() => {
    const temporary = [];
    componentOptions?.map(x => temporary.push({ [x.name]: x.key }));
    setScanStyle(temporary);
  }, [componentOptions]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    selected(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
      <ModalPoup style={{ flex: 1, flexDirection: 'row', backgroundColor: 'red' }} visible={visible}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        >
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
            onPress={() => setVisible(false)}
          ><FontAwesome name="times" size={24} color="white" />
          </TouchableOpacity>
        </BarCodeScanner>
        {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
        )}

      </ModalPoup>
      <TouchableOpacity
        style={[{ height: 40,
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginBottom: 10,
          borderRadius: 10 }, ...scanStyle]}
        title="open Barcod"
        onPress={() => setVisible(true)}
      >
        <Text>{i18n.t(componentData?.type)}</Text>
      </TouchableOpacity>
    </View>
  );
}
