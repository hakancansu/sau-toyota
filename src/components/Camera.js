import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import i18n from 'i18n-js';
import { CameraContext } from '../context/CameraSettingsContext';

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

      <View style={{ flex: 1 }}>{children}</View>

    </Modal>
  );
};

const CameraComponent = ({ componentData, selected, componentOptions }) => {
  const { quality } = useContext(CameraContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [visible, setVisible] = useState(false);
  const [cameraStyle, setCameraStyle] = useState([]);
  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off);
  useEffect(() => {
    const temporary = [];
    componentOptions?.map(x => temporary.push({ [x.name]: x.key }));
    setCameraStyle(temporary);
  }, [componentOptions]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  const takepicture = async () => {
    if (camera) {
      const options = {
        quality,
        base64: true,
        exif: false,
      };

      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
      selected(data.uri);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      selected(result.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const savePhoto = () => {
    MediaLibrary.saveToLibraryAsync(image).then(() => {
      setImage(undefined);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ModalPoup visible={visible}>
        <View style={{ alignItems: 'center' }} />
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Camera style={{ flex: 1 }} type={type} ref={ref => setCamera(ref)} flashMode={cameraFlash}>
            <AntDesign onPress={() => setVisible(false)} name="closecircle" size={24} color="white" style={{ marginBottom: 8 }} />
            <MaterialIcons
              name="flip-camera-android"
              size={24}
              color="white"
              style={{ marginBottom: 8 }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                );
              }}
            />
            <Feather
              name="zap"
              size={24}
              color="white"
              onPress={() =>
                setCameraFlash(
                  cameraFlash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.torch
                    : Camera.Constants.FlashMode.off,
                )
          }
            />
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' }}>
              {hasMediaLibraryPermission ? (
                <AntDesign name="save" size={24} color="white" onPress={() => savePhoto()} />
              ) : undefined}
              <Feather name="play-circle" size={50} color="white" onPress={() => takepicture()} />
              <AntDesign name="select1" size={24} color="white" onPress={() => pickImage()} />
            </View>
          </Camera>
        </View>
        {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      </ModalPoup>
      <TouchableOpacity onPress={() => setVisible(true)} style={[{ height: 40, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, marginBottom: 10, borderRadius: 10 }, ...cameraStyle]}>
        <Text style={{ color: 'black' }}>{i18n.t(componentData?.key)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraComponent;
