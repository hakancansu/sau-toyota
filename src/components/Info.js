import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

const ModalPoup = ({ visiple, children }) => {
  const [showModal, setShowModal] = useState(visiple);
  const toggleModal = () => {
    if (visiple) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };
  useEffect(() => {
    toggleModal();
  }, [visiple]);
  return (
    <Modal transparent visible={showModal} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </Modal>
  );
};

const Info = ({ value }) => {
  const [visiple, setVisiple] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <ModalPoup visiple={visiple} style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <AntDesign name="closecircle" size={24} color="black" onPress={() => setVisiple(false)} />
          <View style={{ backgroundColor: '#E6E6FA', flexDirection: 'row', justifyContent: 'center' }}>
            <Text>{value}</Text>
          </View>
        </View>
      </ModalPoup>
      <TouchableOpacity onPress={() => setVisiple(true)}>
        <Feather name="info" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};
export default Info;
