import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import HeaderCmp from "@components/HeaderCmp/HeaderCmp";
import { LayoutContainer, Main } from "./styles";


const LayoutHome: React.FC = () => {

  return (
    <LayoutContainer>
      <HeaderCmp />
      <Main>
        <Outlet />
        <ScrollRestoration />
      </Main>
    </LayoutContainer>
  );
};

export default LayoutHome;
