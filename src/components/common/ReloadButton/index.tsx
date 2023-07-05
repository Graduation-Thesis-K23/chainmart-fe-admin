import { Button } from "antd";
import React, { memo } from "react";
import styled from "styled-components";

const ReloadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReloadButton = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <ReloadContainer>
      <Button type="primary" onClick={handleReload}>
        Reload
      </Button>
    </ReloadContainer>
  );
};

export default memo(ReloadButton);
