import SignatureScreen from 'react-native-signature-canvas';
import React, { useRef, useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, Text, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { AntDesign } from '@expo/vector-icons';
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
    <Modal transparent visible={showModal} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </Modal>
  );
};

const Signature = ({ text, selected, componentData }) => {
  const [visible, setVisible] = useState(false);
  const [signatureImage, setSignatureImage] = useState();
  const ref = useRef();

  const handleOK = signature => {
    const path = `${FileSystem.cacheDirectory}sign.png`;

    FileSystem.writeAsStringAsync(
      path,
      signature.replace('data:image/png;base64,', ''),
      { encoding: FileSystem.EncodingType.Base64 },
    )
      .then(() => FileSystem.getInfoAsync(path))
      .then(value => { selected(value.uri); setSignatureImage(value.uri); })
      .catch(console.error);
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  const handleClear = () => {
    console.log('clear success!');
  };

  const handleEnd = () => {
    ref.current.readSignature();
  };

  return (
    <View style={{ flex: 1 }}>
      <ModalPoup visible={visible}>
        <AntDesign onPress={() => setVisible(false)} name="closecircle" size={30} color="black" style={{ backgroundColor: 'white' }} />
        <SignatureScreen
          style={{ flexDirection: 'row' }}
          ref={ref}
          onEnd={handleEnd}
          onOK={handleOK}
          onEmpty={handleEmpty}
          onClear={handleClear}
          autoClear
          descriptionText={text}
        />
        <View>
          <SignatureScreen ref={ref} />
        </View>
      </ModalPoup>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{ height: 40,
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginBottom: 10,
          borderRadius: 10 }}
      >
        <Text>{i18n.t(componentData?.key)}</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {signatureImage && <Image source={{ uri: signatureImage }} style={{ width: 100, height: 100, backgroundColor: 'white' }} />}
      </View>
    </View>
  );
};

export default Signature;
