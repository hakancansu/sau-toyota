import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
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
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </Modal>
  );
};

const VideoComponent = ({ componentData, selected, componentOptions }) => {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [camera, setCamera] = useState(null);
  const [record, setRecord] = useState(null);
  const [type, setType] = useState(Camera.back);
  const video = useRef(null);
  const [status, setStatus] = useState(null);
  const [visible, setVisible] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [videoStyle, setVideoStyle] = useState([]);
  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off);

  useEffect(() => {
    const temporary = [];
    componentOptions?.map(x => temporary.push({ [x.name]: x.key }));
    setVideoStyle(temporary);
  }, [componentOptions]);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);
  const takeVideo = async () => {
    if (camera) {
      const data = await camera.recordAsync({
        maxDuration: 10,
      });
      setRecord(data.uri);
      selected(data.uri);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setRecord(result.uri);
      selected(result.uri);
    }
  };

  const savePhoto = () => {
    MediaLibrary.saveToLibraryAsync(record).then(() => {
      setRecord(undefined);
    });
  };

  const stopVideo = async () => {
    camera.stopRecording();
  };
  if (hasCameraPermission === null || hasAudioPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <ModalPoup visible={visible}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Camera
            ref={ref => setCamera(ref)}
            style={{ flex: 1 }}
            type={type}
            flashMode={cameraFlash}
          >
            <AntDesign
              onPress={() => setVisible(false)}
              name="closecircle"
              size={30}
              color="white"
              style={{ marginBottom: 8 }}
            />
            <TouchableOpacity
              style={{ backgroundColor: 'button', color: 'white', marginBottom: 8 }}
              onPress={() =>
                setCameraFlash(
                  cameraFlash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.torch
                    : Camera.Constants.FlashMode.off,
                )
          }
            >
              <Feather name="zap" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'button', color: 'white' }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                );
              }}
            >
              <MaterialIcons name="flip-camera-android" size={24} color="white" />
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' }}>
              {hasMediaLibraryPermission ? (
                <AntDesign name="save" size={24} color="white" onPress={() => savePhoto()} />
              ) : undefined}
              {
          openVideo ? (
            <Feather
              name="play-circle"
              size={50}
              color="white"
              onPress={() => { takeVideo(); setOpenVideo(false); }}
            />
          ) : (
            <Feather
              name="pause-circle"
              size={50}
              color="white"
              onPress={() => { stopVideo(); setOpenVideo(true); }}
            />
          )
        }
              <AntDesign name="select1" size={24} color="white" onPress={() => pickImage()} />
            </View>
          </Camera>
        </View>

        {record && (
          <View style={{ flex: 1 }}>
            <Video
              ref={video}
              source={{ uri: record }}
              useNativeControls
              resizeMode="stretch"
              isLooping
              onPlaybackStatusUpdate={status => setStatus(() => status)}
              style={{ flex: 1, width: '100%' }}
            />
          </View>
        )}
      </ModalPoup>
      <TouchableOpacity
        onPress={() => { setVisible(true); setOpenVideo(true); }}
        style={[{ height: 40,
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginBottom: 10,
          borderRadius: 10 }, ...videoStyle]}
      >
        <Text style={{ color: 'black' }}>{i18n.t(componentData?.key)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoComponent;
