import React from "react";
import { FormControl, Input, Text } from "native-base";

export interface CustomInputProps {
  placeholder?: string;
  label?: string;
  onChangeText: (value: string) => void;
}

const CustomInput = ({
  onChangeText,
  label,
  placeholder,
}: CustomInputProps) => {
  return (
    <FormControl w="75%" maxW="300px" marginY={2}>
      {label && label.length > 0 && (
        <FormControl.Label>
          <Text fontSize={17} color="gray.500" fontWeight="bold">
            {label}
          </Text>
        </FormControl.Label>
      )}
      <Input
        placeholder={placeholder}
        onChangeText={onChangeText}
        fontSize={15}
      />
    </FormControl>
  );
};

export default CustomInput;
