import React, { ReactNode } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, Text } from "native-base";

interface EmptyDataProps {
  icon?: ReactNode;
  message?: string;
  height?: number;
}

const EmptyData = ({
  icon,
  message = "Empty Data",
  height,
}: EmptyDataProps) => {
  return (
    <Box alignItems="center" justifyContent="center" height={height}>
      {icon ? (
        icon
      ) : (
        <MaterialCommunityIcons name="sleep" size={50} color="gray" />
      )}
      <Text
        fontFamily="body"
        fontSize="lg"
        marginTop={4}
        minWidth={200}
        maxWidth={300}
        textAlign="center"
      >
        {message}
      </Text>
    </Box>
  );
};

export default EmptyData;
