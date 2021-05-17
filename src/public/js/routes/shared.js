import React, { memo } from "react";
import { Route } from "react-router-dom";
import Header from "Containers/Shared/HeaderContainer";
import Modal from "Components/Shared/Modal/Modal";

const Components = (router) => (
  <>
    <Modal />
    <Header router={router} />
  </>
);

export const SharedComponents = () => <Route path={"/"} component={memo(Components)} />;
