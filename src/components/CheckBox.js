import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import i18n from 'i18n-js';

const CheckBoxx = ({ componentData, onPress, data }) => {
  const [localData, setlocalData] = useState(data || []);

  const handleData = value => {
    const index = localData.findIndex(x => x === value);
    if (index > -1) {
      const tempData = [...localData];
      tempData.splice(index, 1);
      setlocalData(tempData);
    } else {
      const tempData = [...localData];
      tempData.push(value);
      setlocalData(tempData);
    }
  };

  useEffect(() => {
    if (localData.length !== 0 && localData !== data) {
      onPress(localData);
    }
  }, [localData]);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {componentData?.map(e => (
        <TouchableOpacity
          key={e.key}
          onPress={() => { handleData(e.key); }}
          style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
        >
          {localData.find(x => x === e.key) ? <AntDesign name="checksquareo" size={24} color="black" /> :
          <Feather name="square" size={24} color="black" />}
          <Text>{i18n.t(e?.key)}</Text>
        </TouchableOpacity>
      ))}

    </View>
  );
};
export default CheckBoxx;
