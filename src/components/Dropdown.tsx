import React, {useEffect, useRef, useState} from 'react';
import {Dropdown as ReactNativeElementDropdown} from 'react-native-element-dropdown';
import {
  ImageStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export interface DropdownItem {
  label: string;
  value: string;
}

interface Props {
  items: DropdownItem[];
  value?: string;
  onChange: (item: DropdownItem) => void;
  placeholder?: string;
  label?: string;
  style?: ViewStyle;
  isAlwaysSelected?: boolean;
}

export const Dropdown = ({
  items,
  value,
  onChange,
  style,
  placeholder,
}: Props): React.ReactElement => {
  const $dropdownStyle = {...$dropdown, ...style};
  const dropdownRef = useRef<any>();
  const renderItem = (item: DropdownItem) => {
    const index = items.findIndex(i => i.label === item.label);
    const $cutomizedStyle: ViewStyle[] = [
      $item,
      index !== items.length - 1 && $seperator,
    ];
    return (
      <TouchableOpacity
        style={$cutomizedStyle}
        accessibilityLabel={item.label}
        onPress={() => onChangeItem(item)}>
        <Text
          style={{
            ...$itemText,
            color: 'black',
          }}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const onChangeItem = (item: DropdownItem) => {
    dropdownRef.current?.close();
    onChange(item);
  };

  return (
    <>
      <ReactNativeElementDropdown
        placeholder={placeholder}
        style={$dropdownStyle}
        renderItem={renderItem}
        iconStyle={$iconStyle}
        data={items}
        labelField="label"
        valueField="value"
        value={value}
        onChange={onChangeItem}
        statusBarIsTranslucent={true}
        selectedTextProps={{
          numberOfLines: 1,
          style: {
            flex: 1,
            fontSize: 16,
          },
        }}
        testID="dropdown"
        containerStyle={$containerStyle}
        ref={dropdownRef}
      />
    </>
  );
};

const $dropdown: ViewStyle = {
  flex: 1,
  maxHeight: 48,
  borderWidth: 1,
  borderRadius: 10,
  paddingLeft: 16,
  paddingRight: 8,
  marginBottom: 20,
};
const $iconStyle: ImageStyle = {
  height: 30,
  width: 30,
};
const $item: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 13,
};

const $seperator: ViewStyle = {
  borderBottomWidth: 0.5,
};

const $itemText: TextStyle = {
  fontSize: 16,
};
const $containerStyle: ViewStyle = {
  marginTop: 3,
  borderRadius: 12,
  borderWidth: 1,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  overflow: 'hidden',
};
