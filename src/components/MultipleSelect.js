import DropDownPicker from 'react-native-dropdown-picker';
import React, { useEffect, useState } from 'react';

export default function MultipleSelect({ onSelectItem, style, componentData, value }) {
  const [localData, setlocalData] = useState(value || []);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localData.length !== 0 && localData !== value) {
      onSelectItem(localData);
    }
  }, [localData]);

  return (
    <DropDownPicker
      multiple
      style={[
        {
          height: 40,
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          paddingHorizontal: 10,
          marginBottom: 10,
          borderRadius: 10,
          flex: 1,
          borderWidth: 0,
        },
        style,
      ]}
      mode="BADGE"
      listMode="MODAL"
      open={open}
      value={localData}
      items={componentData}
      setOpen={setOpen}
      setValue={setlocalData}
    />
  );
}
