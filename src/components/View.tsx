import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const View = ({ children }: { children: ReactNode }) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};

export default View;
